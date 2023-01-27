import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../actions/cartActions";
import CartModal from "./CartModal";

import "../index.css";

export default function ProductCard({ ProductId }) {
  const navigate = useNavigate();
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
  }, []);

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
        alignItems: "center",
        textAlign: "center",
        boxShadow: 0,
      }}
    >
      <img
        className="image"
        src={product.image}
        width="50%"
        height="50%"
        alt={product.title}
        onClick={transferToProdcut}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {product.description?.length > 50
            ? product.description?.substring(0, 50) + "..."
            : product.description}
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
