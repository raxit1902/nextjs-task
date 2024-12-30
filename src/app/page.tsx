'use client';
import Link from "next/link";
import "../styles/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPostsRequest } from "./redux/slices/postsSlice";
import { RootState } from "./redux/store";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="header">
        <h1>Post List</h1>
        <div className="create-button">
          <Link href="/create">
            <button>Create New Post</button>
          </Link>
        </div>
      </div>
      <div className="grid">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id} className="card">
            <h2>{post.title}</h2>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
