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
  const [errorTitle, setErrorTitle] = useState("");
  const [errorBody, setErrorBody] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.posts
  );

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
      dispatch(createPostRequest({ title, body }));
    }
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
    <>
      <h1 className='title'>Create Post</h1>
      <form className='form' onSubmit={handleSubmit}>

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
            rows={4}
            value={body}
            onChange={(e) => {
              setBody(e.target.value)
              setErrorBody('')
            }}
          ></textarea>
          <div>{errorBody && <p className='error'>{errorBody}</p>}</div>
        </div>

        <div className='form-buttons'>
          <button
            type='button'
            className='button dark-button'
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button type='submit' className='button primary-button'>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
