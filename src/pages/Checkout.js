import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

export default function Checkout() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  const removeOne = (e) => {
    e.preventDefault();
    const key = e.target.dataset.key;
    const item = cartItems.find((cart) => cart.id === Number(key));
    if (item && item.amount > 1) {
      --item.amount;
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  };

  const addOne = (e) => {
    e.preventDefault();
    const key = e.target.dataset.key;
    const item = cartItems.find((cart) => cart.id === Number(key));
    if (item) {
      ++item.amount;
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  };

  const deleteOne = (e) => {
    e.preventDefault();
    const key = e.target.dataset.key;
    let filterCart = cartItems.filter((cart) => cart.id !== Number(key));
    localStorage.setItem("cartItems", JSON.stringify(filterCart));
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  };

  return (
    <div>
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Order Summary
        </Typography>
        {cartItems.map((each) => (
          <Box sx={{ display: "flex" }} key={each.id}>
            <img width="50px" src={each.image} alt={each.title}></img>
            <Typography id="modal-modal-description" sx={{ mt: 2, width: 300 }}>
              {each.title} <br></br>
              {each.price * each.amount} $
            </Typography>
            <Button onClick={removeOne} data-key={each.id}>
              -
            </Button>
            {each.amount}
            <Button onClick={addOne} data-key={each.id}>
              +
            </Button>
            <Button onClick={deleteOne} data-key={each.id}>
              X
            </Button>
          </Box>
        ))}
        {cartItems.length === 0 ? (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cart is empty
          </Typography>
        ) : (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Total :
            {cartItems
              .reduce((acc, item) => acc + item.amount * item.price, 0)
              .toFixed(2)}{" "}
            $
          </Typography>
        )}
      </Box>
    </div>
  );
}
