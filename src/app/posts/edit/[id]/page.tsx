"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostByIdRequest,
  editPostRequest,
} from "../../../redux/slices/postsSlice";
import { useRouter, useParams } from "next/navigation";
import { RootState } from "../../../redux/store";
import "@/styles/CreateEdit.css";

const page = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { currentPost, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPostByIdRequest(id));
  }, [dispatch]);

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost?.title);
      setBody(currentPost?.body);
    }
  }, [currentPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editPostRequest({ id, title, body }));
    router.back();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h1>Edit Post</h1>
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
      <div className="form-buttons">
        <button
          type="button"
          className="button dark-button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type='submit' className='button primary-button'>Submit</button>
      </div>
    </form>
  );
};

export default page;
