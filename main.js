let newTodo = document.querySelector("#new-todo");
let addBtn = document.querySelector("#add");
let myList = document.querySelector("#my-list");
let newTodoVal = newTodo.value;
let listKey = "todo";
let myForm = document.querySelector("#my-form");

let createItem = function(myUl, el, colorTodo, liId) {
  let todoItem = document.createElement("li");
  let mySpan = document.createElement("span");
  todoItem.setAttribute("data-id", liId);
  todoItem.classList.add("list-group-item");
  todoItem.appendChild(mySpan).innerText = el;
  myUl.appendChild(todoItem);
  let color = document.createElement("input");
  color.setAttribute("type", "color");
  todoItem.style.backgroundColor = colorTodo;
  todoItem.appendChild(color);

  color.addEventListener("input", function(ev) {
    color.parentElement.style.backgroundColor = color.value;
    let listItem = color.parentElement;
    let listId = listItem.getAttribute("data-id");
    let myAllData = getAllData(listKey);
    inertLoop: for (let index = 0; index < myAllData.length; index++) {
      const element = myAllData[index];
      if (listId == element.id) {
        element.color = color.value;
        break inertLoop;
      }
    }
    localStorage.setItem(listKey, JSON.stringify(myAllData));
  });

  let upBtn = document.createElement("button");
  upBtn.addEventListener("click", function() {
    let myAllData = getAllData(listKey);
    const FIRST_ID = myAllData[0].id;

    if (upBtn.parentElement.getAttribute("data-id") == FIRST_ID) {
      alert("You Are At the Top of Your Todo List");
    } else {
      console.log(this.parentElement);
      let currentColor = upBtn.parentElement.style.backgroundColor;

      let currentWord = upBtn.previousSibling.previousSibling.innerHTML;

      let thisTodoId = upBtn.parentElement.getAttribute("data-id");

      let ul = upBtn.parentElement.parentElement.querySelectorAll("li");
      let upColor = ul[thisTodoId - 2].style.backgroundColor;
      ul[thisTodoId - 2].style.backgroundColor = currentColor;
      upBtn.parentElement.style.backgroundColor = upColor;
      let upWord = ul[thisTodoId - 2].firstChild.innerText;
      ul[thisTodoId - 2].firstChild.innerText = currentWord;
      upBtn.previousSibling.previousSibling.innerHTML = upWord;
      inertLoop: for (let index = 0; index < myAllData.length; index++) {
        const element = myAllData[index];
        if (thisTodoId == element.id) {
          element.value = upWord;
          element.color = upColor;
        }
        if (element.id == thisTodoId - 1) {
          element.value = currentWord;
          element.color = currentColor;
        }
      }
      localStorage.setItem(listKey, JSON.stringify(myAllData));
    }
  });
  upBtn.innerHTML = "UP";
  upBtn.value = "up";

  let downBtn = document.createElement("button");

  downBtn.addEventListener("click", function() {
    let myAllData = getAllData(listKey);

    const LAST_ID = myAllData[myAllData.length - 1].id;
    if (downBtn.parentElement.getAttribute("data-id") == LAST_ID) {
      alert("You Are At the bottom of Your Todo List");
    } else {
      let currentWord =
        downBtn.previousSibling.previousSibling.previousSibling.innerHTML;
      let currentColor = downBtn.parentElement.style.backgroundColor;
      console.log(currentWord);
      let thisTodoId = downBtn.parentElement.getAttribute("data-id");
      let ul = downBtn.parentElement.parentElement.querySelectorAll("li");
      let downWord = ul[thisTodoId].firstChild.innerText;
      ul[thisTodoId].firstChild.innerText = currentWord;
      downBtn.previousSibling.previousSibling.previousSibling.innerHTML = downWord;
      let downColor = ul[thisTodoId].style.backgroundColor;
      ul[thisTodoId].style.backgroundColor = currentColor;
      downBtn.parentElement.style.backgroundColor = downColor;
      inertLoop: for (let index = 0; index < myAllData.length; index++) {
        const element = myAllData[index];
        if (element.id == +thisTodoId + 1) {
          element.value = currentWord;
          element.color = currentColor;
        }
        if (thisTodoId == element.id) {
          element.value = downWord;
          element.color = downColor;
        }
      }

      localStorage.setItem(listKey, JSON.stringify(myAllData));
    }
  });
  downBtn.innerHTML = "DOWN";
  downBtn.value = "down";
  let delBtn = document.createElement("button");
  delBtn.addEventListener("click", function(e) {
    let listDel = delBtn.parentElement;
    listDel.parentNode.removeChild(listDel);
    let ul = delBtn.parentElement.parentElement.querySelectorAll("li");
    console.log(ul);
    const newId = 1;
    for (let index = 0; index < ul.length; index++) {
      const element = ul[index];
      const elementId = ul[index].getAttribute("data-id");
      console.log(element);
      console.log(elementId);
    }
    // let myAllData = getAllData(listKey);
    // console.log(myAllData);
    // let listId = delBtn.parentElement.getAttribute("data-id");
    // console.log(listId);
    // for (let index = 0; index < myAllData.length; index++) {
    //   const element = myAllData[index];
    //   if (element.id == listId) {
    //     myAllData.splice(index, 1);
    //   }
    // }

    // localStorage.setItem(listKey, JSON.stringify(myAllData));
  });
  delBtn.innerHTML = "DELETE";
  delBtn.value = "delete";
  todoItem.appendChild(upBtn);
  todoItem.appendChild(downBtn);
  todoItem.appendChild(delBtn);
};

var getAllData = function(key) {
  const all = localStorage.getItem(key);
  const allAfterConvert = JSON.parse(all);
  return allAfterConvert;
};

let getLastObj = function(param) {
  let todoValue = localStorage.getItem(param);
  let allObjs = JSON.parse(todoValue);
  let lastObj = allObjs[allObjs.length - 1];
  return lastObj;
};
let allData = [];
let id = 1;
let DataFromLocalStorage = localStorage.getItem(listKey);
if (localStorage.getItem(listKey)) {
  for (let index = 0; index < getAllData(listKey).length; index++) {
    const element = getAllData(listKey)[index];
    const elVal = element.value;
    const elColor = element.color;
    const elId = element.id;
    createItem(myList, elVal, elColor, elId);
  }
  allData = JSON.parse(DataFromLocalStorage);
  const LastId = getLastObj(listKey).id;
  id = LastId + 1;
} else {
  allData = [];
}
let getAllLi = function(allList) {
  let allLi = allList.querySelectorAll("li");
  return allLi;
};

let listAfterUpdate;
addBtn.addEventListener("click", e => {
  e.preventDefault();

  let newTodo = document.querySelector("#new-todo").value;

  todoItemObj = {
    id: id,
    value: newTodo,
    color: "aqua"
  };
  allData.push(todoItemObj);

  let jsonTodo = JSON.stringify(allData);

  localStorage.setItem(listKey, jsonTodo);

  const lastObject = getLastObj(listKey);
  const lastObjectValue = lastObject.value;
  const lastObjectColor = lastObject.color;
  const lastObjectId = lastObject.id;

  createItem(myList, lastObjectValue, lastObjectColor, lastObjectId);

  id++;
  // newTodo.value = "";
  listAfterUpdate = document.querySelectorAll("li");
});

let getAllColor = function(liS) {
  let colorList = [];
  liS.forEach(el => {
    let colors = el.querySelector("input");
    colorList.push(colors);
  });
  return colorList;
};
