const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    Name: {
        type: String,
        require: true,
    },
    Semester: {
        type: Number,
        require: true
    },
    RollNo: {
        type: Number,
        require: true
    },
    PhNo: {
        type: Number,
        require: true
    },
    Address: {
        type: String,
        require: true
    }

})

module.exports = mongoose.model('student', studentSchema);