import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./mainComponent/home";
import Contact from "./contact";
import Login from "./login";
import CreatePost from "./createform/createpost";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/creatpost" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
