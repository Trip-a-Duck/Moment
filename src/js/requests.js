import axios from 'axios';

export default {
  async getPostsByNation(nation) {
    return await axios.get(`/posts?nation=${nation}`);
  },
  async postToggleLiked(id) {
    return await axios.patch(`/post/liked/${id}`);
  },
  async getPost(id) {
    return await axios.get(`/post/${id}`);
  },
  async patchPost(id, postData) {
    return await axios.patch(`/post/${id}`, postData);
  },
  async createPost(postData) {
    return await axios.post('/post', postData);
  },
};
