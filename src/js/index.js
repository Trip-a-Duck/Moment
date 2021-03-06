import '../scss/pages/_main.scss';
import requests from './requests';

const $cardsContainer = document.querySelector('.cards-container');
const $selectBox = document.querySelector('.select-country');
const $loginUserId = document.querySelector('.current-user-id');

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
    setPosts(data);
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener('DOMContentLoaded', () => {
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
  sessionStorage.setItem('nation', selectedNation);
  fetchPost();
});

$cardsContainer.addEventListener('click', ({ target }) => {
  if (!target.classList.contains('card') && target.tagName !== 'IMG') return;
  const cardPostId = target.closest('.card').dataset.id;
  sessionStorage.setItem('postId', cardPostId);
});

$cardsContainer.addEventListener('click', async ({ target }) => {
  if (!target.classList.contains('card') && !target.classList.contains('fa-heart')) return;
  liked = target.classList.contains('fas');

  if (liked) {
    target.parentNode.classList.toggle('hidden');
    target.parentNode.previousElementSibling.classList.toggle('hidden');
  } else {
    target.parentNode.classList.toggle('hidden');
    target.parentNode.nextElementSibling.classList.toggle('hidden');
  }
  const cardPostId = target.closest('.card').dataset.id;
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
