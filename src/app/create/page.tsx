"use client";
import type { Metadata } from "next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostRequest } from "../redux/slices/postsSlice";
import { useRouter } from "next/navigation";
import "@/styles/CreateEdit.css";

export const metadata: Metadata = {
  title: "Create Post",
  description: "Create a new post",
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createPostRequest({ title, body }));
    router.push("/");
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h1>Create a New Post</h1>
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Body'
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <div className='form-buttons'>
        <button
          type='button'
          className='button dark-button'
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type='submit' className='button primary-button'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
