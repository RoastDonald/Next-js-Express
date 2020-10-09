import React, { Fragment } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import Button from "../common/button/button.component";
import {
  Star as StarIcon,
  ShoppingBasket as ShoppingBasketIcon,
} from "@material-ui/icons";
import { ReactComponent as ImageIcon } from "../../ui/icons/no-image.svg";
import { useStyles } from "./product-card.styles";

const ProductCard = ({ item }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Box className={classes.productDiscount}>
        <Typography component="span" variant="body4">
          -30%
        </Typography>
      </Box>
      <Card key={item._id} className={classes.cardContainer}>
        <CardActionArea className={classes.cardInner}>
          <CardMedia className={classes.productImage}>
            {item.images[0]? <div style={{backgroundImage:item.images[0].url}}/> : <ImageIcon />}
          </CardMedia>

          <Box className={classes.productMeta}>
            <Box className={classes.productStars}>
              {new Array(5).fill(0).map(() => (
                <StarIcon className={classes.productStar} />
              ))}
            </Box>
            <Typography component="span">
              {item.brand.name} {item.name}
            </Typography>

            <Box className={classes.productCta}>
              <Box className={classes.productInner}>
                <Typography component="span" className={classes.productPrice}>
                  ${item.price}
                </Typography>
                <Button className={classes.productBtn}>
                  <ShoppingBasketIcon className={classes.productIcon} />
                </Button>
              </Box>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </Fragment>
  );
};

export default ProductCard;
