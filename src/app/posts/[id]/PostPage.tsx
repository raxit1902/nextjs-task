'use client';
import "../../../styles/Post.css";
import Link from "next/link";

export default function PostPage({ post }: { post: { id: string; title: string; body: string } }) {

    const handleRevalidate = async () => {
        const path = `/posts/${post?.id}`;

        try {
            const response = await fetch("/revalidate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ path }),
            });

            const data = await response.json();

            if (!response?.ok) {
                throw new Error(data.message || "Failed to revalidate");
            }

            alert(`Cache for ${path} revalidated successfully!`);
        } catch (error) {
            if (error instanceof Error) {
                alert(`Error: ${error?.message}`);
            } else {
                alert('An unknown error occurred');
            }
        }
    };

    return (
        <div>
            <div className="btn-container">
                <Link href="/" data-testid="go-back" className="button dark-button">
                    Go Back
                </Link>
                <button onClick={handleRevalidate} className="button dark-button">Revalidate</button>
                <Link href={`/posts/edit/${post?.id}`} as={`/posts/edit/${post?.id}`} className="button dark-button">
                    Edit Post
                </Link>
            </div>
            <div className="post">
                <h1>{post?.title}</h1>
                <p>{post?.body}</p>
            </div>
        </div>
    );
}
