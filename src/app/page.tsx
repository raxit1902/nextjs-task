import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import CommonTooltip from "./common/Tooltip";
import Card from "./common/Card";
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
      <div className='post-list-title-div'>
        <h1>Post List</h1>
        <CommonTooltip id="create-post-icon" content="Create New Post">
          <Link href='/create' data-testid="create-post" className='create-post-btn'>
            <Icon icon="ic:baseline-plus" width="28" height="28" data-tooltip-id="tooltip-id" />
          </Link>
        </CommonTooltip>
      </div>

      <div className='grid'>
        {posts && posts.length > 0 && posts.map((post: { id: number; title: string; body: string }) => (
          <Link href={`/posts/${post?.id}`} key={post?.id}>
            <Card title={post?.title} />
          </Link>
        ))}
      </div>
    </>
  );
}
