import '../scss/pages/_detail.scss';

console.log('Test');
import '../scss/pages/_detail.scss';
import request from './requests.js';

const $container = document.querySelector('.container');
const currentUser = localStorage.getItem('userId');
const postId = sessionStorage.getItem('postId');

const render = post => {
  $container.innerHTML += `<article class="detail">
        <header class="detail__header">
          <span class="detail__title">${post.title}</span>
          <div class="func_buttons">
            <a href="./upload.html" class="edit">수정</a>
            <button class="delete">삭제</button>
          </div>
        </header>
        <section class="detail__img">
          <img src="ttt" alt="detail-image" />
        </section>
        <section class="info">
          <button class="detail__like-button">
            <i class="far fa-heart"></i>
          </button>
          <button class="detail__like-button hidden">
            <i class="fas fa-heart"></i>
          </button>
          <span class="uploader-id">uploader-id</span>
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

      </article>`;
  //여기는 배열이므로 돌면서 추가.
  <div class="detail-comments">
    <section class="detail-comment-container">
      <span class="user-id">${post.comment.userId}</span>
      <span class="detail-comment">${post.comment.description}</span>
    </section>
  </div>;
};

const fetchPost = () => {
  try {
    // const post = await request.getPost(postId);
    render();
    // render(post);
    // $button = document.querySelector('.delete');
    // $button.addEventListener('click', request.deletePost(postId));
    // document
    //   .querySelector('.user-comment-btn')
    //   .addEventListener('click', request.postComment(postId, currentUser, $comment));
  } catch {}
};

const addEvent = e => {
  if (e.target.classList.contains('delete')) {
    request.deletePost(postId);
  } else if (e.target.classList.contains('user-comment-btn')) {
    const $comment = document.querySelector('#user-comment-input').value;
    request.postComment(postId, currentUser, $comment);
  } else if (e.target.tagName === 'I') {
    request.likePost(postId);
  }
};

window.addEventListener('DOMContentLoaded', fetchPost);

$container.addEventListener('click', addEvent);
