import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
//const API = axios.create({ baseURL: 'https://bloggy-0zjl.onrender.com' });
const postURL = '/posts';

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPost = (id) => API.get(`${postURL}/${id}`);
export const fetchPosts = (page) => API.get(`${postURL}?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`${postURL}/search?searchQuery=${searchQuery?.search || 'none' }&tags=${searchQuery?.tags}`);
export const createPost = (newPost) => API.post(postURL, newPost);
export const likePost = (id) => API.patch(`${postURL}/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`${postURL}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${postURL}/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);