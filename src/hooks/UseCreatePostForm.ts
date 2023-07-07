import { useState } from "react";
import { CreatePostState, RegisterFormState } from "../types/types";
import { useSelectAuthUser } from "../store/authStore";
import { useDisCreatePost } from "../store/postStore";

const useCreatePostForm = (toast: any, navigate: any) => {
  const [state, setState] = useState<CreatePostState>({
    title: '',
    body: '',
    img: null,
    tags: [],
    errors: {}
  })

  const authUser = useSelectAuthUser()
  const createPostAct = useDisCreatePost()

  function validate() {
    const errors: {
      [key: string]: string
    } = {}

    if (!state.title.trim()) {
      errors.title = 'title is required'
    }

    if (!state.body.trim()) {
      errors.body = 'body is required'
    } 

    if (!state.img) {
      errors.img = 'image is required'
    }

    if (state.img && state.img.size > 1024 * 1024) {
      errors.img = 'image is to big'
    }

    if (!state.tags.length) {
      errors.tags = 'enter at least one tag'
    }

    // set errors state to errors object
    setState(c => ({ ...c, errors: errors }))
    return errors
  }

  function handleFileChange(event: any) {
    setState(c => ({ ...c, img: event.target.files[0] }))
  }

  function handleTagsChange(tags: any) {
    setState(c => ({ ...c, tags:  tags}))
  }

  function handleSubmit(event: any) {
    event.preventDefault()

    const formData = new FormData()

      formData.append('title', state.title)
      formData.append('body', state.body)
      formData.append('tags', state.tags as any)
      formData.append('image', state.img as unknown as string)
      formData.append('userId', authUser.id)

      const errors = validate()

      if (!Object.keys(errors).length) {
        // request to server:
        createPostAct(formData, toast, navigate)
      }

      console.log('create post errors: ', errors)


  }

  return {
    title: state.title,
    body: state.body,
    img: state.img,
    tags: state.tags,
    handleFileChange,
    handleTagsChange,
    handleSubmit,
    setState,
    errors: state.errors,
  }
}

export default useCreatePostForm