const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcryptjs');

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

//this function will a fire function before saved db
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(); // Correct method to generate a salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
    });
// model now
const User = mongoose.model('user',UserSchema);
module.exports = User;