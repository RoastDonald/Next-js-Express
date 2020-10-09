import React, { useEffect, useState, Suspense } from "react";
import { Grid } from "@material-ui/core";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";
import {
  brandStart,
  woodStart,
  productStart,
} from "../../redux/shop/shop.actions";
import { connect } from "react-redux";
import CollapseCheckbox from "../../components/common/collapse-checkbox/collapse-checkbox.component";
import {
  selectBrands,
  selectWoods,
  selectProducts,
  selectSize,
} from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";
import frets from "../../utils/frets";
import price from "../../utils/price";
import CollapseRadio from "../../components/common/collapse-radio/collapse-radio.component";
import WithLoadMore from "./components/with-load-more/with-load-more.component";
import { useStyles } from "./shop.styles";
import Spinner from "../../components/spinner";
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
          <CollapseCheckbox
            className={classes.filter}
            title="Brands"
            isOpen={false}
            list={brands}
            onFilter={(filters) => handleFilters(filters, "brand")}
          />
          <CollapseCheckbox
            className={classes.filter}
            title="Frets"
            isOpen={false}
            list={frets}
            onFilter={(filters) => handleFilters(filters, "frets")}
          />
          <CollapseCheckbox
            className={classes.filter}
            title="Wood"
            isOpen={false}
            list={woods}
            onFilter={(filters) => handleFilters(filters, "wood")}
          />
          <CollapseRadio
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
