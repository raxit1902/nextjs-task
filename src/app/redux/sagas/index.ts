import { all, call, put, takeEvery } from "redux-saga/effects";
import {
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
    if (!response.ok) {
      yield put(createPostFailure("Failed to create post"));
    } else {
      const data: Post = yield response.json();
      yield put(createPostSuccess(data));
    }
  } catch (error) {
    const message = "Something went wrong!!";
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
    const response: Response = yield call(
      fetch,
      `https://jsonplaceholder.typicode.com/posts/${action.payload.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload),
      }
    );
    if (!response.ok) {
      yield put(editPostFailure(`Failed to edit post`));
    } else {
      const data: Post = yield response.json();
      yield put(editPostSuccess(data));
    }
  } catch (error) {
    const message = "Something went wrong!!";
    yield put(editPostFailure(message));
  }
}

function* rootSaga() {
  yield all([
    takeEvery(createPostRequest.toString(), createPostSaga),
    takeEvery(fetchPostByIdRequest.toString(), fetchPostByIdSaga),
    takeEvery(editPostRequest.toString(), editPostSaga),
  ]);
}

export default rootSaga;
