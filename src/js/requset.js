import axios from 'axios';

const getPostsByNation = nation => {
  axios.get(`/posts/nation=${nation}`);
};

axios.get(`/posts/nation=${nation}`);
