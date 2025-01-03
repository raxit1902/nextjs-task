"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostRequest, clearMessages } from "../redux/slices/postsSlice";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "@/styles/CreateEdit.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.posts
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createPostRequest({ title, body }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
    if (success) {
      toast.success(success);
      dispatch(clearMessages());
      router.push("/");
    }
  }, [error, success, dispatch, router]);

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
        <button type='submit' className='button primary-button' disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
