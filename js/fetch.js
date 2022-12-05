// 추가
export const getCreateTodo = (title, order) => {
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
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        apikey: "FcKdtJs202209",
        username: "KDT3_KimHyein",
      },
    }
  );
  const json = await res.json();
  return json;
}

// 삭제
export const getDeleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202209",
          username: "KDT3_KimHyein",
        },
      }
    )
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
    fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202209",
          username: "KDT3_KimHyein",
        },
        body: JSON.stringify({
          title: `${title}`,
          done: `${done}`,
          // order: `${order}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        resolve();
      })
      .catch((rej) => {
        console.error(rej);
      });
  });
};
