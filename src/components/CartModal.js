import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Modal, Button } from "@mui/material";

import { addOne, removeOne } from "../actions/cartActions";

export default function CartModal(props) {
  const nevigate = useNavigate();
  const { open, handleClose } = props;
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const updateLocalStorage = useCallback((items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
    addOne(updateLocalStorage, setCartItems);
    removeOne(updateLocalStorage, setCartItems);
  }, [updateLocalStorage, open]);

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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            overflow: "auto",

            p: 4,
            "@media (max-width:900px)": {
              width: 500,
              height: 800,
            },
            "@media (max-width:650px)": {
              width: 400,
              height: 600,
            },
            "@media (max-width:500px)": {
              width: 300,
              height: 500,
            },
            "@media (max-width:400px)": {
              width: 240,
              height: 400,
              fontSize: "xx-small",
            },
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h4"
            sx={{ textAlign: "center", marginBottom: 3 }}
          >
            Your Cart
          </Typography>
          {cartItems.map((each) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                margin: 1,
              }}
              key={each.id}
            >
              <Box sx={{ margin: 1 }}>
                <img width="65em" src={each.image} alt={each.title}></img>
              </Box>
              <Typography
                id="modal-modal-description"
                variant="body"
                sx={{ mt: 2, width: 300, textAlign: "center" }}
              >
                {each.title?.length > 50
                  ? each.title?.substring(0, 50) + "..."
                  : each.title}{" "}
                <br></br>
                <b>{(each.price * each.amount).toFixed(2)} $</b>
              </Typography>
              <Button
                onClick={() =>
                  removeOne(updateLocalStorage, setCartItems, each.id)
                }
              >
                -
              </Button>
              {each.amount}
              <Button
                onClick={() =>
                  addOne(updateLocalStorage, setCartItems, each.id)
                }
              >
                +
              </Button>
            </Box>
          ))}
          {cartItems.length === 0 ? (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cart is empty
            </Typography>
          ) : (
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ textAlign: "center", marginTop: 4 }}
            >
              Total : &nbsp;
              {cartItems
                .reduce((acc, item) => acc + item.amount * item.price, 0)
                .toFixed(2)}{" "}
              $
            </Typography>
          )}
          <Button
            onClick={checkout}
            sx={{
              display: "flex",
              marginLeft: "auto",
              backgroundColor: "lightgreen",
            }}
            size="large"
          >
            Checkout
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
