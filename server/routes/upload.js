const path = require('path');
const multer = require('multer');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const upload = multer({
    dest: 'uploads/',
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        if (ext !== '.csv') return cb(new Error(`Only upload csv files.`), false);
        cb(null, true);
    }
})

const uploadSingle = upload.single('csvFile');

router.post('/', auth, (req, res) => {
    try {
        uploadSingle(req, res, (err) => {
            if (err) return res.status(400).send({message:`Only upload csv files.`});
            if (!req.file) return res.status(400).send(`No file uploded.`);
            return res.status(200).send('File upload successfully');
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;