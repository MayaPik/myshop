import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "../index.css";

export default function Welcome() {
  const [welcome, SetWelcome] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=5")
      .then((res) => res.json())
      .then((json) => SetWelcome(json.map((each) => each.id)));
  }, []);
  return (
    <div>
      <h1>LATEST PRODUCTS</h1>
      <div className="list">
        {welcome ? (
          welcome.map((each) => <ProductCard ProductId={each} />)
        ) : (
          <p>loading..</p>
        )}
      </div>
    </div>
  );
}
