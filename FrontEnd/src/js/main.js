import axios from "axios";
import "../scss/styles.scss";

const inputForm = document.querySelector(".js--inputForm");
const inputArea = document.getElementById("inputArea");
const addTodoBtn = document.getElementById("addTodoBtn");
const clearAllTodoBtn = document.getElementById("clearAllTodoBtn");
const todoList = document.querySelector(".js--todoList");

const URL = "http://localhost:5000/todoList";

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleAddTodo();
});

document.addEventListener("DOMContentLoaded", refreshList);

async function refreshList() {
  todoList.innerHTML = "";
  const res = await axios.get(URL);
  renderTodoList(res.data);
  inputArea.value = "";
  inputArea.focus();
}

function renderTodoList(data) {
  for (let i = 0; i < data.length; i++) {
    const todoData = data[i];
    const newTodo = renderTodoItem(
      todoData.text,
      todoData.checked,
      todoData._id
    );

    todoList.appendChild(newTodo);
  }
}

function renderTodoItem(text, checkedStatus, id) {
  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "align-items-center");
  li.id = id;

  const input = document.createElement("input");
  input.classList.add("form-check-input", "me-1", "js--todoChecked");
  input.type = "checkbox";
  input.checked = checkedStatus;

  input.addEventListener("click", async () => {
    await axios.put(`${URL}/${li.id}`);
    refreshList();
  });

  const span = document.createElement("span");
  span.classList.add("ms-1", "js--todoText");
  span.textContent = text;
  if (input.checked) {
    span.classList.add("js--lineThrough");
  }
  span.addEventListener("click", async () => {
    await axios.put(`${URL}/${li.id}`);
    refreshList();
  });

  const button = document.createElement("button");
  button.classList.add("btn-close", "ms-auto", "js--todoDeleteBtn");
  button.setAttribute("aria-label", "Close");

  button.addEventListener("click", async () => {
    await axios.delete(`${URL}/${li.id}`);
    refreshList();
  });

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  return li;
}

addTodoBtn.addEventListener("click", handleAddTodo);

async function handleAddTodo() {
  const inputText = inputArea.value;
  if (inputText.trim() === "") {
    alert("Enter a value!");
    return;
  }
  await axios.post(URL, {
    text: inputText,
  });
  refreshList();
}

clearAllTodoBtn.addEventListener("click", async () => {
  await axios.delete(`${URL}`);
  refreshList();
});
