rootAPI= `http://localhost:3000/login`;
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
    }
    else
    {
        alert("Invalid data, please try again.");
    }
}