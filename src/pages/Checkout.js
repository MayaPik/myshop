import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import PayPalButton from "../components/PaypalButton";
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          p: 4,
        }}
      >
        {" "}
        <Typography
          id="modal-modal-title"
          variant="h2"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          <b>Order Summary</b>
        </Typography>
        <br></br>
        {cartItems.map((each) => (
          <Box
            sx={{
              width: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              margin: 1,
              "@media (max-width:900px)": {
                width: 700,
              },
              "@media (max-width:700px)": {
                width: 500,
                fontSize: "small",
              },
              "@media (max-width:550px)": {
                width: 400,
                fontSize: "x-small",
              },
              "@media (max-width:430px)": {
                width: 290,
                fontSize: "xx-small",
              },
            }}
            key={each.id}
          >
            <Box sx={{ margin: 1 }}>
              <img width="100em" src={each.image} alt={each.title}></img>
            </Box>
            <Typography
              id="modal-modal-description"
              sx={{
                mt: 0,
                width: 200,
                "@media (max-width:600px)": {
                  width: 100,
                },
              }}
              variant="body"
            >
              {each.title?.length > 50
                ? each.title?.substring(0, 50) + "..."
                : each.title}{" "}
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="h7"
              sx={{
                "@media (max-width:600px)": {
                  marginLeft: 1,
                },
              }}
            >
              {each.price} ${" "}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                "@media (max-width:440px)": {
                  flexDirection: "column",
                },
              }}
            >
              <Button onClick={removeOne} data-key={each.id} size="small">
                -
              </Button>
              {each.amount}
              <Button onClick={addOne} data-key={each.id} size="small">
                +
              </Button>

              <Typography
                id="modal-modal-description"
                sx={{ textAlign: "center" }}
                className="text"
                variant="body"
              >
                {(each.price * each.amount).toFixed(2)} ${" "}
              </Typography>
            </Box>
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
        <PayPalButton />
      </Box>
    </div>
  );
}
