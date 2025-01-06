'use client';
import "../../../styles/Post.css";
import Link from "next/link";
import { Icon } from "@iconify/react";
import CommonTooltip from "../../common/Tooltip";

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

                <div className="btn-left-div">
                    <CommonTooltip id="home-icon" content="Go to Home">
                        <Link href="/" data-testid="go-back" className="">
                            <Icon icon="famicons:home-sharp" width="28" height="28" data-tooltip-id="tooltip-id" />
                        </Link>
                    </CommonTooltip>
                </div>

                <div className="btn-right-div">

                    <CommonTooltip id="revalidate-icon" content="Revalidate Post">
                        <button onClick={handleRevalidate} className="revalidate-btn ">
                            <Icon icon="material-symbols:refresh" width="28" height="28" data-tooltip-id="tooltip-id" />
                        </button>
                    </CommonTooltip>

                    <CommonTooltip id="edit-icon" content="Edit Post">
                        <Link href={`/posts/edit/${post?.id}`} data-testid="edit-btn" as={`/posts/edit/${post?.id}`} className="">
                            <Icon icon="ic:outline-edit" width="28" height="28" data-tooltip-id="tooltip-id" />
                        </Link>
                    </CommonTooltip>
                </div>
            </div>
            <div className="post">
                <h1>{post?.title}</h1>
                <p>{post?.body}</p>
            </div>
        </div>
    );
}
