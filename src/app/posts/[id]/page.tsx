"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPostByIdRequest } from "../../redux/slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "../../../styles/Post.css";

const PostPage = ({ params }: any) => {
    const dispatch = useDispatch();
    const { currentPost, loading, error } = useSelector((state: RootState) => state.posts);
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        dispatch(fetchPostByIdRequest(id));
    }, [dispatch]);

    const handleGoBack = () => {
        router.back();
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <button onClick={handleGoBack}>Go Back</button>
            <div className="post">
                <h1>{currentPost?.title}</h1>
                <p>{currentPost?.body}</p>
            </div>
        </div>
    );
};

export default PostPage;
