import { React } from "react";

import { Link } from "react-router-dom";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

import "./productCard.css";

const ProductCard = (props) => {
  console.log(props.product.img.data);
  const src = props.product.img.data.toString("base64");
  const imgSrc = `data:image/jpg;base64,${src}`;
  console.log(imgSrc);
  return (
    <Card
      sx={{ maxWidth: 345, m: 5, boxShadow: 5, borderRadius: 2, width: 250 }}
    >
      <CardMedia
        component="img"
        className="image"
        height="140"
        alt={props.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.product.name}
        </Typography>

        <Typography gutterBottom variant="h6" component="div">
          {props.product.tag}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.product.description}
        </Typography>
      </CardContent>
      <CardActions style={{ alignItems: "end" }}>
        <Button>
          <Link
            className="link"
            to={{
              pathname: `/product/${123}`,
            }}
          >
            View Product
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
