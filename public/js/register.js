rootAPI= `http://localhost:3000/register`;
function redirectToRegister()
{
    window.location.href="http://localhost:3000/register";
}
function register()
{
    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;

    
    //fetch() to send data
    fetch(rootAPI, {method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "username": username, "password":password })})
   .then(response => console.log(response.status));
   window.location.href="http://localhost:3000";
}