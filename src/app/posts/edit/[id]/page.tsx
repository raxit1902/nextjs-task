"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostByIdRequest,
  editPostRequest,
} from "../../../redux/slices/postsSlice";
import { useRouter, useParams } from "next/navigation";
import { RootState } from "../../../redux/store";
import { toast } from "react-toastify";
import "@/styles/CreateEdit.css";

const page = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorBody, setErrorBody] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { currentPost, loading, error, success } = useSelector(
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
    if (!title.trim()) {
      setErrorTitle("Title is required!");
    } else {
      setErrorTitle("");
    }

    if (!body.trim()) {
      setErrorBody("Body is required!");
    } else {
      setErrorBody("");
    }

    if (title.trim() && body.trim()) {
      dispatch(editPostRequest({ id, title, body }));
    }

  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
      router.back();
    }
  }, [error, success, dispatch, router]);

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h1>Edit Post</h1>
      <div className="input-div">
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setErrorTitle('')
          }}
        />
        <div>{errorTitle && <p className='error'>{errorTitle}</p>}</div>
      </div>
      <div className="input-div">

        <textarea
          placeholder='Body'
          value={body}
          onChange={(e) => {
            setBody(e.target.value)
            setErrorBody('')
          }}
        ></textarea>
        <div>{errorBody && <p className='error'>{errorBody}</p>}</div>
      </div>

      <div className="form-buttons">
        <button
          type="button"
          className="button dark-button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type='submit' className='button primary-button'>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default page;
