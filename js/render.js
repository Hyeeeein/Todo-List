import { getDeleteTodo, getUpdateTodo } from "./fetch.js";

export default async function renderTodo(todos, check) {
  const todosEl = document.createElement("ul");
  todosEl.classList.add("todos");

  // 반복해서 출력
  for (let todo of todos) {
    const todoEl = document.createElement("li");
    todoEl.setAttribute("data-id", `${todo.id}`);
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
      </div>
    `;
    todosEl.append(todoEl);

    const titleEl = todoEl.querySelector(".title");
    const checkEl = todoEl.querySelector(".check");

    // done 타입이 string 이라 못 받아와서 JSON.parse 로 boolean 타입으로 변경 후 done = true 일 경우 체크 남아있도록 적용
    if (JSON.parse(todo.done)) {
      checkEl.checked = true;
      titleEl.classList.add("todo--done");
    } else {
      checkEl.checked = false;
      titleEl.classList.remove("todo--done");
    }
    $lightGreenColor:;

    // ⭕❌
    if (check === "true" && !checkEl.checked) {
      todoEl.remove(); // checkbox 에 체크 안된 것 비우기
    } else if (check === "false" && checkEl.checked) {
      todoEl.remove(); // checkbox 에 체크된 것 비우기
    }
  }

  // 선언!
  const deleteBtnEls = todosEl.querySelectorAll(".delete");
  const todoEls = todosEl.querySelectorAll(".todo");
  const checkboxEls = todosEl.querySelectorAll(".check");
  const amendInputEls = todosEl.querySelectorAll(".amend_input");
  const amendBtnEls = todosEl.querySelectorAll(".amend_btn");
  const amendCloseBtnEls = todosEl.querySelectorAll(".amend_close-btn");

  let id;

  // todo 삭제
  deleteBtnEls.forEach((el) => {
    el.addEventListener("click", async (e) => {
      for (let i = 0; i < todoEls.length; i++) {
        if (el.dataset.id === todoEls[i].dataset.id) {
          id = el.dataset.id;
          await getDeleteTodo(id);
          todoEls[i].remove();
        }
      }
    });
  });

  // done 수정
  checkboxEls.forEach((el) => {
    el.addEventListener("click", async (e) => {
      for (let i = 0; i < todoEls.length; i++) {
        const titleEl = todoEls[i].children[0].children[2];

        if (el.checked && el.dataset.id === todoEls[i].dataset.id) {
          id = el.dataset.id;
          await getUpdateTodo(id, titleEl.textContent, JSON.parse(el.checked));

          titleEl.classList.add("todo--done");
          el.setAttribute("checked", true);
        } else if (!el.checked && el.dataset.id === todoEls[i].dataset.id) {
          id = el.dataset.id;
          await getUpdateTodo(id, titleEl.textContent, JSON.parse(el.checked));

          titleEl.classList.remove("todo--done");
          el.removeAttribute("checked");
        }
      }
    });
  });

  // title 수정
  amendInputEls.forEach((el) => {
    el.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        let inputVal = e.target.value;

        for (let i = 0; i < todoEls.length; i++) {
          if (e.target.dataset.id === todoEls[i].dataset.id) {
            await getUpdateTodo(
              e.target.dataset.id,
              inputVal,
              todoEls[i].children[0].children[0].checked
            );
            todoEls[i].children[0].children[2].textContent = inputVal;
          }
          e.target.value = "";
          todoEls[i].children[0].children[3].classList.remove("input--show");
        }
      }
    });
  });

  // 수정 버튼을 클릭하면 input 이 title 위에서 열리도록
  amendBtnEls.forEach((el) => {
    el.addEventListener("click", async (e) => {
      for (let i = 0; i < todoEls.length; i++) {
        const checkEl = todoEls[i].children[0].children[0];
        const titleEl = todoEls[i].children[0].children[2];
        const inputEl = todoEls[i].children[0].children[3];
        const closeEl = todoEls[i].children[1].children[2];
        const amendCloseBtn = todoEls[i].children[1].children[1];

        if (el.dataset.id === todoEls[i].dataset.id) {
          inputEl.classList.add("input--show");
          inputEl.focus();
          closeEl.classList.add("btn--show");
          amendCloseBtn.classList.add("btn--show");

          // 수정한 뒤 버튼을 다시 클릭해도 title 수정
          let inputVal = inputEl.value;
          if (inputVal !== "") {
            await getUpdateTodo(el.dataset.id, inputVal, checkEl.checked);
            titleEl.textContent = inputVal;
            inputEl.classList.remove("input--show");
            closeEl.classList.remove("btn--show");
            amendCloseBtn.classList.remove("btn--show");

            inputEl.value = "";
          }
        } else {
          inputEl.classList.remove("input--show");
          closeEl.classList.remove("btn--show");
          amendCloseBtn.classList.remove("btn--show");
          inputEl.value = "";
        }
      }
    });
  });

  // 수정 닫기
  amendCloseBtnEls.forEach((el) => {
    el.addEventListener("click", () => {
      for (let i = 0; i < todoEls.length; i++) {
        if (el.dataset.id === todoEls[i].dataset.id) {
          const inputEl = todoEls[i].children[0].children[3];
          const closeEl = todoEls[i].children[1].children[2];

          inputEl.classList.remove("input--show");
          closeEl.classList.remove("btn--show");
          el.classList.remove("btn--show");

          inputEl.value = "";
        }
      }
    });
  });

  return todosEl;
}
