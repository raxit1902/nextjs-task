import { Metadata } from "next";
import PostPage from "./PostPage";

const fetchPostById = async (id: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPostById(id);

  return {
    title: post?.title || "Post Detail",
    description: post?.body || "Post Detail Page",
  };
}

export default async function PostPageWrapper({ params }: any) {
  const { id } = await params;
  const post = await fetchPostById(id);

  return <PostPage post={post} />;
}
