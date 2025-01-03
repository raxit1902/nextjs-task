import type { Metadata } from "next";
import Link from "next/link";
import "../styles/Home.css";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Post listing",
};

async function fetchPosts() {
  const response = await fetch("http://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  return response.json();
}

export default async function HomePage() {
  let posts;
  let errorMessage;

  try {
    posts = await fetchPosts();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Something went wrong.";
  }

  if (errorMessage) {
    return <div className="error">{errorMessage}</div>;
  }

  return (
    <>
      <div className='header'>
        <h1>Post List</h1>
        <Link href='/create' className='button success-button'>
          Create New Post
        </Link>
      </div>
      <div className='grid'>
        {posts && posts.length > 0 && posts.map((post: { id: number; title: string; body: string }) => (
          <Link href={`/posts/${post?.id}`} key={post?.id} className='card'>
            <h2>{post?.title}</h2>
          </Link>
        ))}
      </div>
    </>
  );
}
