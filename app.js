const express = require('express');

const app = express();

const path= require('path');


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

var employeeDetails = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add.html'))
})


app.get('/Details', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'EmpDetails.html'))
})

app.get('/update',(req,res)=>
{
    res.sendFile(path.join(__dirname,'public','update.html'))
})


app.get('/search',(req,res)=>
{
    res.sendFile(path.join(__dirname,'public','search.html'))
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
})

app.get('/update/:id',(req,res)=>
{
 const emid=req.params.id;
 const details=employeeDetails.find(emp=>emp.empID==parseInt(emid));

 if(!details){
    return res.status(404).json({error:'task not found'});
 }

    console.log("updation id:")
    console.log(emid);
    res.sendFile(path.join(__dirname,'public','update.html'))
    
})

app.post('/update/data/:id',(req,res)=>
{
    let {empID,empName,empRole}=req.body;
    empID=parseInt(empID)
    console.log(empID);
    const update={empID,empName,empRole}
    const reqid=req.params.id;
    let details = employeeDetails.findIndex(emp => emp.empID === parseInt(reqid));
    // 
    
    if (details !== -1) {
        employeeDetails[details] = { ...employeeDetails[details], ...update };
    }
    res.redirect('/Details')

})


app.get('/search/:id',(req,res)=>
{
    const id=req.params.id;
    const details=employeeDetails.find(emp=>emp.empID ==parseInt(id));
    // console.log(id);
    if(!details){
        return res.status(404).json({error:'task not found'});
    }
    // console.log(details)
    res.sendFile(path.join(__dirname,'public','search.html'))

})


app.get('/search/data/:id', (req, res) => {
    const id = req.params.id;
   
    const details = employeeDetails.find(emp => emp.empID === parseInt(id)); // Ensure the types match
    console.log("search details:")
    console.log(details);

    res.json(details);
});


app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log('Before deletion:', employeeDetails);
    
    employeeDetails = employeeDetails.filter(emp => emp.empID !==parseInt(id));

    console.log('After deletion:', employeeDetails);
    res.redirect('/Details');
});



app.listen(3000, () => {
    console.log("The server is starting")
})