const mongoose = require("mongoose");
const Student = require("../model/student");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
    console.log("connected to studentDB");
}).catch((err) => {
    console.log(err);
})

const addStudent = async (req, res) => {
    const newStudent = new Student({
        Name: req.body.name,
        RollNo: req.body.rollno,
        Address: req.body.address,
        PhNo: req.body.phno,
        Semester: req.body.semester
    });

    const createdStudent = await newStudent.save();
    res.json({ message: "new Student created", student_Info: createdStudent });

}

const getAllStudent = async (req, res) => {
    const students = await Student.find().exec();
    res.json(students);
}




exports.addStudent = addStudent;
exports.getAllStudent = getAllStudent;
