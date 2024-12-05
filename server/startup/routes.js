const cors = require('cors');
const user = require('../routes/signup');
const signin = require('../routes/signin');
const todos = require('../routes/todos');
const upload = require('../routes/upload');
const express = require('express');

module.exports = function name(app) {
    app.use(cors());
    app.use(express.json());
    app.use('/user/signup', user);
    app.use('/user', signin);
    app.use('/todo', todos);
    app.use('/todo/bulkUpload', upload);
}