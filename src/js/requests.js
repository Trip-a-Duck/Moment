import axios from 'axios';

export default {
  async getPostsByNation(nation) {
    return await axios.get(`/posts?nation=${nation}`);
  },
  async postToggleLikedButton(id) {
    return await axios.post(`/post/liked/${id}`);
  },
  async getPostById(id) {
    return await axios.get(`/post/${id}`);
  },
};
