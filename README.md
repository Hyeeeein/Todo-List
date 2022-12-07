# 📌 할 일 관리(Todo) 사이트 제작

<br/>

## ✨ 결과물

#### 배포 주소

- https://hyeeeein.github.io/Todo-List/

#### 코드

- https://github.com/Hyeeeein/Todo-List/tree/develop

<br/>

## 📅 작업 기간

- 2022.11.21 ~ 2022.12.05

<br/>

## 🛠 사용 기술

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=SASS&logoColor=white"> <img src="https://img.shields.io/badge/Javascript-E7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">

<br/>

## ✔ 요구사항

### :exclamation: 필수

- [x] 할 일 목록(List)이 출력돼야 합니다.
- [x] 할 일 항목(Item)을 새롭게 추가할 수 있어야 합니다.
- [x] 할 일 항목을 수정할 수 있어야 합니다.
- [x] 할 일 항목을 삭제할 수 있어야 합니다.
- [x] jQuery, React, Vue 등 JS 라이브러리와 프레임워크는 사용하지 않아야 합니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### :grey_question: 선택

- [ ] 가능하다면, 타입스크립트를 사용해보세요.
- [ ] 할 일 항목의 순서를 바꿀 수 있도록 만들어보세요.
- [x] 할 일을 완료하지 않은 항목과 완료한 항목을 분류해서 출력해보세요.
- [x] 할 일을 완료한 항목을 한 번에 삭제할 수 있도록 만들어보세요.
- [ ] 할 일 항목의 최신 수정일을 표시해보세요.
- [x] 할 일 목록이 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 기타 동작이 완료되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [ ] 할 일과 관련된 기타 기능도 고려해보세요.

<br/>

## 🧾 주요 구현 사항

#### HTML, SCSS

- 시멘틱 태그 사용하여 구현했습니다.
- SCSS 를 이용하여 BEM 방법론으로 작성하고, 변수를 사용하여 재사용성을 높이고, 반응형으로 다양한 디바이스에 맞게 화면이 반영되도록 구현했습니다.

#### Javascript

- API 를 이용하여 CRUD 를 구현했습니다.
- 기능별로 모듈화를 했습니다.
- select box 의 각 option 을 선택한 뒤 옆의 체크 아이콘 버튼을 누르면 완료된 할 일과 완료되지 않은 할 일을 구분하여 보여줍니다.
- ALL DONE DELETE 버튼을 누르면 완료한 할 일들을 한꺼번에 삭제해줍니다.
- 수정 아이콘 버튼을 누르면 할 일의 제목을 수정할 수 있으며 버튼을 누르면 수정 창이 사라집니다.
- 할 일을 추가하거나 수정할 때 나타나는 창은 키보드의 enter 를 눌러도, 화면의 버튼을 눌러도 작동됩니다.
- 할 일을 추가할 때, select box 를 통해 할 일을 조회할 때, 완료된 할 일을 삭제할 때 로딩 애니메이션이 나옵니다.

<br/>

## ⏳ 어려웠던 부분 / 아쉬운 점

- 모듈화가 깔끔하게 구분되지 않아서 아쉬웠습니다
- api 와 콜백에 대한 이해가 부족한 탓인지 api 정보 가져오기가 조금 어려웠습니다
- 선택 사항들을 모두 구현하지 못해 아쉬웠습니다
- 완료된 할 일들을 버튼을 눌러 한꺼번에 지워줄 때 체크를 한 뒤 바로 해당 기능을 사용하면 체크된 것을 바로 수정 api 에 반영해준 것이 아니라 한번 새로고침을 해준 뒤 버튼을 클릭해야 합니다

<br/>

## 🙏🏻 피드백을 받고 싶은 부분

1. 지금 모듈화의 상태에서 좀 더 구분해주고 싶은데 어떻게 구분해주면 좋을지 궁금합니다
1. api 가져오는 건 조금 알게 되었다고 생각했는데 아래 코드로는 정보를 가져오지 못했습니다 어느 부분이 잘못 되었던건지 궁금합니다

```
// undefined
const getReadTodo = () => {
  return new Promise((resolve, reject) => {
    fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        apikey: "FcKdtJs202209",
        username: "KDT3_KimHyein",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        resolve();
      })
      .catch((rej) => {
        console.error(rej);
      });
  });
};
(async () => {
  const readTodo = await getReadTodo();
  console.log(readTodo);
})();
```

1. 원래 수정 input value 값이 비어있을 때 수정버튼 한번 더 누르면 닫아주려고 했습니다 근데 열리는 동시에 열리는 class 를 추가해주고 값은 비어있기 때문에 값이 비어있고 열리는 class 가 붙어있으면 닫히라고 해주면 열리자마자 닫혀버리는 상황이 발생했습니다 그래서 닫기버튼 따로 추가해줘서 해결했지만 수정버튼 하나만으로 해결할 수 있는 방법은 없을지 궁금합니다

1. 추가를 하자마자 랜더가 되게 하고 싶었습니다 그러면 전체 할 일을 받아오기 때문에 입력이 될때마다 조회하는 값들이 모두 출력이 되어서 리스트 전체를 지웠다가 다시 랜더링을 하게 되었습니다 할 일을 입력할 때마다 지웠다가 다시 랜더링 해주는 것은 비효율적인 것 같습니다 좀 더 좋은 방법이 없을지 궁금합니다

1. 조회한 값들의 길이를 추가할 때 순서(order) 의 값으로 넣어주려고 했더니 항목 추가를 한 다음 조회를 하고 있어서 하지 못했습니다 그래서 화면에 출력되는 할 일(todo)들의 길이를 order 값으로 지정했습니다 하지만 중간에 있는 할 일을 삭제를 하고 다시 추가하면 할 일 길이의 다음 값으로 출력되기 때문에 order 값이 중복됩니다 중복이 되지 않고 다음 번호를 출력할 방법이 없을까요?

1. 완료된 할 일들을 버튼을 눌러 한꺼번에 지워줄 때 체크를 한 뒤 바로 해당 기능을 사용하면 체크된 것을 바로 수정 api 에 반영해준 것이 아니라 한번 새로고침을 해준 뒤 버튼을 클릭해야 합니다. 어떻게 하면 체크와 동시에 api 에도 반영이 되고 화면 상에도 반영이 되어 바로 삭제를 해줄 수 있을까요?

1. github 으로 배포 후 **Error with Permissions-Policy header: Origin trial controlled feature not enabled: 'interest-cohort'.** 기능들은 잘 작동이 되는데 이런 에러가 console 에 출력되었습니다 무슨 에러인지 궁금합니다

<br/>
