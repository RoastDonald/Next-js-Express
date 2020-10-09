import React from "react";
import { Grid } from "@material-ui/core";
import ProductCard from "../../../../components/product-card/product-card.component";

const CardsBlock = ({ products, grid }) => {
  return (
    <Grid container spacing={4}>
      {products &&
        products.map((product) => (
          <Grid item xs={4} key={product._id}>
            <ProductCard item={product} />
          </Grid>
        ))}
    </Grid>
  );
};

export default CardsBlock;
