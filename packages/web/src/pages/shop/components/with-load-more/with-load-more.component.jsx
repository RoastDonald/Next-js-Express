import React, { Fragment } from "react";
import CardsBlock from "../cards-block/cards-block.component";
import Button from "../../../../components/common/button/button.component";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btnRoot: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  loadMoreBtn: {
    textTransform: "capitalize",
    width: "200px",
    height: "48px",
    backgroundColor: "hsla(0,0%,100%,.1)",
    color: "hsla(0,0%,100%,.4)",
    fontSize: "14px",
    lineHeight: "normal",
    fontWeight: 400,
    borderRadius: "10px",
    border: "none",
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    outline: "none",
    alignItems: "center",

    "&:hover": {
      backgroundColor: "#161616",
    },
  },
}));

const WithLoadMore = ({ grid, products, handleLoadMore, limit, size }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <CardsBlock products={products} limit={limit} />
      {size > 0 && size >= limit ? (
        <Grid container>
          <Grid item xs={12} className={classes.btnRoot}>
            <Button className={classes.loadMoreBtn} onClick={handleLoadMore}>
              Load more
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </Fragment>
  );
};

export default WithLoadMore;
