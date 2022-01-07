import requests from './requests';
import '../scss/pages/_upload.scss';

const $uploadedImage = document.querySelector('.uploaded-image');
const $inputFile = document.querySelector('.input-file');
const $postTitle = document.getElementById('post-title');
const $selectCountry = document.querySelector('.select-country');
const $postDesc = document.getElementById('post-desc');
const $postDescForm = document.querySelector('.post-desc-form');

const DETAIL_PAGE = 'http://localhost:9000/detail.html';
const state = {
  isEditing: false,
  postId: '',
  post: {},
};

const uploadImage = async () => {
  // 업로드된 파일
  const uploadedFile = $inputFile.files[0];

  const formData = new FormData();
  formData.append('img', uploadedFile);

  // 폼데이터를 서버로 전송한다.
  const res = await fetch('/upload', {
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data' },
    // body: JSON.stringify(formData)
    body: formData,
  });
  const { success, file } = await res.json();

  if (success) {
    console.log('UPLOAD SUCCESS!', file);
    // $uploadedImage.src = `/img/${file.originalname}`;
    // $uploadedImage.style.backgroundImage = `url('/img/${file.originalname}')`;
  } else {
    alert('포스트가 정상적으로 등록되지 않았습니다.\n다시 한번 포스팅 해주세요.');
  }
  return file.name;
};

const getOriginPost = async () => {
  console.log(document.referrer);
  if (document.referrer === DETAIL_PAGE) {
    state.postId = sessionStorage.getItem('postId');
    state.isEditing = true;
    console.log(sessionStorage.getItem('postId'), state.postId);
    try {
      const { data } = await requests.getPost(state.postId);
      console.log(data);
      state.post = data;
      $postTitle.value = data.title;

      $uploadedImage.style.backgroundImage = `url(${data.image})`;
      $uploadedImage.style.border = 'none';
      $uploadedImage.firstChild.textContent = '';

      [...$selectCountry.children].forEach($option => {
        $option.selected = $option.value === data.nation;
      });

      $postDesc.value = data.description;
    } catch (error) {
      console.error(error);
    }
  } else state.isEditing = false;
};

const getPostPayload = uploadedImage => ({
  ...state.post,
  title: $postTitle.value,
  nation: $selectCountry.value,
  description: $postDesc.value,
  image: uploadedImage ? `./img/${uploadedImage}` : state.post.image,
});

const fetchPost = async e => {
  e.preventDefault();
  if (!e.target.classList.contains('post-btn')) return;
  const { isEditing, postId, post } = state;
  try {
    if (isEditing) {
      let uploadedImage = null;
      if ($uploadedImage.style.backgroundImage !== `url(${post.image})`) {
        uploadedImage = await uploadImage();
      }

      const response = await requests.patchPost(postId, getPostPayload(uploadedImage));
      if (response.status === 200) {
        alert('포스트가 수정되었습니다.');
        location.href = DETAIL_PAGE;
      }
    } else {
      const uploadedImage = await uploadImage();
      const response = await requests.createPost(getPostPayload(uploadedImage));
      if (response.status === 201) {
        alert('포스트가 등록되었습니다.');
        location.href = DETAIL_PAGE;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener('DOMContentLoaded', getOriginPost);
$postDescForm.addEventListener('click', fetchPost);
$inputFile.addEventListener('change', () => {
  const [image] = $inputFile.files;
  console.log(image);
  if (!image) return;
  $uploadedImage.style.backgroundImage = `url(${URL.createObjectURL(image)})`;
  $uploadedImage.firstChild.textContent = '';
  state.post.image = `./img/${image.name}`;
});
