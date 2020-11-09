import React, { useEffect, useState, Suspense } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Grid } from "@material-ui/core";

import { Breadcrumbs, Spinner } from "@/components";
import { FMCheckboxBtn, FMRadioBtn } from '@/components/formik-mui';
import WithLoadMore from "./components/with-load-more/with-load-more.component";

import {
  brandStart,
  woodStart,
  productStart,
} from "@/redux/shop/shop.actions";
import {
  selectBrands,
  selectWoods,
  selectProducts,
  selectSize,
} from "@/redux/shop/shop.selectors";

import frets from "@/utils/frets";
import price from "@/utils/price";
import { useStyles } from "./shop.styles";

const Shop = ({
  getWoods,
  getBrands,
  brands,
  woods,
  getProducts,
  products,
  size,
}) => {
  const classes = useStyles();
  const [state, setState] = useState({
    grid: "",
    skip: 0,
    limit: 6,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: [],
    },
  });
  useEffect(() => {
    getWoods();
    getBrands();
  }, []);

  useEffect(() => {
    const { skip, limit, filters } = state;
    getProducts({
      skip,
      limit,
      filters,
    });
    setState({ ...state, skip: 0 });
  }, [state.filters]);

  const handlePrice = (value) => {
    for (let i in price) {
      if (price[i]._id === parseInt(value, 10)) {
        return price[i].range;
      }
    }
  };

  const handleFilters = (filters, category) => {
    setState((prevState) => {
      const _filters = { ...state.filters };
      _filters[category] = filters;

      if (category === "price") {
        let priceValues = handlePrice(filters);
        _filters[category] = priceValues;
      }

      return {
        ...prevState,
        filters: { ..._filters },
      };
    });
  };

  const handleLoadMore = () => {
    let { skip, limit, filters } = state;
    skip = skip + limit;
    getProducts({
      skip,
      limit,
      filters,
      products,
    });
    setState({ ...state, skip });
  };

  const { grid, limit } = state;
  return (
    <Grid container className={classes.root}>
      <Breadcrumbs />

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FMCheckboxBtn
            className={classes.filter}
            title="Brands"
            isOpen={false}
            list={brands}
            onFilter={(filters) => handleFilters(filters, "brand")}
          />
          <FMCheckboxBtn
            className={classes.filter}
            title="Frets"
            isOpen={false}
            list={frets}
            onFilter={(filters) => handleFilters(filters, "frets")}
          />
          <FMCheckboxBtn
            className={classes.filter}
            title="Wood"
            isOpen={false}
            list={woods}
            onFilter={(filters) => handleFilters(filters, "wood")}
          />
          <FMRadioBtn
            title="Price"
            isOpen={true}
            list={price}
            onFilter={(filters) => handleFilters(filters, "price")}
          />
        </Grid>
        <Grid item xs={9}>
          <Suspense fallback={<Spinner />}>
            <WithLoadMore
              size={size}
              limit={limit}
              products={products}
              grid={grid}
              handleLoadMore={handleLoadMore}
            />
          </Suspense>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getBrands: () => dispatch(brandStart()),
  getWoods: () => dispatch(woodStart()),
  getProducts: (filters) => dispatch(productStart(filters)),
});

const mapStateToProps = createStructuredSelector({
  brands: selectBrands,
  woods: selectWoods,
  products: selectProducts,
  size: selectSize,
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
