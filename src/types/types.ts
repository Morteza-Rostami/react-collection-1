
export type User = {
  id: string,
  name: string,
  email: string,
  createdAt: Date,
}

export type Tag = {
  id: string,
  name: string,
  slug: string,
  createdAt: Date,
}

export type Post = {
  id: string,
  title: string,
  body: string,
  author: User,
  createdAt: Date,
  imgUrl: string,
  tags: Tag[],
}

export type CreatePostState = {
  title: string,
  body: string,
  img: File | null,
  tags: string[],
  errors: any
}

// state of registe form:
export type RegisterFormState = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  errors?: { [key: string]: string },
}

// login form state
export type LoginFormState = {
  email: string,
  password: string,
  errors: { [key: string]: string }
}

// posts and pagination
export type PostsPaginate = {
  posts: Post[],
  nextPage: number,
  totalPages: number
}