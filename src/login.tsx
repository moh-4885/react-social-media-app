import { auth, provider } from "./config/firebase";
import { signInWithPopup } from "firebase/auth";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  const signinwithgoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <h1>click to sign up with google </h1>
      <button className="btn" onClick={signinwithgoogle}>
        sign up with google{" "}
      </button>
    </div>
  );
}
