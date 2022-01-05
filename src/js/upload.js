// import '../scss/index.scss';
import '../scss/pages/_upload.scss';

console.log('upload');

const $uploadedImage = document.querySelector('.uploaded-image');
const $inputFile = document.querySelector('.input-file');
const $upload = document.querySelector('.upload-btn');

$inputFile.onchange = () => {
  const [image] = $inputFile.files;
  if (!image) return;
  $uploadedImage.style.backgroundImage = `url(${URL.createObjectURL(image)})`;
};

$upload.onclick = async e => {
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
  }
};
