import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseURL";
import { Box } from "@mui/material";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [error, setError] = useState(false); //************ First method */
  // useEffect(() => {
  //   fetch(`${BASE_URL}/products`).then(async (response) => {
  //     const data = await response.json();
  //     setProducts(data);
  //   });
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  });

  if (error) {
    return <Box>Something went wrong, please try again !!</Box>;
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid size={4}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
