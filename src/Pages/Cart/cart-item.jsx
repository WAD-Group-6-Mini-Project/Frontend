import { React, useState } from "react";

import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import "./cart.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LabelIcon from "@mui/icons-material/Label";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CancelIcon from "@mui/icons-material/Cancel";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import InfoIcon from "@mui/icons-material/Info";

const CartItem = (props) => {
  const [count, setCount] = useState(1);

  return (
    <div>
      <ListItemButton>
        <ListItemIcon>
          <LabelIcon />
        </ListItemIcon>
        <ImageListItem>
          <img
            src={`data:image/png;base64,${Buffer.from(props.item.img).toString(
              "base64"
            )}`}
            alt={props.item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={props.item.name}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${props.item.name}`}
              >
                <Link
                  to={`/product/${props.item._id}`}
                  state={{ productId: props.item._id }}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <InfoIcon />
                </Link>
              </IconButton>
            }
          />
        </ImageListItem>

        <div style={{ marginLeft: "40%" }}>
          <IconButton
            onClick={() => {
              setCount(count - 1);
              props.item.quantity = count - 1;
            }}
            disabled={count === 0}
          >
            <ChevronLeftIcon />
          </IconButton>
          {count}
          <IconButton
            onClick={() => {
              setCount(count + 1);
              props.item.quantity = count + 1;
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          <IconButton onClick={() => props.delete(props.item._id)}>
            <CancelIcon />
          </IconButton>
        </div>
      </ListItemButton>
    </div>
  );
};

export default CartItem;
