
//Selectors
const formBtn = document.querySelector(".form__btn");
const formInput = document.querySelector(".form__input");
const todoList = document.querySelector(".todo__list"); 
const todoOption = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener("DOMContentLoaded", getToDo);
formBtn.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
todoOption.addEventListener("change", filterOption);


//Functions

function addToDo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = formInput.value;
    saveLocalToDo(formInput.value);
    formInput.value = "";
    newTodo.classList.add("todo__item")
    todoDiv.appendChild(newTodo);

    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = "<i class='fas fa-check'></i>";
    completedBtn.classList.add("todo__completed");
    todoDiv.appendChild(completedBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
    deleteBtn.classList.add("todo__delete");
    todoDiv.appendChild(deleteBtn);
    
    todoList.appendChild(todoDiv);
}

function deleteCheck(event) {
    target = event.target;
    const item = target.parentElement;

    if(target.classList[0] === "todo__delete") {     
        item.classList.add("fall");
        removeLocalToDo(item);
        item.ontransitionend = () => {
            item.remove();
        }
    }

    if(target.classList[0] === "todo__completed") {
        item.classList.add("completed")
    }
}

function filterOption(event) {
    const todoItems = todoList.childNodes;
    const selectedItem = event.target.value;
    console.log(selectedItem);
    todoItems.forEach(function(todo) {
        switch(selectedItem) {
            case "All":
                todo.style.display = "flex";
                break;
            case "Completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                }
                else {
                    todo.style.display = "none"
                }
                break;
            case "Uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                }
                else {
                    todo.style.display = "none"
                }
                break;
        }
    })

}

function saveLocalToDo(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getToDo() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        formInput.value = "";
        newTodo.classList.add("todo__item")
        todoDiv.appendChild(newTodo);

        const completedBtn = document.createElement("button");
        completedBtn.innerHTML = "<i class='fas fa-check'></i>";
        completedBtn.classList.add("todo__completed");
        todoDiv.appendChild(completedBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
        deleteBtn.classList.add("todo__delete");
        todoDiv.appendChild(deleteBtn);
        
        todoList.appendChild(todoDiv);
    })
}

function removeLocalToDo(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    item = todo.children[0].textContent
    todos.splice(todos.indexOf(item), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}