const todoList = [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'wash dishes',
  dueDate: '2022-12-22'
}];

renderTodoList();

function handleTodoKeydown(event){
  if(event.key==='Enter'){
    addTodo();
  }
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const dueDateElement = document.querySelector('.js-due-date-input')

  const name = inputElement.value;
  const dueDate = dueDateElement.value;
  
  todoList.push({
    name: name,
    dueDate: dueDate
    // name,
    // dueDate // synonymous
  });
  // console.log(todoList);
  
  inputElement.value = '';

  renderTodoList();
}

function renderTodoList(){
  let toDoListHTML = '';
  for(let i=0; i<todoList.length; i++){
    const todoObject = todoList[i];
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const{ name, dueDate } = todoObject;
    const html = `
      <div>
        ${name}
      </div>
      <div>
        ${dueDate}
      </div>
      <button
      onclick="
        todoList.splice(${i}, 1);
        renderTodoList();
      " class="delete-todo-button">
        Delete
      </button>
    `;
    toDoListHTML += html;
  }
  // console.log(toDoListHTML)
  document.querySelector('.js-todo-list').innerHTML = toDoListHTML;
}