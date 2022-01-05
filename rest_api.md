&lt;main page>

// main page 렌더링

- get('/posts/:nation')

// 하트 버튼을 클릭한 경우

- post('/post/liked/:id')

&lt;upload page>

// moment 버튼을 누른 경우

- post('/post/:id',
  {
  userId: "someone",
  nation: 'korea',
  title: '경복궁',
  liked: false,
  image: 'url',
  description: "내가 경복궁에 가서.})

// 이미지 업로드

- post('/upload', {formData});

// detail.html에서 수정 버튼을 눌렀을 때 원본 포스팅 contents 요청

- get('/post/edit/:id')

// 수정 요청

- patch('/post:id', {
  userId: "someone",
  nation: 'korea',
  title: '경복궁',
  liked: false,
  image: 'url',
  description: "내가 경복궁에 가서.})

&lt;detail page>

// detail page 렌더링

- get('/post/:id')

// 삭제 버튼을 누른 경우

- delete('/post/:id')

// 댓글을 단 경우

- post('/post/comment/:id', {
  userId: "someone",
  description: "어쩌라고"
  })

// 하트 버튼을 클릭한 경우

- post('/post/liked/:id')
