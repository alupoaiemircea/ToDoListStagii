// Require express and create an instance of it
var express = require('express');
var app = express();
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs');

var userId=0;

app.use(express.json());
// on the request to root (localhost:3000/)
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/html/register.html'));
});

app.post('/register',(req,res)=>{
    let data = req.body;
    data.id=userId;

    let users= getUsers();
    users.push(data);

    fs.writeFile("users.json", JSON.stringify(users), (error) => {
        
        if (error) {
          console.error(error);     
        }
      });
    res.send('Data Received: ' + JSON.stringify(data));
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/html/login.html'));
})
app.post('/login',(req,res)=>{
    let data = req.body;
    let userFound=false;
    let users=getUsers();
    for(let i=0;i<users.length;i++)
    {
        if(data.username===users[i].username && data.password===users[i].password)
        {
            res.sendStatus(200);
            userFound=true;
        }   
    } 
      if(!userFound)
        {
            res.sendStatus(300);
        } 
})
app.use(express.static('public'));

// Change the 404 message modifing the middleware
/*
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});
*/
// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});

function getUsers()
{
    let users= fs.readFileSync("users.json",{ encoding: 'utf8', flag: 'r' });
    users= JSON.parse(users);
    return users;
}