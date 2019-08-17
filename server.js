const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

let tables = [
    {
        routename: "kris",
        name: 'Kris',
        email: 'kris@gmail.com',
        phone: '908-555-5555'
    }
];

let waitList = [];


// homepage
app.get('/',(req,res)=>{
    console.log('Root route hit');
    res.sendFile(path.join(__dirname, 'home.html'));
});

// view tables
app.get('/view',(req,res)=>{
    console.log('view route hit');
    res.sendFile(path.join(__dirname, 'view.html'));
});

app.get('/addtable',(req,res)=>{
    console.log('addtable route hit');
    res.sendFile(path.join(__dirname, 'addtable.html'));
});

//display all tables
app.get('/api/tables',(req,res)=>{
    console.log('/api/reservations route hit');
    return res.json(tables);
});

app.get('/api/wait',(req,res)=>{
    console.log('/api/reservations route hit');
    return res.json(waitList);
});



// create new reservation
app.post('/api/tables',(req,res)=>{
    let newTable = req.body;
    
    newTable.routeName= newTable.name.replace(/\s+/g,"").toLowerCase();
    console.log(newTable);

    if(tables.length <= 0){
        tables.push(newTable)
    }
    else{
        waitList.push(newTable);
    }
    res.json(newTable);
});





// server is listening
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT)
})


