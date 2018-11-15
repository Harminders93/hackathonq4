'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EnvironmentStatusSchema = new Schema({
    branch_name: {
        type: String,
        required: 'Please enter the branch name'
    },
    service_name: {
        type: String,
        required: 'Please enter the name of the service'
    },
    deployment_user: {
        type: String,
        required: 'Please enter the name of the deployer'
    },
    domain_name: {
        type: String,
        required: 'Please enter the name of the domain'
    },
    deployment_date: {
        type: Date,
        required: 'Please provide the date at which this action was performed'
    }
});

module.exports = mongoose.model('EnvironmentStatus', EnvironmentStatusSchema);
