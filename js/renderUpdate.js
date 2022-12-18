import { getUpdateTodo } from "./fetch.js";
import { todoDones } from "./store.js";

export async function renderDoneUpdate(id, check, title) {
  if (check.checked) {
    await getUpdateTodo(id, title.textContent, true);
    title.classList.add("todo--done");
    check.setAttribute("checked", true);
    todoDones.push(id);
  } else {
    await getUpdateTodo(id, title.textContent, false);
    title.classList.remove("todo--done");
    check.removeAttribute("checked");
    todoDones.splice(todoDones.indexOf(id), 1);
  }
}

export async function renderTitleUpdate(
  id,
  inputVal,
  check,
  title,
  close,
  input
) {
  await getUpdateTodo(id, inputVal, check);
  title.textContent = inputVal;
  input.classList.remove("input--show");
  close.classList.remove("btn--show");
  title.classList.remove("title--none");
  input.value = "";
}
