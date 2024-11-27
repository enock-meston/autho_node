const mongoose = require('mongoose');
const {isEmail} = require('validator');

// schema of model
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,'please enter an email'],
        unique: true,
        lowercase: true,
        validate:[isEmail,'PLease enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6,'Minimum length of password is 6 characters'],
    },
});


// model now
const User = mongoose.model('user',UserSchema);
module.exports = User;