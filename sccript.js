//capturar os valores dos inputs

// Elemento pai que serao inseridos os todos
const container = document.querySelector(".content__box");

const todoTitle = document.getElementById("title");
const todoDesc = document.getElementById("desc");

function createCard(inputTitle, inputDesc) {
  const divTodo = document.createElement("div");
  const title = document.createElement("h3");
  const desc = document.createElement("span");
  const removeBtn = document.createElement("button");

  // aplicando classes
  divTodo.classList.add("todo");
  title.classList.add("todo__title");
  desc.classList.add("todo__desc");
  removeBtn.classList.add("todo__btn");

  // adicionando o conteudo svg a tag button
  removeBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';

  // adiconando o conteudos do input
  title.textContent = inputTitle.trim();
  desc.textContent = inputDesc.trim();

  // montando o todo
  divTodo.appendChild(title);
  divTodo.appendChild(desc);
  divTodo.appendChild(removeBtn);

  //adicionando os todos
  container.appendChild(divTodo);

  //adicionando acao ao botao remove
  removeBtn.onclick = function () {
    container.removeChild(divTodo);

    let todoCards = JSON.parse(localStorage.getItem("todos"));

    const removeCard = {
      title: title.textContent,
      description: desc.textContent,
    };

    todoCards = todoCards.filter((card) => card.title != removeCard.title);

    if (!todoCards.length) {
      console.log("estou aqui 34");
      const boxText = document.createElement("span");

      boxText.textContent = "None todo";
      boxText.classList.add("box__text");

      container.appendChild(boxText);
    }

    localStorage.setItem("todos", JSON.stringify(todoCards));
  };
}

function saveTodo(title, description) {
  let todoCards = JSON.parse(localStorage.getItem("todos"));
  // esse parse transforma o json em objeto javascript

  const todo = {
    title: title,
    description: description,
  };

  if (!todoCards) {
    localStorage.setItem("todos", JSON.stringify([todo]));
  } else {
    todoCards.push(todo);
    localStorage.setItem("todos", JSON.stringify(todoCards));
  }
}

function errorAnimation(...inputs) {
  inputs.forEach((input) => {
    input.classList.remove("title", "desc", "title-erro");
    void input.offsetWidth;
    input.classList.add("title-erro");
  });
}

function addTodo() {
  const todoTitleValue = todoTitle.value;
  const todoDescValue = todoDesc.value;

  const spanBox = document.querySelector(".box__text");

  if (container.contains(spanBox)) {
    container.removeChild(spanBox);
  }
  if (todoTitleValue.trim()) {
    createCard(todoTitleValue, todoDescValue);

    todoTitle.classList.replace("title-erro", "title");
    todoDesc.classList.replace("title-erro", "desc");
    saveTodo(todoTitleValue, todoDescValue);

    todoTitle.value = "";
    todoDesc.value = "";
  } else {
    errorAnimation(todoTitle, todoDesc);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const todoCards = JSON.parse(localStorage.getItem("todos"));

  if (!todoCards) {
    const boxText = document.createElement("span");

    boxText.textContent = "None todo";
    boxText.classList.add("box__text");

    container.appendChild(boxText);
  } else {
    console.log("estou aqui");
    todoCards.forEach((card) => {
      createCard(card.title, card.description);
    });
  }
});
