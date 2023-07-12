rootAPILOAD= `http://localhost:3000/myTasks`;
rootAPIADD='http://localhost:3000/myTasks/add';
var itemNr=0;

function addItem()
{
    const date= new Date();
    let currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    let taskName = document.getElementById("input").value;
    
    const task= {name:taskName,date:currentDate,done:0};
    document.getElementById("input").value="";
    document.getElementById("list").innerHTML+=
    `<div class="item" id="item${itemNr}">
    <div class="taskName">
      <p>${task.name}</p>
    </div>
    <div class="taskDate">
      <p>${task.date}</p>
    </div>
    
    <div class="taskBtns">
    <button class="itemBtn" onclick="markDone(${itemNr})">Done</button>
    <button class="itemBtn" onclick="deleteItem(${itemNr})">X</button>
    </div>
    `;
    itemNr++;

    
}

function deleteItem(nr)
{
  document.getElementById(`item${nr}`).remove();
  itemNr--;
}
function markDone(nr)
{
document.getElementById(`item${nr}`).style.backgroundColor='green';
}


fetch(rootAPILOAD, {method: 'GET'})
.then((response) => response.json())
  .then((data) => {
    console.log(data);
    if(data!=null)
    {displayTasks(data);}
  })
  .catch(console.error);
  //doesnt load tasks, outputs null



function displayTasks(tasks)
{
  for(let i=0;i<tasks.length;i++)
  {
    document.getElementById("list").innerHTML+=
    `<div class="item" id="item${itemNr}">
    <div class="taskName">
      <p>${tasks[i].name}</p>
    </div>
    <div class="taskDate">
      <p>${tasks[i].date}</p>
    </div>
    
    <div class="taskBtns">
    <button class="itemBtn" onclick="markDone(${itemNr})">Done</button>
    <button class="itemBtn" onclick="deleteItem(${itemNr})">X</button>
    </div>
    `;
    if(tasks[i].done==1)
    {
      document.getElementById(`item${itemNr}`).style.backgroundColor='green';
    }
    itemNr++;
  }
}