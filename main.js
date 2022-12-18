import { getCreateTodo } from "./js/fetch.js";
import renderTodos from "./js/renderTodos.js";
import { renderDeleteDones } from "./js/renderDelete.js";

const engLogo = document.querySelector(".logo h1");
const korLogo = document.querySelector(".logo h2");
const addInputEl = document.querySelector(".add_input");
const addBtnEl = document.querySelector(".add_btn");
const selectEl = document.querySelector("#done");
const donesDeleteBtnEl = document.querySelector(".dones-delete-btn");

// 타이핑
const engTxt = "HASEUL";
const korTxt = "하루를 슬기롭게";
let engCnt = 0;
let korCnt = 0;

function engTyping() {
  if (engCnt < engTxt.length) {
    let txt = engTxt.charAt(engCnt);
    engLogo.innerHTML += txt;
    engCnt++;
  } else {
    engLogo.classList.add("effect--end");
  }

  setTimeout(() => {
    if (korCnt < korTxt.length) {
      let txt = korTxt.charAt(korCnt);
      korLogo.innerHTML += txt;
      korCnt++;
    } else {
      korLogo.classList.add("effect--end");
    }
  }, 1500);
}
setInterval(engTyping, 150);

// 최초 호출
renderTodos();

// Add Todo
addInputEl.addEventListener("keydown", async (e) => {
  let inputVal = e.target.value;
  if (e.key === "Enter") {
    e.preventDefault();

    if (inputVal !== "" && !e.isComposing) {
      // let order = document.querySelectorAll(".todo").length;
      await getCreateTodo(inputVal);
      await renderTodos();
      e.target.value = "";
    } else {
      alert("할 일을 입력해주세요!");
    }
  }
});
addBtnEl.addEventListener("click", async (e) => {
  let inputVal = addInputEl.value;
  if (inputVal !== "" && !e.isComposing) {
    let order = document.querySelectorAll(".todo").length;
    await getCreateTodo(inputVal, order);
    await renderTodos();
    addInputEl.value = "";
  } else {
    alert("할 일을 입력해주세요!");
  }
});

// done undone 선택
selectEl.addEventListener("change", async (e) => {
  await renderTodos(selectEl.value);
});

// 한 일 삭제
donesDeleteBtnEl.addEventListener("click", async (e) => {
  await renderDeleteDones();
  await renderTodos();
});
