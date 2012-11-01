var mongoose = require('mongoose');
var timestamps = require('../lib/timestamps');
var slugify = require('../lib/slugify');
var validator = require('../lib/validator');
var Schema = mongoose.Schema;

var nameSchema = {
    type: String,
    validate: validator('letters only', 'isAlpha'),
    required: true
};

var userSchema = new Schema({
    name: {
        display: String,
        first: nameSchema,
        last: nameSchema 
    },
    role: {
        type: String,
        enum: [ 'admin', 'editor', 'restr_editor', 'writer', 'restr_writer', 'commenter' ],
        default: 'commenter'
    },
    email: {
        type: String,
        required: true,
        validate: validator('email format', 'isEmail')
    },
    profile_pic: String,
    password: String,
    salt: String,
    gender: {
        type: String,
        enum: [ 'male', 'female', 'robot', 'other' ],
        default: 'robot'
    },
    birthday: Date,
    preferences: {
    }
});

userSchema.virtual('name.full').get(function() {
    return this.name.first + ' ' + this.name.last;
});

userSchema.plugin(timestamps, { useVirtual: false });

module.exports = mongoose.model('User', userSchema);
