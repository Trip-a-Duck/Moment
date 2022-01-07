import '../scss/pages/_main.scss';
import requests from './requests';

const $cardsContainer = document.querySelector('.cards-container');
const $selectBox = document.querySelector('.select-country');
const $loginUserId = document.querySelector('.login-user-id');

let posts = [];

let selectedNation = 'korea';

let liked = false;

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
    console.log({ data });
    setPosts(data);
  } catch (error) {
    console.error(error);
  }
};

//  initial rendering
window.addEventListener('DOMContentLoaded', () => {
  // moment로 로그인된 것을 가정
  localStorage.setItem('userId', 'admin');
  selectedNation = sessionStorage.getItem('nation')
    ? sessionStorage.getItem('nation')
    : sessionStorage.setItem('nation', selectedNation);
  $selectBox.value = selectedNation;
  $loginUserId.innerText = 'admin';
  fetchPost();
});

$selectBox.addEventListener('change', e => {
  selectedNation = e.target.value;
  console.log(selectedNation);
  sessionStorage.setItem('nation', selectedNation);
  fetchPost();
});

$cardsContainer.addEventListener('click', async e => {
  const cardPostId = e.target.closest('.card').dataset.id;
  sessionStorage.setItem('postId', cardPostId);
});

$cardsContainer.addEventListener('click', async e => {
  if (!e.target.classList.contains('fa-heart')) return;

  // 색칠된 하트를 가지고 있는가?
  liked = e.target.classList.contains('fas');

  if (liked) {
    e.target.parentNode.classList.toggle('hidden');
    e.target.parentNode.previousElementSibling.classList.toggle('hidden');
  } else {
    e.target.parentNode.classList.toggle('hidden');
    e.target.parentNode.nextElementSibling.classList.toggle('hidden');
  }
  const cardPostId = e.target.closest('.card').dataset.id;
  sessionStorage.setItem('postId', cardPostId);
  try {
    const response = await requests.postToggleLiked(cardPostId);
    if (response.status === 200) {
      posts.map(post =>
        post.id === +cardPostId
          ? {
              ...post,
              liked: !post.liked,
            }
          : post
      );
    }
  } catch (error) {
    console.error(error);
  }
});
