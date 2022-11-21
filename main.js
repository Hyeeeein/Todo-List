const test = (title, order) => {
  return new Promise((resolve, reject) => {
    fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: "FcKdtJs202209",
        username: "KDT3_KimHyein",
      },
      body: JSON.stringify({
        title: `${title}`,
        order: `${order}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        resolve();
      })
      .catch((rej) => {
        console.error(rej);
      });
  });
};

const inputEl = document.querySelector("input");
const bodyEl = document.querySelector("body");
const listEl = document.querySelector(".list");

let inputVal = inputEl.value;
let order = 0;

inputEl.addEventListener("keydown", (e) => {
  inputVal = e.target.value;
  if (e.key === "Enter") {
    e.preventDefault();
    test(inputVal, order);
    listEl.innerHTML += /* html */ `
    <p>${inputVal}</p>
    `;
    order += 1;
    e.target.value = "";
  }
});
