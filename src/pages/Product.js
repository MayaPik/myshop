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
import { useModal } from "../actions/cartActions";
import CartModal from "../components/CartModal";

import "../index.css";

export default function Product() {
  const ProductId = useParams();
  const nevigate = useNavigate();
  const { open, handleOpen, handleClose } = useModal();

  const [product, setProduct] = useState({});

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((cart) => cart.id === product.id);
    if (existingItem) {
      existingItem.amount++;
    } else {
      cartItems.push({ ...product, amount: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  function handleClick() {
    handleAddToCart(product);
    handleOpen();
  }

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, [setCartItems]);

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
    <Card
      sx={{
        maxWidth: 900,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: 0,
      }}
    >
      <Button onClick={transferToCategory}>
        Go back to {product.category}
      </Button>
      <img className="image" src={product?.image} alt={product?.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product?.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
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
  );
}
