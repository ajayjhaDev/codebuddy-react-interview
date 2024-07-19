import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <div key={post.id} className="bg-white p-4">
            <img
              src={post.avatar}
              alt={`${post.firstName} ${post.lastName}`}
              height={60}
              width={60}
            />
            <h3 className="mt-2 text-xl font-bold">
              {post.firstName} {post.lastName}
            </h3>
            <p className="mt-2">{post.writeup}</p>
            <img src={post.image} alt="Post" className="mt-2 " height={120} width={120} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
