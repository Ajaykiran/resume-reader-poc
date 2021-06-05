var express = require('express');
var multer = require('multer');
var path = require('path');
const mongoose = require('mongoose');
const Resume = require('./models/resume.model')
var DocController = require('./Controllers/docParse');
var app = express();

mongoose
    .connect('mongodb://localhost:27017/ajay-mongoDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to ajay-mongoDB")
    });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, "resumes")
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, Date.now() + "-" + file.originalname)
    }
})


const maxSize = 1 * 1000 * 1000;

var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {

        var filetypes = /pdf|doc|docx/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("File upload only supports the following filetypes of docx or pdf!!");
    }

}).single("resume");

app.post("/uploadResume", function async(req, res, next) {
    upload(req, res, async function (err) {
        if (path.extname(res.req.file.originalname) == ".docx") {
            docDetail = await DocController.parseDoc(res.req);
            console.log("docDetail => " + docDetail);

            const resume = new Resume({
                filename: res.req.file.filename,
                name: docDetail.name,
                email: docDetail.email,
                phoneNumber: docDetail.phoneNumber,
                skills: docDetail.skills,
                college: docDetail.college,
                currentEmployer: docDetail.currentEmployer
            })
            resume
                .save()
                .then(async (result) => {
                    convFile = res.req.file.originalname;
                    console.log("convFile = > " + convFile);
                    res.render('parseResume', {
                        message: " Successfully Uploaded", filename: convFile, name: docDetail.name, email: docDetail.email, phoneNumber: docDetail.phoneNumber, skills: docDetail.skills, college: docDetail.college, currentEmployer: docDetail.currentEmployer
                    })
                })
                .catch(err => {
                    console.log(err.message)
                })
        } else {
            console.log(err.message);
        }
    })
})

app.listen(4200);
console.log('4200 is the listening port');