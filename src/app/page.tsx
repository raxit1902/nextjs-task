import Link from "next/link";
import "../styles/Home.css";

export default async function HomePage() {
  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    return response.json();
  }
  const posts = await fetchPosts();

  return (
    <>
      <div className="header">
        <h1>Post List</h1>
        <Link href="/create" className="button success-button">
          Create New Post
        </Link>
      </div>
      <div className="grid">
        {posts.map((post: { id: number; title: string; body: string }) => (
          <Link href={`/posts/${post.id}`} key={post.id} className="card">
            <h2>{post.title}</h2>
          </Link>
        ))}
      </div>
    </>
  );
}
