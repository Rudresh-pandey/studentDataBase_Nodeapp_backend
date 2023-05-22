const express = require("express");
const bodyParser = require('body-parser');
const studentDb = require("./src/studDB");
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Student dataBase backend");
})

app.get("/students", studentDb.getAllStudent);
app.post("/addstudent", studentDb.addStudent);



app.listen(3000, () => {
    console.log("on port 3000");
})

