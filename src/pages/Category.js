import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import "../index.css";

export default function Category() {
  const { category } = useParams();
  const [id, setId] = useState([]);
  useEffect(() => {
    setId([]);
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => {
        const uniqueIds = [...new Set(json.map((each) => each.id))];
        setId(uniqueIds);
      });
  }, [category]);

  return (
    <div className="list">
      {id.map((each) => (
        <ProductCard key={each.id} ProductId={each} />
      ))}
    </div>
  );
}
