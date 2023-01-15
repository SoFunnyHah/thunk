import axios from 'axios';
import {
  ADD_POST, DELETE_POST, SET_POSTS, UPDATE_POST,
} from '../types';

export const addPost = (payload) => ({ type: ADD_POST, payload });
export const deletePost = (payload) => ({ type: DELETE_POST, payload });
export const setPosts = (payload) => ({ type: SET_POSTS, payload });
export const updatePost = (payload) => ({ type: UPDATE_POST, payload });

export const fetchPosts = () => (dispatch) => {
  axios('/api/posts')
    .then((res) => dispatch(setPosts(res.data)))
    .catch(console.log);
};

export const submitPostAsync = (input) => (dispatch) => {
  console.log(input);
  axios.post('/api/posts', { input })
    .then((res) => dispatch(addPost(res.data)))
    .catch(console.log);
};

export const deletePostAsync = (id) => (dispatch) => {
  axios.delete(`/api/posts/${id}`)
    .then(() => dispatch(deletePost(id)))
    .catch(console.log);
};

export const updatePostAsync = (obj) => (dispatch) => {
  const { id, input } = obj;
  axios.put(`/api/posts/${id}`, { input })
    .then((res) => dispatch(setPosts(res.data)))
    .catch(console.log);
};
