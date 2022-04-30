import { React } from "react";

import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import "./filter.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LabelIcon from "@mui/icons-material/Label";
import IconButton from "@mui/material/IconButton";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import InfoIcon from "@mui/icons-material/Info";

import { useNavigate, useLocation } from "react-router-dom";

const FilterItem = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = () => {
    navigate(`/product/${props.item["_id"]}`, {
      state: { productId: props.item["_id"] },
    });
  };
  return (
    <div>
      <ListItemButton onClick={product}>
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
            subtitle={props.item.price["$numberDecimal"]}
            actionIcon={
              <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }}>
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "stretch",
            marginLeft: "5%",
          }}
        >
          <h3>{props.item.name}</h3>
          <h5>{props.item.tag}</h5>
          <p>{props.item.description}</p>
        </div>
      </ListItemButton>
    </div>
  );
};

export default FilterItem;
