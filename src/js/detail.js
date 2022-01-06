import { doc } from 'prettier';
import '../scss/pages/_detail.scss';

console.log('Test');
import '../scss/pages/_detail.scss';
import request from './requests.js';

let post = {};
const $container = document.querySelector('.container');
const currentUser = localStorage.getItem('userId');
const postId = sessionStorage.getItem('postId');

const render = post => {
  const $article = document.createElement('artice');
  $article.className = 'detail';

  const detailHtml = `
        <header class="detail__header">
          <span class="detail__title">${post.title}</span>
          <div class="func_buttons">
            <a href="./upload.html" class="edit ${currentUser === post.userId ? '' : hidden}">수정</a>
            <button class="delete ${currentUser === post.userId ? '' : 'hidden'}">삭제</button>
          </div>
        </header>
        <section class="detail__img">
          <img src="${post.image}" alt="detail-image" />
        </section>
        <section class="info">
          <button class="detail__like-button">
            <i class="far fa-heart"></i>
          </button>
          <button class="detail__like-button ${post.liked ? '' : 'hidden'}">
            <i class="fas fa-heart"></i>
          </button>
          <span class="uploader-id">${post.userId}</span>
        </section>
        <section class="detail-content">
          ${post.description}
        </section>
        <setcion class="comment">
          <form class="user-comment">
            <label class="hidden" for="user-conmmet-input" aria-label="댓글">댓글창</label>
            <input type="text" id="user-comment-input" placeholder="댓글을 입력해 주세요." />
          </form>
          <button class="user-comment-btn">댓글 달기</button>
        </setcion>
        <div class="detail-comments">
        </div>`;

  const $commentDiv = document.querySelector('.detail-comments');
  $commentDiv.appendChild(
    comments
      .map(comment => {
        `<section class="detail-comment-container">
          <span class="user-id">${comment.userId}</span>
          <span an class="detail-comment">${comment.description}</span>
        </section>`;
      })
      .join('')
  );

  if (currentUser === post.userId) {
  }
  $article.innerHTML += detailHtml;
};

const setCommnet = comment => {
  const $commentDiv = document.querySelector('.detail-comments');
  $commentDiv.appendChild(`<section class="detail-comment-container">
          <span class="user-id">${comment.userId}</span>
          <span class="detail-comment">${comment.description}</span>
        </section>`);
};

const fetchPost = async () => {
  try {
    const { data } = await request.getPost(postId);
    post = data;
    render(data);
  } catch (e) {
    console.error(e);
  }
};

const addEvent = async e => {
  console.log(e.target);
  if (e.target.classList.contains('delete')) {
    try {
      const response = await request.deletePost(postId);
      if (response.status === 200) {
        console.log('deleted');
      }
    } catch (e) {
      console.error(e);
    }
  } else if (e.target.classList.contains('user-comment-btn')) {
    try {
      const $comment = document.querySelector('#user-comment-input').value;
      const { data } = await request.postComment(postId, currentUser, $comment);
      setCommnet(data);
    } catch (e) {
      console.error(e);
    }
  } else if (e.target.tagName === 'I') {
    try {
      const response = await request.likePost(postId);
      if (response.status === 200) {
        post.liked = !post.liked;
        const $liked = document.querySelector('.detail__like-button');
        $liked.toggleClass('hidden');
      }
    } catch (e) {
      console.error(e);
    }
  }
};

window.addEventListener('DOMContentLoaded', fetchPost);

$container.addEventListener('click', addEvent);
