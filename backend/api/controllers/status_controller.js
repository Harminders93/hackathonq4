'use strict';

var mongoose = require('mongoose'),
    EnvironmentStatus = mongoose.model('EnvironmentStatus'),
    AuthorizationToken = mongoose.model('AuthorizationToken'),
    TicketService = require('../services/ticket_service'),
    request = require('request'),
    rp = require('request-promise'),
    q = require('q');

var qaMockData = {
    domain_name: 'QA',
    tickets: [
        {
            branch_name: 'dio-20-dylan-you-better-get-that-ui-lookin-mighty-fine',
            services: [
                {
                    name: "web-qa",
                    deployment_date: "2018-11-15T16:25:56Z",
                    who_deployed: "Lucky 'King Snake' Singh"
                },
                {
                    name: "data-export",
                    deployment_date: "2018-11-15T16:25:56Z",
                    who_deployed: "Dylan 'Sucks at SC6' Karten"
                }
            ]
        },
        {
            branch_name: 'master',
            services: [
                {
                    name: "publisher",
                    deployment_date: "2018-11-15T16:25:56Z",
                    who_deployed: "Ya boy DJ"
                }
            ]
        }
    ]
};

var stagingMockData = {
    domain_name: 'Staging',
    tickets: [
        {
            branch_name: 'dio-20-dylan-you-better-get-that-ui-lookin-mighty-fine',
            services: [
                {
                    name: "web-qa",
                    deployment_date: "2018-11-15T16:25:56Z",
                    who_deployed: "Lucky 'King Snake' Singh"
                },
                {
                    name: "data-export",
                    deployment_date: "2018-11-15T16:25:56Z",
                    who_deployed: "Dylan 'Sucks at SC6' Karten"
                }
            ]
        },
        {
            branch_name: 'master',
            services: [
                {
                    name: "publisher",
                    deployment_date: "2018-11-15T16:25:56Z",
                    who_deployed: "Ya boy DJ"
                }
            ]
        }
    ]
};

exports.get_all_environment_status = function(req, res) {
    return res.json(
        [
            qaMockData,
            stagingMockData
        ]
    );
}

exports.get_status = function(req, res) {
     if (req.params.environmentName.toLowerCase() === "qa") {
        return res.json(qaMockData);
    } else if (req.params.environmentName.toLowerCase() === "staging") {
        return res.json(stagingMockData);
    } else {
        return res.json('Invalid environment name: ' + req.params.environmentName)
    }
};

exports.get_environment_status = function(req, res) {
    var environmentNameInLower = req.params.environmentName.toLowerCase();
    if (environmentNameInLower === "qa" || environmentNameInLower === "staging") {
        EnvironmentStatus.find(
            {
                domain_name: environmentNameInLower
            },
            {
                domain_name: 1,
                deployment_user: 1,
                service_name: 1,
                branch_name: 1,
                deployment_date: 1,
                _id: 0
            }, function(err, environmentStatuses) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    name: req.params.environmentName,
                    tickets: TicketService.getTicketArrayFromStatuses(environmentStatuses)
                });
        });
    } else {
        return res.json('Invalid environment name: ' + req.params.environmentName);
    }
};

exports.get_full_status = function(req, res) {
    EnvironmentStatus.find({},
        {
            domain_name: 1,
            deployment_user: 1,
            service_name: 1,
            branch_name: 1,
            deployment_date: 1,
            _id: 0
        }, function(err, environmentStatuses) {
            if (err) {
                res.send(err);
            }

            var qaStatuses = environmentStatuses.filter(function(element) {
                return element.domain_name === 'qa';
            });

            var qaTickets = TicketService.getTicketArrayFromStatuses(qaStatuses);

            var stagingStatuses = environmentStatuses.filter(function(element) {
               return element.domain_name === 'staging';
            });

            var stagingTickets = TicketService.getTicketArrayFromStatuses(stagingStatuses);

            var jiraCookie = null;
            request(
              {
                method: 'POST',
                url: 'https://tools.crowdtwist.com/issues/rest/auth/1/session', 
                json: {username:'dkarten', password:'wYXvQ5tz6VdB2GQ$JrAJ'}
              }, function(err, response, body) {
                  jiraCookie = body.session.name+'='+body.session.value;
                  var promises = [];
                  var numQaTix = qaTickets.length;
                  for (var i=0; i<numQaTix; i++) {
                    var ticket = qaTickets[i];
                    promises.push(getTicketStatus(ticket, jiraCookie));  
                  }

                  var numStagingTix = stagingTickets.length;
                  for (var i=0; i<numStagingTix; i++) {
                    var ticket = stagingTickets[i];
                    promises.push(getTicketStatus(ticket, jiraCookie));  
                  }

                  console.log(promises);
                  q.all(promises).then(function(data) {
                    console.log('all promises resolved!');
                    var finalResponse = [
                        {
                            name: 'QA',
                            tickets: qaTickets
                        },
                        {
                            name: 'Staging',
                            tickets: stagingTickets
                        }
                    ]

                    return res.json(finalResponse);
                  });
              });
    });
}

