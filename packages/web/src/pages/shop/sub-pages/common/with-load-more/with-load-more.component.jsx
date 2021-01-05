import React, { Fragment } from "react";
import CardsBlock from "../cards-block/cards-block.component";
import { FMButton } from '@/components/formik-mui';
import { Grid } from "@material-ui/core";
import { useStyles } from './with-load-more.styles';


const WithLoadMore = ({ grid, products, handleLoadMore, limit, size }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <CardsBlock products={products} limit={limit} />
      {size > 0 && size >= limit ? (
        <Grid container>
          <Grid item xs={12} className={classes.btnRoot}>
            <FMButton className={classes.loadMoreBtn} onClick={handleLoadMore}>
              Load more
            </FMButton>
          </Grid>
        </Grid>
      ) : null}
    </Fragment>
  );
};

export default WithLoadMore;
