import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import ProductPage from "./Pages/Product/product";
import SignUp from "./Pages/Signup/signup";
import UserProfilePage from "./Pages/User Profile/user-profile";
import ArtistProfilePage from "./Pages/Artist Profile/artist-profile";
import Cart from "./Pages/Cart/cart";
import Checkout from "./Pages/Checkout Page/checkout";
import FilterArtists from "./Pages/Filter/artists";
import FilterTags from "./Pages/Filter/tags";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/product/artists" element={<FilterArtists />} />
          <Route path="/product/tags" element={<FilterTags />} />
          <Route path="/profile/user/:id" element={<UserProfilePage />} />
          <Route path="/profile/artist/:id" element={<ArtistProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
