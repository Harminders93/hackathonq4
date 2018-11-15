'use strict';

var mockData = {
    web: {
        branch: 'dio-20-dylan-you-better-get-that-ui-lookin-mighty-fine',
        deployment_date: '2018-11-15T16:25:56Z',
        who_deployed: 'Ya Boy DJ'
    },
    java_services: {
        data_export: {
            branch: 'dio-230-something',
            deployment_date: '2018-11-15T16:25:56Z',
            who_deployed: 'Ya Boy Eric Kiang'
        }
    }
};

exports.get_status = function(req, res) {
    return res.json(JSON.stringify(mockData));
};