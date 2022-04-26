import { React, useState, useEffect } from "react";

import axios from "../../api/axiosApi";
import { getUser } from "../../redux/userSlice/userSlice";
import { useSelector } from "react-redux";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import "./cart.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Navbar from "../../components/Navbar/navbar";
import LabelIcon from "@mui/icons-material/Label";
import CardHeader from "@mui/material/CardHeader";

import {
  Card,
  List,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import PageFooter from "../../components/Footer/footer";
import CartItem from "./cart-item";

const Cart = (props) => {
  const userData = useSelector(getUser);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      await axios
        .get(`/user/cart/${userData["_id"]}`)
        .then((res) => {
          console.log(res.data);
          setCart(() => res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getCart();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="cart-content">
        <Card className="cart-card">
          <h1>CART</h1>
          <Divider style={{ margin: "2%" }} />
          <List>
            {cart.map((item) => {
              return <CartItem item={item} />;
            })}
          </List>
        </Card>
      </div>

      <PageFooter />
    </div>
  );
};

export default Cart;