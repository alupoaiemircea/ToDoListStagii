rootAPI= `http://localhost:3000/myTasks`;

fetch(rootAPI, {method: 'GET'})
.then(function(response){
    console.log(JSON.stringify(response.json));
});