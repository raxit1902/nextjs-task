import "../../../styles/Post.css";
import Link from "next/link";


export default async function PostPage({ params }: { params: { id: string } }) {
    const fetchPostById = async (id: string) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            cache: "no-store",
        });
        console.log("console_response", response)
        if (!response.ok) {
            throw new Error("Failed to fetch post");
        }

        return response.json();
    }
    const post = await fetchPostById(params.id);


    return (
        <div>
            <Link href="/">
                Go Back
            </Link>
            <div className="post">
                <h1>{post?.title}</h1>
                <p>{post?.body}</p>
            </div>
        </div>
    );
}
