import PostPage from "./PostPage";

export default async function PostPageWrapper({ params }: any) {
  const { id } = params;
  const fetchPostById = async (id: string) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    return response.json();
  };
  const post = await fetchPostById(id);

  return <PostPage post={post} />;
}
