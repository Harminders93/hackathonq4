'use strict';

var mongoose = require('mongoose'),
    EnvironmentStatus = mongoose.model('EnvironmentStatus');

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
                    tickets: getTicketArrayFromStatuses(environmentStatuses)
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

            qaStatuses = getTicketArrayFromStatuses(qaStatuses);

            var stagingStatuses = environmentStatuses.filter(function(element) {
               return element.domain_name === 'staging';
            });

            stagingStatuses = getTicketArrayFromStatuses(stagingStatuses);

            var finalResponse = [
                {
                    name: 'QA',
                    tickets: qaStatuses
                },
                {
                    name: 'Staging',
                    tickets: stagingStatuses
                }
            ]

            res.json(finalResponse);

    });
};

function getTicketArrayFromStatuses(statuses) {
    var finalStatuses = [];

    statuses.forEach(function(status) {
        var isExisting = false;

        // Get ticket number
        var statusTicketNumber = getTicketNumber(status.branch_name);

        var statusToAdd = {
            "name": status.service_name,
            "deployment_date": status.deployment_date,
            "deployed_by": status.deployment_user,
            "branch": status.branch_name
        };
        finalStatuses.forEach(function(existingStatus) {
           if (existingStatus.name === statusTicketNumber) {
               existingStatus.services.push(statusToAdd);
               isExisting = true;
           }
        });

        if (!isExisting) {
            finalStatuses.push(
                {
                    "name": statusTicketNumber,
                    "services": [
                        statusToAdd
                    ]
                }
            );
        }

    });

    return finalStatuses;
}

function getTicketNumber(branchName) {
    var words = branchName.split('-');
    return words[0].toUpperCase() + '-' + words[1];
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

exports.handle_slack_message = function(req, res, next) {
    // Get event payload
    var payload = req.body;
    console.log(payload);

    var response_text = '';

    if (payload.event.type === 'message') {
        var message = payload.event.text.toLowerCase();
        if (message.includes("qa") || message.includes("staging")) {
            if (message.includes("free") || message.includes("available") || message.includes("using")) {
                response_text = 'Click here to find out ya goober - https://is-qa-free.herokuapp.com/';

                var request = require('request');

                request.post(
                    'https://slack.com/api/chat.postMessage',
                    {
                        text: response_text,
                        token: payload.token
                    },
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body);
                        }
                    }
                );
            }
        }
    }
    // Respond to this event with HTTP 200 status
    res.json({
        challenge: payload.challenge,
        response_text: response_text
    });
}