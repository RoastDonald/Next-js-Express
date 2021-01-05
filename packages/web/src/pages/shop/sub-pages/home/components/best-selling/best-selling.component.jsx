import { Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ProductCard } from "@/components";

import { productStart } from "@/redux/shop/shop.actions";
import { selectProducts } from "@/redux/shop/shop.selectors";

import { useStyles } from "./best-selling.styles";

const BestSelling = ({ getProducts, products }) => {
  const classes = useStyles();
  useEffect(() => {
    getProducts();
  }, getProducts);

  return (
    <Grid container className={classes.sectionContainer} spacing={8}>
      <Grid item xs={12} className={classes.titleContainer}>
        <img src="/icons/electric-guitar.svg" className={classes.titleImage} />
        <Typography variant="h1" className={classes.title}>
          Best selling guitars
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          spacing={4}
          justify="space-between"
          className={classes.cardsContainer}
        >
          {products &&
            products.map((product) => (
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard item={product} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  products: selectProducts,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(productStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BestSelling);
