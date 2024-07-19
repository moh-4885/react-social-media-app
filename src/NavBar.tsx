import { NavLink } from "react-router-dom";
import { auth } from "./config/firebase";

import convertedImageNoBg from "./assets/converted_image_no_bg.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function NavBar() {
  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <>
      <nav>
        <div className="container">
          <div className="logo">
            <img src={convertedImageNoBg} alt="Logo" />
          </div>

          <ul style={user ? { marginRight: "-25%" } : {}}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {!user ? (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/creatpost">Creat Post</NavLink>
              </li>
            )}
          </ul>
          {user && (
            <div className="user">
              <img src={user?.photoURL || ""} alt="" />
              <p>{user?.displayName}</p>
              <button className="btn btnout" onClick={signUserOut}>
                sign out{" "}
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
