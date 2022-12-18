import { getReadTodo } from "./fetch.js";
import { todoDones, todosEl, loaderEl } from "./store.js";
import events from "./events.js";

export default async function renderTodos(check) {
  todosEl.innerHTML = "";
  loaderEl.classList.add("loader--show");

  const todos = await getReadTodo();

  // 반복해서 출력
  for (let todo of todos) {
    const updateAt = todo.updatedAt.split("-");
    const y = updateAt[0];
    const m = updateAt[1];
    const d = updateAt[2].split("T")[0];

    const todoEl = document.createElement("li");
    todoEl.setAttribute("data-id", todo.id);
    todoEl.classList.add("todo");

    todoEl.innerHTML = /* html */ `
      <label>
        <input
          class="check"
          data-id="${todo.id}"
          type="checkbox"
          name="done"
        />
        <span class="check_img"></span>
        <span class="title" data-id="${todo.id}">${todo.title}</span>
        <input
          class="amend_input"
          data-id="${todo.id}"
          type="text"
          placeholder="Try editing the title!"
        />
      </label>

      <div class="btns">
        <button class="amend_btn" data-id="${todo.id}">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="amend_close-btn" data-id="${todo.id}">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <button class="delete" data-id="${todo.id}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
        <p class='date'>${y} ${m} ${d}</p>
      </div>


    `;
    todosEl.append(todoEl);

    const titleEl = todoEl.querySelector(".title");
    const checkEl = todoEl.querySelector(".check");

    // done 타입이 string 이라 못 받아와서 JSON.parse 로 boolean 타입으로 변경 후 done = true 일 경우 체크 남아있도록 적용
    if (JSON.parse(todo.done)) {
      checkEl.setAttribute("checked", true);
      titleEl.classList.add("todo--done");
      todoDones.push(todo.id);
    } else {
      checkEl.removeAttribute("checked");
      titleEl.classList.remove("todo--done");
    }

    // ⭕❌
    if (check === "true" && !checkEl.checked) {
      todoEl.remove(); // checkbox 에 체크 안된 것 비우기
    } else if (check === "false" && checkEl.checked) {
      todoEl.remove(); // checkbox 에 체크된 것 비우기
    }

    loaderEl.classList.remove("loader--show");
  }

  // 이벤트들
  events();
}
