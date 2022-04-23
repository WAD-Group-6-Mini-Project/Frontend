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
  return (
    <Card sx={{ maxWidth: 345, m: 5, boxShadow: 5, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="140"
        src={props.path}
        alt={props.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
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
