rootAPI= `http://localhost:3000/myTasks`;

fetch(rootAPI, {method: 'GET'})
.then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch(console.error);
  //doesnt load tasks, outputs null