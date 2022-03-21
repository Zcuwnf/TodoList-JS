let list = document.getElementsByClassName('itemList');
let listWork = document.getElementsByClassName('todolistWork');
let newToDo = document.getElementById('newTodo');
let todos = getTodos();

function getTodos() {
  let todos = new Array;
  todos = localStorage.getItem('todo');
  todo = null
  if (todos == null) {
    todos = [];
  } else {
    todos = JSON.parse(todos);
  }
  return todos;
}

function setTodos(todoList) {
  let todos = localStorage.setItem('todo', JSON.stringify(todoList));
  if (todos !== null) {
    todos = JSON.stringify(todoList);
  }
  return todos;
};

newToDo.onkeyup = function (event) {
  if (event.which === 13) {
    let todoText = newToDo.value;
    if (!todoText || todoText === '') {
      return false;
    }
    let id = 1;
    for (let i = 0; i< listWork.length; i++) {
      id++;
    }
    let newItem = getItemAdd(id, todoText, false);
    addNewItem(newItem);
    showItem(newItem);
    event.preventDefault();
    event.currentTarget.value = '';
  }
  count();
};

function addNewItem(newItem) {
  let todoList = getTodos();
  todoList.push(newItem);
  setTodos(todoList);
};

function getItemAdd(id, label, status) {
  let todoItem = {
    'id': id,
    'label': label,
    'checked': status
  };
  return todoItem;
};

function showItem(newItem) {
  console.log("showItem ", newItem);
  let htmlItem =  '<li class ="todolistWork">' +
                  '<input type="checkbox" onClick="toggle" class="itemList">' +
                  '<label>' + newItem.label + '</label>' +
                  '<button onClick="remove(' + newItem.id + ')" class="remove" id="' + newItem.id + '"></button></li>';
  document.getElementById('todoList').innerHTML += htmlItem;
};

function renderToDoList() {
  for (let i = 0; i<todos.length; i++) {
    showItem(todos[i]);
  }
  count();
};

function count(index) {
  index = 0;
  for (let i = 0; i < list.length; i++) {
    if (!list[i].checked) {
      index++;
    }
  }
  document.getElementById('todoCount').innerHTML = index;
};

let checkAll = document.getElementById('checkAll');
checkAll.addEventListener('change', function () {
  for (let i = 0; i < list.length; i++) {
    list[i].checked = this.checked;
  };
  count();
});
function toggle(item) {
  item.checked = !item.checked
  count();
}
function allCheck(status) {
  getItemAdd(stauts);
  for (let i = 0; i < todoList.length; i++) {
    if (status == true ){
      todoList[i] = true
    } else {
      toggle(todoList[i]);
    }
  }
  count();
};

let allWorks = document.getElementById('allWorks');
allWorks.addEventListener('click', function () {
  for (let i = 0; i < listWork.length; i++) {
    listWork[i].style.display = 'block';
  };
});

let activedItems = document.getElementById('activedItems');
activedItems.addEventListener('click', function () {
  for (let i = 0; i < list.length; i++) {
    if (!list[i].checked) {
      listWork[i].style.display = 'block';
    } else {
      listWork[i].style.display = 'none';
    }
  }
});

let completedTodos = document.getElementById('completedTodos');
completedTodos.addEventListener('click', function () {
  for (let i = 0; i < list.length; i++) {
    if (list[i].checked) {
      listWork[i].style.display = 'block';
    } else {
      listWork[i].style.display = 'none';
    }
  }
});
function remove(id) {
  let todoList = getTodos();
  console.log('id: ', id)
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      console.log('type of id: ', typeof(id))
      todoList.splice(i, 1);
    }
  }
  setTodos(todoList);
  document.location.reload();
  count();
 
};

function clearCompeted () {
  let listItem = document.getElementsByClassName('todolistWork');
  let inputList = document.getElementsByClassName('itemList');
  let todo = document.getElementById('todoList');
  let todoList = getTodos();
  for (let i = inputList.length - 1; i >= 0; i--) {
    if (inputList[i].checked) {
      todo.removeChild(listItem[i]);
      count()
    }
  }
}

let clearButton = document.getElementById('btnClear')
clearButton.addEventListener('click', function () {
  clearCompeted()
});
 renderToDoList();