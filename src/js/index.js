import '../scss/pages/_main.scss';

const $cardsContainer = document.querySelector('.cards-container');
const $selectBox = document.querySelector('.select-country');

let posts = [
  {
    id: 1,
    userId: 'someone',
    nation: 'korea',
    title: '경복궁',
    comment: [
      {
        id: 2,
        userId: 'someone',
        description: '어쩌라고',
      },
    ],
    liked: false,
    image: '../src/img/france1.jpg',
    description: '내가 경복궁에 가서...',
  },
  {
    id: 2,
    userId: 'someone2',
    nation: 'USA',
    title: '경복궁',
    comment: [
      {
        id: 3,
        userId: 'someone',
        description: '어쩌라고',
      },
    ],
    liked: true,
    image: '../src/img/france2.jpg',
    description: '내가 경복궁에 가서...',
  },
];

let selectedNation = 'korea';

const render = () => {
  const _posts = posts.filter(post => post.nation === selectedNation);

  $cardsContainer.innerHTML = _posts
    .map(
      ({ id, title, userId, liked, image }) =>
        `<li class="card" data-id=${id}>
		<span class="card__user-id">${userId}</span>
		<a class="move-to-description" href="./detail.html">
			<img src="${image}" alt="card-image" />
		</a>
		<div class="card__info">
			<button class="card__like-button ${liked === false ? '' : 'no-display'}">
				<i class="far fa-heart"></i>
			</button>
			<button class="card__like-button ${liked === true ? '' : 'no-display'}">
				<i class="fas fa-heart"></i>
			</button>
			<span>${title}</span>
		</div>
	</li>`
    )
    .join('');
};

const setPosts = _posts => {
  posts = _posts;
  render();
};

const fetchPost = () => {
  // axios.get('/posts').then(setPosts).catch(console.error);
  setPosts(posts);
};

//  initial rendering
window.addEventListener('DOMContentLoaded', () => {
  // if (JSON.parse(localStorage.getItem('userId')) === null)
  // moment로 로그인된 것을 가정
  localStorage.setItem('userId', 'moment');
  fetchPost();
});

$selectBox.addEventListener('change', e => {
  selectedNation = e.target.value;
  fetchPost();
});

$cardsContainer.addEventListener('click', e => {
  const cardPostId = e.target.parentNode.parentNode.dataset.id;
  sessionStorage.setItem('postId', cardPostId);
});
