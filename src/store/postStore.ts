
import { create } from "zustand";
import { CreatePostState, Post, PostsPaginate } from "../types/types";
import api from "../routes/api";
import { AxiosResponse } from "axios";
import { LIMIT_POSTS } from "../constants/consts";

// store object

type PostStore = {
  posts: Post[],
  post: any,
  nextPage: number,
  totalPages: number,
  isLoading: boolean,
  getPosts: any,
  createPost: any,
  setIsLoading: any,
  removePost: any,
}

const usePostStore = create((set, get) => ({
  posts: [],
  post: null,
  nextPage: 1,
  totalPages: 0,
  isLoading: false,

  // Get: /posts
  getPosts: async (
    limit: number,
    page: number,
  ) => {
    (get() as PostStore).setIsLoading();
    // fetch data
    const result: AxiosResponse<Post[], any> | undefined = 
      await api.getPosts({
        limit: limit, 
        page: page
      });
      
    (get() as PostStore).setIsLoading();

    // set posts
    if (result !== undefined && Array.isArray((result as unknown as PostsPaginate).posts)) {
      return set((state: PostStore) => ({
        ...state,
        posts: [...state.posts, ...(result as unknown as PostsPaginate).posts],
        nextPage: (result as unknown as PostsPaginate).nextPage,
        totalPages: (result as unknown as PostsPaginate).totalPages,
      }))
    }
  },

  // Get: /posts/:id
  getPost: async (id: string) => {
    (get() as PostStore).removePost();
    const result = await api.getPost(id)

    // if: it has error
    if (result && (result as unknown as any).error) {
      throw new Error('Get: /posts/:id failed.')
    }

    return set((state: any) => ({ ...state, post: result }))
  },

  // Post: /posts/create

  createPost: async function(
    data: CreatePostState, 
    toast: any,
    navigate: any
    ) {
    (get() as PostStore).setIsLoading();

    const result = 
      await api.createPost(data);

    (get() as PostStore).setIsLoading();

    try {
      if (!result?.error) {
        // store authUser: in localStorage
        console.log('result: /posts/create: ', result)
        toast({
          title: "success",
          description: 'post was created',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
        navigate('/', {
          replace: true
        })
        // get the posts again
        //(get() as PostStore).getPosts(LIMIT_POSTS, 1)

        // force referesh of the page:
        navigate(0)

        // redirect to hompage:
        //navigate('/')
  
        // store authUser: in zustand
        //return set((state: any) => ({ ...state, user: result }))
      } else {
        throw new Error('create post failed.')
      }
    } catch(err: any) {
      console.log('createPost: error', err)
    }
  },

  setIsLoading: () => set((state: any) => 
    ({ ...state, isLoading: !state.isLoading })),

  removePost: () => set((state: any) => 
    ({ ...state, post: null })),
}))

// subscribe
const unsub = usePostStore.subscribe((state) => {
  console.log('update: postStore: ', state)
})

// api: facade

// select
export const useSelectPosts = () => 
  usePostStore((state: any) => state.posts )

export const useSelectNextPage = () => 
  usePostStore((state: any) => state.nextPage)

export const useSelectIsPostsLoading = () => 
  usePostStore((state: any) => state.isLoading)

export const useSelectPost = () =>
  usePostStore((state: any) => state.post)

// dispatch
export const useDisGetPosts = () => 
  usePostStore((state: any) => state.getPosts)

export const useDisCreatePost = () => 
  usePostStore((state: any) => state.createPost)

export const useDisGetPost = () => 
  usePostStore((state: any) => state.getPost)