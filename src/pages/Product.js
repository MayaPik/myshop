import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useModal, handleAddToCart } from "../actions/cartActions";
import CartModal from "../components/CartModal";

import "../index.css";

export default function Product() {
  const ProductId = useParams();
  const nevigate = useNavigate();
  const { open, handleOpen, handleClose } = useModal();

  const [product, setProduct] = useState({});

  function handleClick() {
    handleAddToCart(product);
    handleOpen();
  }
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${ProductId.productId}`)
      .then((response) => response.json())
      .then((result) => setProduct(result));
  }, [ProductId]);

  const transferToCategory = (event) => {
    event.preventDefault();
    nevigate(`/category/${product.category}`);
  };
  return (
    <>
      <Button onClick={transferToCategory} sx={{ margin: 2 }} size="large">
        Go back to {product.category}
      </Button>
      <Card
        sx={{
          maxWidth: 1000,
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          textAlign: "center",
          boxShadow: 0,
        }}
      >
        <img className="image" src={product?.image} alt={product?.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product?.description}
          </Typography>
          <br></br>
          <Typography variant="h5" color="text">
            {product?.price} $
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={handleClick}
          >
            Add To Cart
          </Button>
        </CardActions>
        <CartModal open={open} handleClose={handleClose} item={product} />
      </Card>
    </>
  );
}
