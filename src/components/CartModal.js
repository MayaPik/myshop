import { useState, useEffect } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CartModal(props) {
  const nevigate = useNavigate();
  const { open, handleClose } = props;
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, [open]);

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
    setCartItems(filterCart);
  };

  const checkout = (e) => {
    e.preventDefault();
    nevigate("/checkout");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Cart
          </Typography>
          {cartItems.map((each) => (
            <Box sx={{ display: "flex" }} key={each.id}>
              <img width="50px" src={each.image} alt={each.title}></img>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, width: 300 }}
              >
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
          <Button onClick={checkout}>Checkout</Button>
        </Box>
      </Modal>
    </div>
  );
}
