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
import LabelIcon from "@mui/icons-material/Label";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CancelIcon from "@mui/icons-material/Cancel";

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

const CartItem = (props) => {
  const [count, setCount] = useState(0);
  const userData = useSelector(getUser);

  const removeItem = (product_id) => {
    const data = {
      product_id,
      userId: userData["_id"],
    };
    axios
      .delete(`/user/cart/`, data)
      .then((res) => {
        alert("Product removed from cart!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <ListItemButton>
        <ListItemIcon>
          <LabelIcon />
        </ListItemIcon>
        <ListItemText primary={props.item.name} />

        <IconButton onClick={() => setCount(count - 1)} disabled={count == 0}>
          <ChevronLeftIcon />
        </IconButton>
        {count}
        <IconButton onClick={() => setCount(count + 1)}>
          <ChevronRightIcon />
        </IconButton>

        <IconButton onClick={removeItem}>
          <CancelIcon />
        </IconButton>
      </ListItemButton>
    </div>
  );
};

export default CartItem;
