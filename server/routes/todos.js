const _ = require('lodash');
const { User } = require('../model/user');
const auth = require('../middleware/auth');
const { Task, validate } = require('../model/task');
const express = require('express');
const router = express.Router();

router.get('/read', auth, async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user });
        if (!user) return res.status(404).send(`This user doesn't exist.`);

        const todos = await Task.find({ UserId: req.user });

        return res.status(200).send(todos)
    } catch (error) {
        console.log(error);
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        let payload = req.body;
        const user = await User.findById({ _id: req.user });
        if (!user) return res.status(404).send({ message: `This user doesn't exist.` });

        payload = {
            Title: payload.Title,
            Description: payload.Description,
            Priority: payload.Priority === '' ? 'Low' : payload.Priority,
            Date: payload.Date === '' ? Date.now() : payload.Date,
            Reapeat: payload.Reapeat === '' ? 'No' : payload.Reapeat,
            Status: payload.Status === '' ? 'Pending' : payload.Status,
        };

        const { error } = validate(payload);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const task = new Task({ ...payload, UserId: req.user })
        // console.log(task)
        // console.log('=============')
        await task.save();

        return res.status(200).send(task);
    } catch (error) {
        console.log(error);
    }
})

router.put('/update', auth, async (req, res) => {
    try {
        let payload = req.body.data;

        const { error } = validate(payload);
        if (error) return res.status(400).send(error.details[0].message);

        let task = await Task.findByIdAndUpdate({ _id: payload._id }, payload, { new: true })

        return res.status(200).send(task);
    } catch (error) {
        console.log(error);
    }
})

router.delete('/delete', auth, async (req, res) => {
    try {
        const task = await Task.findById({ _id: req.body._id });
        if (!task) return res.status(404).send(`There is no task!`);

        await Task.deleteOne({ _id: req.body._id });

        return res.status(200).send(`successfully deleted`);
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;