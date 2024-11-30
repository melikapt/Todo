const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        max:255,
        required:true
    },
    lastName:{
        type:String,
        max:255,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        min:8,
        max:50,
        required:true
    }
})

userSchema.methods.generateToken = function() {
    return jwt.sign({_id:this._id,firstName:this.firstName,lastName:this.lastName,email:this.email},
        config.get('jwtPrivateKey'));
}

const User = mongoose.model('user',userSchema);

function validate(user) {
    const schema = Joi.object({
        firstName: Joi.string().max(255).required(),
        lastName: Joi.string().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    });
    return schema.validate(user);
}

module.exports = {User,validate};