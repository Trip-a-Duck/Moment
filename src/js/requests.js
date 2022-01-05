import axios from 'axios';

export default {
  // async getPost(id) {
  //   return await axios.get(`/post/${id}`);
  // },
  // async deletePost(id) {
  //   return await axios.delete(`/post/${id}`);
  // },
  // async postComment(id, user_id, comment) {
  //   return await axios.post(`/post/${id}`, {
  //     userId: user_id,
  //     description: comment,
  //   });
  // },
  getPost(id) {
    console.log('get');
  },
  deletePost(id) {
    console.log('comment');
  },
  postComment(id, currentUser, comment) {
    console.log(comment);
  },
  likePost(id) {
    console.log('eee');
  },
};
