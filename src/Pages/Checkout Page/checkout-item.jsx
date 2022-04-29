import { React } from "react";

import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import "./checkout.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LabelIcon from "@mui/icons-material/Label";
import IconButton from "@mui/material/IconButton";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import InfoIcon from "@mui/icons-material/Info";

const CheckoutItem = (props) => {
  const price = props.item.quantity * props.item.price;

  if (!props.item.quantity || !props.item.price) {
    return <div>Loading</div>;
  }

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
            subtitle={props.item.price}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
            marginLeft: "40%",
          }}
        >
          <h3 style={{ marginBottom: "10%" }}>
            Quantity: {props.item.quantity}
          </h3>
          <h4>Subtotal: {price}</h4>
        </div>
      </ListItemButton>
    </div>
  );
};

export default CheckoutItem;
