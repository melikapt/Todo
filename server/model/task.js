// const {User} = require('./user');
const Joi = require('joi');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Title: {
        type: String,
        min: 1,
        max: 255,
        required: true
    },
    Description: {
        type: String,
        min: 1,
        max: 500,
        required: true
    },
    Priority: {
        type: String,
        enum: ['Low', 'Normal', 'High'],
        default: 'Low',
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    Reapeat: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending',
        required: true
    }
})

const Task = mongoose.model('task', taskSchema);

function validate(task) {
    const schema = Joi.object({
        Title: Joi.string().min(1).max(255).required(),
        Description: Joi.string().min(1).max(500).required(),
        Priority: Joi.string().valid('Low', 'Normal', 'High').required().default('Low'),
        Date: Joi.date().required().default(Date.now()),
        Reapeat: Joi.string().required().default('No'),
        Status: Joi.string().valid('Pending', 'Completed').required().default('Pending'),
    })
    return schema.validate(task);
}

module.exports = { Task, validate };