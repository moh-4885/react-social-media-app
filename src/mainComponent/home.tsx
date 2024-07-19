import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import Post from "./post";
export interface Post {
  title: string;
  description: string;
  username: string;
  userID: string;
  id: string;
  profilPicture: string;
  Image: string;
}

export default function Home() {
  const [postList, setPostList] = useState<Post[] | null>(null);
  const PostCollection = collection(db, "Posts");
  const getPosts = async () => {
    const data = await getDocs(PostCollection);
    setPostList(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Post;
      })
    );
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {postList?.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
}
