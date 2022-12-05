import { getCreateTodo, getReadTodo, getDeleteTodo } from "./js/fetch.js";
import renderTodo from "./js/render.js";

const engLogo = document.querySelector(".logo h1");
const korLogo = document.querySelector(".logo h2");
const inputEl = document.querySelector(".add_input");
const listEl = document.querySelector(".list");
const btnEl = document.querySelector(".add_btn");
const selectEl = document.querySelector("#done");
const doneBtnEl = document.querySelector(".done_btn");
const donesDeleteBtnEl = document.querySelector(".dones-delete-btn");
const loaderEl = document.querySelector(".loader");

// 타이핑
const engTxt = "HASEUL";
const korTxt = "하루를 슬기롭게";
let i = 0,
  j = 0;

function engTyping() {
  if (i < engTxt.length) {
    let txt = engTxt.charAt(i);
    engLogo.innerHTML += txt;
    i++;
  } else {
    engLogo.classList.add("effect--end");
  }

  setTimeout(() => {
    if (j < korTxt.length) {
      let txt = korTxt.charAt(j);
      korLogo.innerHTML += txt;
      j++;
    } else {
      korLogo.classList.add("effect--end");
    }
  }, 1500);
}
setInterval(engTyping, 150);

// 초기화
listEl.innerHTML = "";

// 최초 호출, 즉시실행함수로 감싼 이유는 async await 로 최초 호출을 해주기 위함
(async () => {
  loaderEl.classList.add("loader--show");
  const todos = await getReadTodo();
  listEl.append(await renderTodo(todos));
  loaderEl.classList.remove("loader--show");

  // 적은 것 바로 추가
  inputEl.addEventListener("keydown", async (e) => {
    let inputVal = e.target.value;
    if (e.key === "Enter" && inputVal !== "") {
      e.preventDefault();
      listEl.innerHTML = "";
      loaderEl.classList.add("loader--show");

      let order = document.querySelectorAll(".todo").length;
      await getCreateTodo(inputVal, order);

      const todos = await getReadTodo();
      listEl.append(await renderTodo(todos));

      e.target.value = "";
      loaderEl.classList.remove("loader--show");
    }
  });
  btnEl.addEventListener("click", async (e) => {
    let inputVal = inputEl.value;
    if (inputVal !== "") {
      e.preventDefault();
      listEl.innerHTML = "";
      loaderEl.classList.add("loader--show");

      let order = document.querySelectorAll(".todo").length;
      await getCreateTodo(inputVal, order);

      const todos = await getReadTodo();
      listEl.append(await renderTodo(todos));

      inputEl.value = "";
      loaderEl.classList.remove("loader--show");
    }
  });

  // done undone 선택
  doneBtnEl.addEventListener("click", async (e) => {
    loaderEl.classList.add("loader--show");
    listEl.innerHTML = "";
    const todos = await getReadTodo();
    listEl.append(await renderTodo(todos, selectEl.value));
    loaderEl.classList.remove("loader--show");
  });

  // 한 일 삭제
  let todoDone = [];
  for (let todo of todos) {
    if (JSON.parse(todo.done)) {
      todoDone.push(todo.id);
    }
  }

  donesDeleteBtnEl.addEventListener("click", async (e) => {
    for (let x of todoDone) {
      await getDeleteTodo(x);
    }

    loaderEl.classList.add("loader--show");
    listEl.innerHTML = "";
    const todos = await getReadTodo();
    listEl.append(await renderTodo(todos));
    loaderEl.classList.remove("loader--show");
  });
})();
