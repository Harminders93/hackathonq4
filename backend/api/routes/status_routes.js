'use strict';
module.exports = function(app) {
    var statusController = require('../controllers/status_controller');

    // todoList Routes
    app.route('/status/:environmentName')
        .get(statusController.get_status);
};
