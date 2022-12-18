const URL = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos";

const HEADERS = {
  "content-type": "application/json",
  apikey: "FcKdtJs202209",
  username: "KDT3_KimHyein",
};

// 추가
export const getCreateTodo = (title) => {
  return new Promise((resolve, reject) => {
    fetch(URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        title: `${title}`,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        resolve();
      })
      .catch((reject) => {
        console.error(reject);
      });
  });
};

// 조회
export async function getReadTodo() {
  const res = await fetch(URL, {
    method: "GET",
    headers: HEADERS,
  });
  const json = await res.json();
  return json;
}

// 삭제
export const getDeleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    fetch(URL + `/${id}`, {
      method: "DELETE",
      headers: HEADERS,
    })
      .then((res) => res.json())
      .then((res) => {
        resolve();
      })
      .catch((rej) => {
        console.error(rej);
      });
  });
};

// 수정
export const getUpdateTodo = (id, title, done) => {
  return new Promise((resolve, reject) => {
    fetch(URL + `/${id}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({
        title: `${title}`,
        done: `${done}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        resolve();
      })
      .catch((rej) => {
        console.error(rej);
      });
  });
};
