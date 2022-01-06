import axios from 'axios';

export default {
  async getPost(id) {
    return await axios.get(`/post/${id}`);
  },
  async deletePost(id) {
    return await axios.delete(`/post/${id}`);
  },
  async postComment(id, user_id, comment) {
    return await axios.post(`/post/comment/${id}`, {
      userId: user_id,
      description: comment,
    });
  },
  async postToggleLiked(id) {
    return await axios.patch(`/post/liked/${id}`);
  },
};
