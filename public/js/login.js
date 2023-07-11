rootAPI= `http://localhost:3000/login`;
rootAPILOGOUT= `http://localhost:3000/logout`;
function redirectToLogin()
{
    window.location.href="http://localhost:3000/login";
}

async function login()
{
    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;

    
    //fetch() to send data
    let response= await fetch(rootAPI, {method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "username": username, "password":password })});

    if(response.ok)
    {
        console.log("good");
        window.location.href="http://localhost:3000";

        //document.getElementById("logout").style.display="block";
        //document.getElementById("account").innerHTML+=`<p>Hello, ${username}</p>`;
    }
    else
    {
        alert("Invalid data, please try again.");
    }
    
}

function displayName()
{
    if(!document.cookie=="")
    {
        console.log(document.cookie);
        document.getElementById("logout").style.display="block";
        document.getElementById("account").innerHTML+=`<p id="username">Hello, ${document.cookie.split("=")[1].split(";")[0]}</p>`;
        document.getElementById("login").style.display="none";
        document.getElementById("register").style.display="none";
    }
    else
    {
        document.getElementById("logout").style.display="none";
        //document.getElementById("account").innerHTML+=`<p id="username">Hello, ${document.cookie.split("=")[1]}</p>`;
        document.getElementById("login").style.display="block";
        document.getElementById("register").style.display="block";
    }
}

window.onload = function() {
    //error it tries to access logout element from login.html, doesnt exist
    displayName();
    
  };

function logout()
{
    console.log("sending logout req");
    fetch(rootAPILOGOUT,{method:"GET",withCredentials: true,credentials: 'include'});
    location.reload();
}  