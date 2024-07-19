import { useEffect, useState } from "react";
import { Post as PostType } from "./home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc as document,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

interface PostProps {
  post: PostType;
}
export default function Post(props: PostProps) {
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const likesCollection = collection(db, "likes");
  const postlikes = query(
    likesCollection,
    where("postID", "==", props.post.id)
  );

  const getlikes = async () => {
    const data = await getDocs(postlikes);
    const userlike = data.docs.find((doc) => doc.data().userID === user?.uid);
    if (userlike) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    setLikes(data.docs.length);
  };

  useEffect(() => {
    getlikes();
  }, []);

  const addLike = async () => {
    await addDoc(likesCollection, {
      postID: props.post.id,
      userID: user?.uid,
    });
    setIsLiked(true);
  };
  const deleteLike = async (id: string) => {
    await deleteDoc(document(db, "likes", id));
    setIsLiked(false);
  };

  const togglelikes = async () => {
    const data = await getDocs(postlikes);
    const userlike = data.docs.find((doc) => doc.data().userID === user?.uid);
    console.log(userlike);
    if (userlike) {
      // console.log(user?.uid, userlike.data().userID);
      deleteLike(userlike.id);
    } else {
      addLike();
    }
    getlikes();
  };

  // Rest of the code...

  return (
    <div className="post-container">
      <div className="postHeader">
        <img src={props.post.profilPicture} alt="" />
        <h2>{props.post.username}</h2>
      </div>
      <div className="postbody">
        <h2>{props.post.title}</h2>
        <p>{props.post.description}</p>
        <img src={props.post.Image} alt="" />
      </div>
      <div className="reaction">
        <button className={isLiked ? "liked" : ""} onClick={togglelikes}>
          <FontAwesomeIcon icon={faThumbsUp} />
          <span style={{ fontWeight: "600" }}> Like {likes}</span>{" "}
        </button>
        <button className="comment">
          <FontAwesomeIcon icon={faComment} />
          comment
        </button>
      </div>
    </div>
  );
}
