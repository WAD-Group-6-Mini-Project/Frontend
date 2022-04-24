import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import ProductPage from "./Pages/Product/product";
import SignUp from "./Pages/Signup/signup";
import UserProfilePage from "./Pages/User Profile/user-profile";
import ArtistProfilePage from "./Pages/Artist Profile/artist-profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile/user/:id" element={<UserProfilePage />} />
          <Route path="/profile/artist/:id" element={<ArtistProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