exports.add_new_status = function(req, res) {
    var newEnvironmentStatus = new EnvironmentStatus(req.body);
    EnvironmentStatus.find(
        {
            service_name: newEnvironmentStatus.service_name,
            domain_name: newEnvironmentStatus.domain_name
        },
        function(err, environmentStatus) {
            // we should update existing row if it exists
            if (environmentStatus.length > 0) {
                EnvironmentStatus.updateOne(
                    {
                        service_name: newEnvironmentStatus.service_name,
                        domain_name: newEnvironmentStatus.domain_name
                    },
                    {
                        branch_name: newEnvironmentStatus.branch_name,
                        deployment_user: newEnvironmentStatus.deployment_user,
                        deployment_date: newEnvironmentStatus.deployment_date
                    },
                    function(err, environmentStatus) {
                        if (err)
                            res.send(err);
                        res.json("Successfully saved the status of {" + newEnvironmentStatus.service_name + "} on the {" + newEnvironmentStatus.domain_name + "} domain.");
                    }
                );
            } else {
                newEnvironmentStatus.save(function(err, environmentStatus) {
                    if (err)
                        res.send(err);
                    res.json("Successfully saved the status of {" + newEnvironmentStatus.service_name + "} on the {" + newEnvironmentStatus.domain_name + "} domain.");
                });
            }
        }
    );
}

exports.add_token = function(req, res) {
    var authorizationToken = new AuthorizationToken(req.body);
    authorizationToken.save(function(err, authToken) {
        if (err)
            res.send(err);
        res.json("Successfully saved the token.");
    });
}

exports.handle_slack_message = function(req, res, next) {
    // Get event payload
    var payload = req.body;
    console.log(payload);

    res.status(200);
    var response_text = '';

    var token = '';

    AuthorizationToken.find({}, function(err, token) {
        if (err) {
            res.send(err);
        }

        token = token[0];

        if (payload.event !== undefined) {
            res.status(200).end();
            if (payload.event.type === 'message' && payload.event.text !== '') {
                var message = payload.event.text.toLowerCase();
                if (message.includes("qa") || message.includes("staging")) {
                    if (message.includes("free") || message.includes("available") || message.includes("using")) {
                        response_text = 'Click here to find out ya goober - https://is-qa-free.herokuapp.com/';

                        var request = require('request');
                        token = 'Bearer ' + token.token;
                        console.log(token);
                        request({
                            uri: 'https://slack.com/api/chat.postMessage',
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                                'Authorization': token
                            },
                            body: JSON.stringify({
                                text: 'Click here for more information - https://is-qa-free.herokuapp.com/',
                                channel: payload.event.channel
                            }),
                            method: 'POST'
                        }, function (err, resss, body) {
                            //it works!
                            if (err) {
                                console.log(err);
                            }
                            console.log('we GOOD!');
                            console.log(body);
                        });
                    }
                }
            }
        } else {
          res.json({
            challenge: payload.challenge,
          });
        }
    });
}
  
function getTicketStatus(ticket, cookie) {
  var endpoint = 'https://tools.crowdtwist.com/issues/rest/api/latest/issue/' + ticket.name.trim();
  console.log('requesting endpoint ' + endpoint);
  return rp.get({
    uri: endpoint,
    headers: {
      cookie: cookie
    },
    json:true
  }).then(function(response){
    console.log('got ticket ' + ticket.name);
    ticket.status = response.fields.status.name;
    return ticket;
  });
}