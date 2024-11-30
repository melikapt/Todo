const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../model/user');
const Joi =require('joi');
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=>{
    try {
        const payload = req.body;
        const {error} = validate(payload);
        if(error) return res.status(400).send({message:error.details[0].message});

        const user = await User.findOne({email:payload.email});
        if(!user) return res.status(404).send({message:`User not registered!`});

        const verify = await bcrypt.compare(payload.password,user.password);
        if(!verify) return res.status(404).send({message:'Invalid email or password!'});

        const token = user.generateToken();
        res.status(200).send({user:_.pick(user,['firstName','lastName','email']),token});
    } catch (error) {
        console.log(error)
    }
})

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    });
    return schema.validate(user);
}

module.exports = router;