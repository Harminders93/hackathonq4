'use strict';

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