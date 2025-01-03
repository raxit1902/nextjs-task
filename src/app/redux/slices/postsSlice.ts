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
  success: string | null;
  currentPost: Post | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  success: null,
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
      state.error = null;
      state.success = null;
    },
    createPostSuccess(state, action) {
      state.loading = false;
      state.posts.push(action.payload);
      state.success = "Post created successfully!";
    },
    createPostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearMessages(state) {
      state.error = null;
      state.success = null;
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

    editPostRequest(state, action) {
      state.loading = true;
    },
    editPostSuccess(state, action) {
      state.loading = false;
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
    editPostFailure(state, action) {
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
  clearMessages,

  fetchPostByIdRequest,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,

  editPostRequest,
  editPostSuccess,
  editPostFailure,
} = postsSlice.actions;

export default postsSlice.reducer;
