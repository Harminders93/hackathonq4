'use strict';
module.exports = function(app) {
    var statusController = require('../controllers/status_controller');

    // Returns the status of a given environment
    app.route('/status')
        .get(statusController.get_all_environment_status)
        .post(statusController.add_new_status);

    app.route('/full-status')
        .get(statusController.get_full_status);

    app.route('/full-status/:environmentName')
        .get(statusController.get_environment_status);

    // Returns the status of all environments
    app.route('/status/:environmentName')
        .get(statusController.get_status);
};
