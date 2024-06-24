const express = require('express');

const app = express();

const path= require('path');


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

const employeeDetails = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add.html'))
})

app.get('/update', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'update.html'))
})

app.get('/Details', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'EmpDetails.html'))
})


app.get('/viewDetails', (req, res) => {
    res.send(employeeDetails)
})

app.post('/add',(req,res) =>{
    var {empID,empName,empRole}=req.body;
    empID=parseInt(empID)
    const newlist={empID,empName,empRole}
    employeeDetails.push(newlist)
    console.log(employeeDetails);
    res.redirect('/Details');

})
app.get('/view/data',(req,res) =>{
    res.json(employeeDetails);
    console.log("ghsd")
})




app.listen(3000, () => {
    console.log("The server is starting")
})