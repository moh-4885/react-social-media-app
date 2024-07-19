import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { db, auth } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreatePost {
  title: string;
  description: string;
  Image: string;
}

export default function CreatePost() {
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required(),
    Image: yup.string().required(),
    description: yup.string().required(),
  });
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const PostCollection = collection(db, "Posts");
  const navigate = useNavigate();

  const onCreatePost = async (data: CreatePost) => {
    await addDoc(PostCollection, {
      ...data,
      username: user?.displayName,
      userID: user?.uid,
      profilPicture: user?.photoURL,
    });
    navigate("/");
  };
  return (
    <div className="createPostContainer">
      <h1>create post</h1>
      <form action="" onSubmit={handleSubmit(onCreatePost)}>
        <input type="text" placeholder="...title" {...register("title")} />
        <input type="text" placeholder="...imageUrl" {...register("Image")} />
        <textarea placeholder="...description" {...register("description")} />
        <input type="submit" />
      </form>
    </div>
  );
}
