import "../../../styles/Post.css";
import Link from "next/link";

export default function PostPage({ post }: { post: { id: string; title: string; body: string } }) {
    return (
        <div>
            <div className="btn-container">
                <Link href="/" data-testid="go-back" className="button dark-button">
                    Go Back
                </Link>
                <Link href={`/posts/edit/${post.id}`} as={`/posts/edit/${post.id}`} className="button dark-button">
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
