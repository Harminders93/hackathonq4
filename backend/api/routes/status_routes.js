'use strict';
module.exports = function(app) {
    var statusController = require('../controllers/status_controller');

    app.route('/status')
        .get(statusController.get_all_environment_status);

    // todoList Routes
    app.route('/status/:environmentName')
        .get(statusController.get_status);
};
