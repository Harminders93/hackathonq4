'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorizationTokenSchema = new Schema({
    token: {
        type: String,
        required: 'Token'
    },
});

module.exports = mongoose.model('AuthorizationToken', AuthorizationTokenSchema);
