import { createSlice } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  currentPost: Post | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  currentPost: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action) {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createPostRequest(state, action) {
      state.loading = true;
    },
    createPostSuccess(state, action) {
      state.loading = false;
      state.posts.push(action.payload);
    },
    createPostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchPostByIdRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchPostByIdSuccess(state, action) {
      state.loading = false;
      state.currentPost = action.payload;
    },
    fetchPostByIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,

  createPostRequest,
  createPostSuccess,
  createPostFailure,

  fetchPostByIdRequest,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,
} = postsSlice.actions;

export default postsSlice.reducer;
