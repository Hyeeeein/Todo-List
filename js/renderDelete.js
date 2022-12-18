import { todoDones, todosEl } from "./store.js";
import { getDeleteTodo } from "./fetch.js";

export async function renderDeleteDones() {
  for (let todoDone of todoDones) {
    await getDeleteTodo(todoDone);
  }
  todoDones.splice(0);
}

export async function renderDeleteTodo(id) {
  todosEl.querySelectorAll(".todo").forEach(async (todo) => {
    if (todo.dataset.id === id) {
      await getDeleteTodo(id);
      todo.remove();
    }
  });
}
