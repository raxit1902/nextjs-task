"use server";

import { store } from "../../../redux/store";
import { editPostSuccess } from "../../../redux/slices/postsSlice";

export async function editPostServer(formData: FormData, id: number) {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  if (!title || !body) {
    throw new Error("Title and Body are required fields.");
  }

  const updatedPost = { id, title, body };

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  const createdPost = await response.json();

  store.dispatch(editPostSuccess(createdPost));

  return createdPost;
}
