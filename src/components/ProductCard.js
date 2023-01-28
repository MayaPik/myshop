import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useModal, handleAddToCart } from "../actions/cartActions";
import CartModal from "./CartModal";

import "../index.css";

export default function ProductCard({ ProductId }) {
  const navigate = useNavigate();
  const { open, handleOpen, handleClose } = useModal();

  const [product, setProduct] = useState({});

  function handleClick() {
    handleAddToCart(product);
    handleOpen();
  }

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${ProductId}`)
      .then((response) => response.json())
      .then((result) => setProduct(result));
  }, [ProductId]);

  const transferToProdcut = (event) => {
    event.preventDefault();
    navigate(`/product/${ProductId}`);
  };

  return (
    <Card
      sx={{
        width: 300,
        height: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "center",
        margin: 4,
        alignItems: "center",
        boxShadow: 0,
      }}
    >
      <img
        className="imageCard"
        src={product.image}
        alt={product.title}
        onClick={transferToProdcut}
      />
      <CardContent>
        <Typography variant="h6" color="text">
          {product?.price} $
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {product.title?.length > 50
            ? product.title?.substring(0, 50) + "..."
            : product.title}
        </Typography>

        <Typography variant="p" color="text.secondary">
          {product.description?.length > 50
            ? product.description?.substring(0, 50) + "..."
            : product.description}
        </Typography>
      </CardContent>
      <CardActions style={{ position: "absolute" }}>
        <Button
          size="large"
          variant="contained"
          color="success"
          onClick={handleClick}
        >
          <ShoppingCart />
          Add To Cart
        </Button>
      </CardActions>
      <CartModal open={open} handleClose={handleClose} item={product} />
    </Card>
  );
}
