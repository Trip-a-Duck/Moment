import '../scss/pages/_main.scss';
import requests from './requests';

import france1 from '../img/france1.jpg';
import france2 from '../img/france2.jpg';
// import korea1 from '../img/korea1.jpg';
// import korea2 from '../img/korea2.jpg';
// import korea3 from '../img/korea3.jpg';
// import usa1 from '../img/usa1.jpg';
// import usa2 from '../img/usa2.jpg';

const $cardsContainer = document.querySelector('.cards-container');
const $selectBox = document.querySelector('.select-country');
const $loginUserId = document.querySelector('.login-user-id');
const $cardInfo = document.querySelector('.card__like-button');

let posts = [];

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
			<button class="card__like-button ${liked === false ? '' : 'hidden'}">
				<i class="far fa-heart"></i>
			</button>
			<button class="card__like-button ${liked === true ? '' : 'hidden'}">
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

const fetchPost = async () => {
  try {
    const { data } = await requests.getPostsByNation(selectedNation);
    setPosts(data);
  } catch (error) {
    console.error(error);
  }
};

//  initial rendering
window.addEventListener('DOMContentLoaded', () => {
  // if (JSON.parse(localStorage.getItem('userId')) === null)
  // moment로 로그인된 것을 가정
  localStorage.setItem('userId', 'moment');
  $loginUserId.innerText = 'login : moment';
  fetchPost();
});

$selectBox.addEventListener('change', e => {
  selectedNation = e.target.value;
  fetchPost();
});

$cardsContainer.addEventListener('click', async e => {
  const cardPostId = e.target.closest('.card').dataset.id;
  sessionStorage.setItem('postId', cardPostId);
  try {
    const response = await requests.postToggleLikedButton(cardPostId);
    if (response.status === 200) {
      setPosts(
        posts.map(post =>
          post.id === +cardPostId
            ? {
                ...post,
                liked: !post.liked,
              }
            : post
        )
      );
    }
  } catch (error) {
    console.error(error);
  }
});
