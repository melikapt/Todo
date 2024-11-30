const _ =require('lodash');
const bcrypt = require('bcrypt');
const {User,validate} = require('../model/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const payload = req.body;
        const {error} = validate(payload);
        if(error) return res.status(400).send({message:error.details[0].message});

        const user = await User.findOne({email:payload.email});
        if(user) return res.status(400).send({message:`This user already registered`});

        const newUser = new User(payload);

        const salt = await bcrypt.genSalt(15);
        const hashedPass = await bcrypt.hash(payload.password,salt);

        newUser.password = hashedPass;
        await newUser.save();
        const token = newUser.generateToken();
        return res.status(200).send({newUser:_.pick(newUser,['firstName','lastName','email  ']),token,message:'successfully registered.'});
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;