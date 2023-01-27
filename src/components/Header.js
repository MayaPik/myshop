import {
  AppBar,
  Box,
  Typography,
  MenuItem,
  Container,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Header() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((result) => setCategories(result));
  }, []);

  const goToCategory = (event) => {
    event.preventDefault();
    navigate(`/category/${event.target.innerText}`);
  };

  const goToCheckout = (event) => {
    event.preventDefault();
    navigate(`/checkout`);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: {
                xl: "flex",
                lg: "flex",
                md: "flex",
                sm: "none",
                xs: "none",
              },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            OUR SHOP
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexWrap: { md: "wrap", sm: "wrap", xs: "wrap" },
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category} onClick={goToCategory}>
                <Typography textAlign="center">{category}</Typography>
              </MenuItem>
            ))}
            <MenuItem
              onClick={goToCheckout}
              sx={{
                display: "flex",
                marginLeft: "auto",
              }}
            >
              <Typography textAlign="center">Cart</Typography>
            </MenuItem>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
