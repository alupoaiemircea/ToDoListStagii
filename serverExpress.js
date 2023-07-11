// Require express and create an instance of it
var express = require('express');
var app = express();
const path = require('path')
const fs = require('fs');
//const helmet = require("helmet");
const cookieparser = require("cookie-parser");

var userId=0;

//app.use(helmet());

// allow the app to use cookieparser
app.use(cookieparser());

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
            
            userFound=true;
            res.cookie("username", data.username);
            res.cookie("id",users[i].id);
            res.sendStatus(200);
        }   
    } 
      if(!userFound)
        {
            res.sendStatus(300);
        } 
})

app.get('/logout', (req, res) => {
    // clear the cookie
    console.log("cookie cleared");
    res.clearCookie("username", {path:'/'});
    res.clearCookie("id", {path:'/'});
    res.sendStatus(200);
  });

app.get('/myTasks',(req,res)=>{
    //console.log(req.cookies);
    let myTasks=getTasksByUser(req.cookies.id);
    console.log(myTasks);
    res.status(200).send(JSON.stringify(myTasks));
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
function getTasksByUser(userId)
{
    let allTasks=fs.readFileSync("lists.json",{ encoding: 'utf8', flag: 'r' });
    allTasks= JSON.parse(allTasks);
    for(let i=0;i<allTasks.length;i++)
    {
        if(userId==allTasks[i].id)
        {
            return allTasks[i].tasks;
        }
    }
    return null;
}