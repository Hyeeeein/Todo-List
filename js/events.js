import { todosEl } from "./store.js";
import { renderDoneUpdate, renderTitleUpdate } from "./renderUpdate.js";
import { renderDeleteTodo } from "./renderDelete.js";

export default function events() {
  todosEl.querySelectorAll(".todo").forEach((todo) => {
    // 선언!
    const checkEl = todo.children[0].children[0];
    const titleEl = todo.children[0].children[2];
    const amendInputEl = todo.children[0].children[3];
    const amendBtnEl = todo.children[1].children[0];
    const amendCloseBtn = todo.children[1].children[1];
    const deleteBtnEl = todo.children[1].children[2];
    const id = todo.dataset.id;

    // todo 삭제
    deleteBtnEl.addEventListener("click", async () => {
      renderDeleteTodo(id);
    });

    // done 수정
    checkEl.addEventListener("change", async () => {
      renderDoneUpdate(id, checkEl, titleEl);
    });

    // 클릭하면 수정 input 열림
    amendBtnEl.addEventListener("click", async () => {
      amendInputEl.classList.add("input--show");
      amendInputEl.focus();
      amendCloseBtn.classList.add("btn--show");
      titleEl.classList.add("title--none");

      let inputVal = amendInputEl.value;

      // 수정한 뒤 버튼을 다시 클릭하면 title 수정
      if (inputVal !== "") {
        renderTitleUpdate(
          id,
          inputVal,
          checkEl.checked,
          titleEl,
          amendCloseBtn,
          amendInputEl
        );
      }
    });

    // title 수정
    amendInputEl.addEventListener("keydown", async (e) => {
      let inputVal = e.target.value;

      if (e.key === "Enter" && inputVal !== "") {
        renderTitleUpdate(
          id,
          inputVal,
          checkEl.checked,
          titleEl,
          amendCloseBtn,
          amendInputEl
        );
      }
    });

    // 수정 폼 닫기
    amendCloseBtn.addEventListener("click", async (e) => {
      amendInputEl.value = "";
      titleEl.classList.remove("title--none");
      amendInputEl.classList.remove("input--show");
      amendCloseBtn.classList.remove("btn--show");
    });
  });
}
