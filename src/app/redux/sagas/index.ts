import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  createPostRequest,
  createPostSuccess,
  createPostFailure,
  fetchPostByIdRequest,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,
  editPostRequest,
  editPostSuccess,
  editPostFailure,
  Post,
} from "../slices/postsSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchPostsSaga() {
  try {
    const response: Response = yield call(
      fetch,
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data: Post[] = yield response.json();
    yield put(fetchPostsSuccess(data));
  } catch (error) {
    const message = (error as Error).message || "Unknown error";
    yield put(fetchPostsFailure(message));
  }
}

function* createPostSaga(
  action: PayloadAction<{ title: string; body: string }>
) {
  try {
    const response: Response = yield call(
      fetch,
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload),
      }
    );
    const data: Post = yield response.json();
    yield put(createPostSuccess(data));
  } catch (error) {
    const message = (error as Error).message || "Unknown error";
    yield put(createPostFailure(message));
  }
}

function* fetchPostByIdSaga(action: PayloadAction<number>) {
  try {
    const response: Response = yield call(
      fetch,
      `https://jsonplaceholder.typicode.com/posts/${action.payload}`
      //   `https://jsonplaceholder.typicode.com/posts/${action.payload}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    const data: Post = yield response.json();
    yield put(fetchPostByIdSuccess(data));
  } catch (error) {
    const message = (error as Error).message || "Unknown error";
    yield put(fetchPostByIdFailure(message));
  }
}

function* editPostSaga(
  action: PayloadAction<{ id: number; title: string; body: string }>
) {
  try {
    const response: Response = yield call(fetch, `https://jsonplaceholder.typicode.com/posts/${action.payload.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action.payload),
    });
    const data: Post = yield response.json();
    yield put(editPostSuccess(data));
  } catch (error) {
    const message = (error as Error).message || "Unknown error";
    yield put(editPostFailure(message));
  }
}


function* rootSaga() {
  yield all([
    takeEvery(fetchPostsRequest.toString(), fetchPostsSaga),
    takeEvery(createPostRequest.toString(), createPostSaga),
    takeEvery(fetchPostByIdRequest.toString(), fetchPostByIdSaga),
    takeEvery(editPostRequest.toString(), editPostSaga),
  ]);
}

export default rootSaga;
