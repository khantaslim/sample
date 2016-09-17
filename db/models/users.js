'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
mongoose.connect('mongodb://localhost:27017/sample');

var Schema = mongoose.Schema;
var user = new Schema({
    local: {
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        username: {
            type: String
        },
        email: {
            type: String
        },
        phonenumber: {
            type: Number
        },

        password: {
            type: String
        }

    },
    isOnline:{ type : Boolean, default:false},
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date


});


user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', user);
