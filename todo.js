// Selecting All Elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // All event listeners
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadlAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(event){
    if (confirm("Tümünü silmek istediğinize emin misiniz?")) {
        // Clearing Todos from the interface
        // todoList.innerHTML = ""; // Yavaş

        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        
        localStorage.removeItem("todos");
    }

    
}

function filterTodos(event){
    const filterValue = event.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // Could not find

            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }
    });
}

function deleteTodo(event){
    if (event.target.className === "fa fa-remove") {
        event.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(event.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi");
    }
}

function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo, index){
        if (todo === deletetodo) {
            todos.splice(index,1); // We can delete the value from the Array.
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadlAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addTodo(event){
    const newTodo = todoInput.value.trim();
    
    if (newTodo === "") {
        /* <div class="alert alert-danger" role="alert">
                        <strong>Oh snap!</strong> Change a few a things up
                      </div>
        */
        showAlert("danger","Lütfen bir todo girin..");
    }
    else {
        addTodoToUI(newTodo); 
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi..");
    }

    event.preventDefault();
}

function getTodosFromStorage(){ // Getting Todo from Storage
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    
    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // setTimeout
    setTimeout(function(){
        alert.remove();
    },1000);
}

function addTodoToUI(newTodo){ // The string value will add to the UI as a list item.
    /* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> 
    */

    // Creating a List Item
    const listItem = document.createElement("li");

    // Create Link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    // List Item
    listItem.className = "list-group-item d-flex justify-content-between";

    // Adding Text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Adding List Item to Todo List
    todoList.appendChild(listItem);
    todoInput.value = "";
}
