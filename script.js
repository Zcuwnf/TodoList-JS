function Todo(id, content, isDone) {
  this.id = id;
  this.content = content;
  this.isDone = isDone;
};

function todoController() {
  this.todoList = [];
  this.id = 1;
  this.ENTER_KEY = 13;
  this.todoInput = document.getElementById('newTodo');
  this.todoListView = document.getElementById('todoListView');
};

todoController.prototype = {
  getTodos: function (key) {
    let todoList = JSON.parse(localStorage.getItem(key)) || [];
    return todoList;
  },
  setTodos: function (key) {
    localStorage.setItem('todoList', JSON.stringify(key));
  },
  handleTodoItem: function (value) {
    this.isDone = false;
    let mainArray = Controller.getTodos('todoList');
    this.id = Controller.idLargestLocal(mainArray) + 1;
    let todoItem = new Todo(this.id, value, this.isDone);
    return todoItem;
  },

  idLargestLocal: function (mainArray) {
    let lengthArr = mainArray.length;
    if (lengthArr !== 0) {
      return mainArray[lengthArr - 1].id;
    } else {
      return 0;checkAll
    }

    return lastId;
  },

  addNewTodo: function (todo, list) {
    list.push(todo);
    Controller.setTodos(list);
    return todo;
  },

  setAttributes: function (element, attrs) {
    for (let key in attrs) {
      element.setAttribute(key, attrs[key]);
    }
  },

  checkboxView: function (todoId) {
    let inpCheckbox = document.createElement('input');
    this.setAttributes(inpCheckbox, { type: 'checkbox', class: 'itemList', id: todoId });

    inpCheckbox.addEventListener('click', function (e) {
      let list = Controller.getTodos('todoList');
      let id = e.target.getAttribute('id');
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          list[i].isDone = e.target.checked;
        }
      }
      Controller.setTodos(list);
      Controller.count();
    });

    return inpCheckbox;
  },

  createLableView: function (todo) {
    let lbContent = document.createElement('label');
    this.setAttributes(lbContent, { value: todo.content, class: 'labelContent ' });
    lbContent.innerHTML = todo.content;
    return lbContent;
  },

  initTodoITem: function (todo) {
    let item = document.createElement('li');
    item.setAttribute('class', 'todoItem');
    item.addEventListener('dblclick', function (e){
      item.classList.add('editing');
    });
    return item;
  },

  editInputView: function (todo) {
    let list = Controller.getTodos('todoList');
    let inputEdit = document.createElement('input');
    this.setAttributes(inputEdit, {
      id: todo.id,
      class: 'edit',
      value: todo.content,
      type: 'text',
    });

    inputEdit.focus();
    inputEdit.onblur = function (e) {
      Controller.handleTodoUpdate(e);
    };

    inputEdit.onkeypress = function (e) {
      if (event.which == Controller.ENTER_KEY || event.keyCode == Controller.ENTER_KEY) {
        Controller.handleTodoUpdate(e);
      }
    };
    return inputEdit;
  },

  handleTodoUpdate: function (event) {
    let list = Controller.getTodos('todoList');
    let inputEdit = event.target;
    let todoItem = new Todo(inputEdit.id, inputEdit.value, false);
    Controller.updateTodoEdit(todoItem, list);
    let editing = document.querySelector('.editing');
    editing.classList.remove('editing');
    Controller.renderTodo();
  },

  updateTodoEdit: function (todo, list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == todo.id) {
        list[i].content = todo.content;
        Controller.setTodos(list);
        break;
      }
    }
    return todo;
  },

  removeButtonView: function (todo) {
    let btnRemove = document.createElement('button');
    this.setAttributes(btnRemove, { class: 'remove', id: todo.id });

    btnRemove.addEventListener('click', function (e) {
      let id = e.target.getAttribute('id');
      Controller.removeTodo(id);
      Controller.renderTodo();
      Controller.count();
    });

    return btnRemove;
  },

  todoView: function (todo) {
    let item = this.initTodoITem(todo);
    let inpCheckbox = this.checkboxView(todo.id),
      lbContent = this.createLableView(todo),
      inputEdit = this.editInputView(todo),
      btnRemove = this.removeButtonView(todo);
    item.appendChild(inpCheckbox);
    item.appendChild(lbContent);
    item.appendChild(inputEdit);
    item.appendChild(btnRemove);
    document.querySelector('#todoListView').appendChild(item);
    return item;
  },

  removeTodo: function (id, list) {
    list = Controller.getTodos('todoList');
    for (let i = 0; i < list.length; i++)  {
      if (list[i].id == id) {
        list.splice(i, 1);
        break;
      }
    }
    Controller.setTodos(list);
  },

  count: function (index, list) {
    list = Controller.getTodos('todoList');
    index = 0;
    for (let i = 0; i < list.length; i++) {
      if (!list[i].isDone) {
        index++;
      }
    }
    document.getElementById('todoCount').innerHTML = index;
  },

  events: function () {
    Controller.todoInput.onkeyup = function (event) {
      if (event.which == Controller.ENTER_KEY || event.keyCode == Controller.ENTER_KEY) {
        let todoList = Controller.getTodos('todoList');
        let todoItem = Controller.handleTodoItem(Controller.todoInput.value);
        let todo = Controller.addNewTodo(todoItem, todoList);
        Controller.todoView(todo);
        Controller.todoInput.value = '';
        Controller.count();
      }
    };

    let list = document.getElementsByClassName('itemList');
    let checkAll = document.getElementById('checkAll');
    checkAll.addEventListener('change', function (e) {
      let check;
      for (let i = 0; i < list.length; i++) {
        list[i].checked = this.checked;
        check = e.target.checked;
        Controller.checkAllTodo(check);
      }

      Controller.count();
    });

    let listWork = document.getElementsByClassName('todoItem');
    let showAllItem = document.getElementById('allWorks');
    showAllItem.addEventListener('click', function () {
      for (let i = 0; i < listWork.length; i++) {
        listWork[i].style.display = 'block';
      }
    });

    let activeItem = document.getElementsByClassName('todoItem');
    let todoActive = document.getElementById('activedItems');
    todoActive.addEventListener('click', function () {
      for (let i = 0; i < list.length; i++) {
        if (!list[i].checked) {
          activeItem[i].style.display = 'block';
        } else {
          activeItem[i].style.display = 'none';
        }
      }
    });

    let completeItem = document.getElementsByClassName('todoItem');
    let todoCompleted = document.getElementById('completedTodos');
    todoCompleted.addEventListener('click', function () {
      for (let i = 0; i < list.length; i++) {
        if (list[i].checked) {
          completeItem[i].style.display = 'block';
        } else {
          completeItem[i].style.display = 'none';
        }
      }
    });

    let clearButton = document.getElementById('btnClear');
    clearButton.addEventListener('click', function () {
      let list = Controller.getTodos('todoList');
      Controller.clearCompleted(list);
      Controller.setTodos(list);
      Controller.renderTodo();
    });
  },

  clearCompleted: function (list) {
    while (list.find(({ isDone }) => isDone)) {
      list.splice(list.indexOf(list.find(({ isDone }) => isDone)), 1);
    }
  },

  checkAllTodo: function (check, todoList) {
    todoList = Controller.getTodos('todoList');
    for (let i = 0; i < todoList.length; i++) {
      todoList[i].isDone = check;
      Controller.setTodos(todoList);
    }
  },

  renderTodo: function () {
    let list = Controller.getTodos('todoList');
    Controller.removeElement();
    for (let i = 0; i < list.length; i++) {
      let element = Controller.todoView(list[i]);
      if (list[i].isDone) {
        element.classList.add('checked');
      }
    }
  },

  removeElement: function () {
    let todoListView = document.getElementById('todoListView');
    while (todoListView.hasChildNodes()) {
      todoListView.removeChild(todoListView.firstChild);
    }

  },
};

function changeClass(elem) {
  let a = document.getElementsByTagName('a');
  for (let i = 0; i < a.length; i++) {
    a[i].classList.remove('selected');
  };
  elem.classList.add('selected');
};

let Controller = new todoController();
let todo = new Todo();
Controller.events();
Controller.renderTodo();
Controller.count();
