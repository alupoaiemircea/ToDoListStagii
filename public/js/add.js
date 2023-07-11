var itemNr=0;
function addItem()
{
    const date= new Date();
    let currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    let task = document.getElementById("input").value;
    document.getElementById("input").value="";
    document.getElementById("list").innerHTML+=
    `<div class="item" id="item${itemNr}">
    <div class="taskName">
      <p>${task}</p>
    </div>
    <div class="taskDate">
      <p>${currentDate}</p>
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