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

let posts = [
  {
    id: 1,
    userId: 'minsoftk',
    nation: 'korea',
    title: '전주',
    comment: [
      {
        id: 2,
        userId: '천재효식',
        description: 'ㅋㅋㅋㅋ',
      },
    ],
    liked: false,
    image: './img/korea4',
    description: '전주 한옥마을...',
  },
  {
    id: 2,
    userId: '진영쏭',
    nation: 'korea',
    title: '석가모니',
    comment: [
      {
        id: 3,
        userId: 'moment',
        description: '잘봤습니다^^',
      },
    ],
    liked: true,
    image: './img/korea3',
    description: '석가모니가 너무 멋있습... ',
  },
  {
    id: 3,
    userId: '천재효식',
    nation: 'korea',
    title: '동궁과 월지',
    comment: [
      {
        id: 3,
        userId: '천재효식',
        description: '나는 천재다!',
      },
    ],
    liked: true,
    image: './img/korea2',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 4,
    userId: 'moment',
    nation: 'korea',
    title: '수원 화성',
    comment: [
      {
        id: 4,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/korea1',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 5,
    userId: 'moment',
    nation: 'korea',
    title: '수원 화성',
    comment: [
      {
        id: 4,
        userId: 'someone',
        description: '어쩌라고',
      },
    ],
    liked: true,
    image: './img/korea1',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 6,
    userId: '진영쏭',
    nation: 'france',
    title: '에펠탑',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/france1',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 7,
    userId: '천재효식',
    nation: 'france',
    title: '르브르 박물관',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/france2',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 8,
    userId: '천재효식',
    nation: 'france',
    title: '브루고뉴',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/france3',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 9,
    userId: '천재효식',
    nation: 'korea',
    title: '가로수 길',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/korea5',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 10,
    userId: 'minsoftk',
    nation: 'france',
    title: '프로방스',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/france4',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 11,
    userId: 'minsoftk',
    nation: 'france',
    title: '쁘띠미누 등대',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/france5',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 12,
    userId: 'minsoftk',
    nation: 'france',
    title: '노르망디',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/france5',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 13,
    userId: 'minsoftk',
    nation: 'france',
    title: '',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/france6',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 14,
    userId: 'minsoftk',
    nation: 'usa',
    title: '뉴욕',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/usa3',
    description: '경치가 너무 멋있네용...',
  },
  {
    id: 15,
    userId: 'minsoftk',
    nation: 'usa',
    title: '마이애미',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/usa4',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 14,
    userId: 'minsoftk',
    nation: 'usa',
    title: '마운트 러쉬모어',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/usa5',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 15,
    userId: 'minsoftk',
    nation: 'australia',
    title: '코알라',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/australia1',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 16,
    userId: 'minsoftk',
    nation: 'australia',
    title: '시드니',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/australia2',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 17,
    userId: 'minsoftk',
    nation: 'australia',
    title: '캥거루',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/australia3',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 18,
    userId: 'minsoftk',
    nation: 'australia',
    title: '오페라 하우스',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/australia4',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 19,
    userId: 'minsoftk',
    nation: 'canada',
    title: '오페라 하우스',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/canada1',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 20,
    userId: 'minsoftk',
    nation: 'canada',
    title: 'moraine-lake',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/canada2',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 21,
    userId: 'minsoftk',
    nation: 'canada',
    title: '천국의 사원',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/china1',
    description: '경주가 너무 멋있네용...',
  },
  {
    id: 22,
    userId: 'minsoftk',
    nation: 'canada',
    title: '천국의 사원',
    comment: [
      {
        id: 1,
        userId: 'minsoftk',
        description: 'ㅋㅋㅋ',
      },
    ],
    liked: true,
    image: './img/china1',
    description: '경주가 너무 멋있네용...',
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
  // setPosts(posts);
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
