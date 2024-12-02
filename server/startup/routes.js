const cors = require('cors');
const user = require('../routes/signup');
const signin = require('../routes/signin');
const todos = require('../routes/todos');
const express = require('express');

module.exports = function name(app) {
    app.use(cors());
    app.use(express.json());
    app.use('/user/signup', user);
    app.use('/user/signin', signin);
    app.use('/todo', todos);
}