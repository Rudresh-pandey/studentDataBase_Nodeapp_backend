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

const getStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            res.status(404).json({ message: `ERROR no student with id : ${id}` })
        }
        res.status(200).json({
            message: "success Student founded",
            student_Info: student
        });
    } catch (err) {
        res.status(500).json({
            message: "Server ERROR",
            error: err
        });
    }
}

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body);
        if (!updatedStudent) {
            res.status(404).json({
                message: `ERROR no student of id ${id}`
            })
        }
        // const updateStudent = await student.save();
        res.status(200).json({
            message: "student info updated successfully",
            student_Info: updatedStudent
        });
    } catch (err) {
        res.status(500).json({
            message: "Server ERROR",
            error: err
        })
    }

}

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            res.status(404).json({
                message: `ERROR no Student found of id: ${id}`,
            })
        }
        res.status(200).json({
            message: "student deleted successfully",
            student_Info: deletedStudent
        })
    } catch (err) {
        res.status(500).json({
            message: "Server ERROR",
            error: err
        })
    }
}



exports.addStudent = addStudent;
exports.getAllStudent = getAllStudent;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
exports.getStudent = getStudent;
