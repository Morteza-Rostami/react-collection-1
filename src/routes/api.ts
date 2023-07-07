import axios, { AxiosResponse } from "axios"
import { CreatePostState, LoginFormState, Post, RegisterFormState } from "../types/types"
import { LIMIT_POSTS } from "../constants/consts"

const Axios = axios.create({
  withCredentials: true,
});

const api = {
  posts_url: `/api/posts`,
  users_url: `/api/users`,
  auth_url: `/api/auth`,

  //========================================

  // /api/posts

  // GET: api/posts?limit=10&page=1
  getPosts: async function({
    limit=LIMIT_POSTS,
    page=1
  }): Promise<AxiosResponse<Post[], any> | undefined> {
    try {
      const url = `${this.posts_url}?limit=${limit}&page=${page}`
      const res = await Axios.get(url)
      return res.data
        
    } catch(err: any) {
      console.log({
        msg: 'Error: api/posts',
        stack: err.stack,
        message: err.message,
      })
    }
  },

  getPost: async function(id: string): Promise<AxiosResponse<Post> | undefined> {
    try {
      const url = `${this.posts_url}/${id}`
      const res = await Axios.get(url)
      return res.data
        
    } catch(err: any) {
      console.log({
        msg: 'Error: api/posts/:id',
        stack: err.stack,
        message: err.message,
      })
    }
  },

  // Post: api/posts/create
  createPost: async function(data: CreatePostState) {
    try {
      const url = `${this.posts_url}/create`
      const res = await Axios.post(url, data)
      return res.data
        
    } catch(err: any) {
      console.log({
        serverErr: err?.response.data.error,
        msg: 'Error: api/posts',
        stack: err.stack,
        message: err.message,
      })
      return err.response.data
    }
  },

  //========================================

  // /api/auth

  // /api/atuh/register
  register: async function(formState: RegisterFormState) {
    try {
      const url = `${this.auth_url}/register`
      const res = await Axios.post(url, formState)
      return res.data 

    } catch(err: any) {
      console.log({
        serverErr: err.response.data.error,
        msg: 'Error: api/auth/register',
        stack: err.stack,
        message: err.message,
      })
      return err.response.data
    }
  },

  // /api/auth/login
  login: async function(
    formState: LoginFormState,
    toast: any,
    ) {
    try {
      const url = `${this.auth_url}/login`
      const res = await Axios.post(url, formState)
      return res.data;
        
    } catch(err: any) {
      /* console.log({
        // error: i send from the server.
        serverErr: err.response.data.error,
        msg: 'Error: api/auth/login',
        stack: err.stack,
        message: err.message,
      }) */
      return err.response.data
    }
  },

  // /api/auth/logout
  logout: async function() {
    try {
      const url = `${this.auth_url}/logout`
      const res = await Axios.post(url)
      return res.data
    } catch(err: any) {
      console.log({
        serverErr: err.response.data.error,
        msg: 'Error: api/auth/logout',
        stack: err.stack,
        message: err.message,
      })
      return err.response.data
    }
  },

  //========================================

  //========================================


}

export default api