const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: Array,
        required: true
    },
    phoneNumber: {
        type: Array,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    college: {
        type: Number,
        required: true
    },
    currentEmployer: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('resumes', ResumeSchema);