import {
  createSelector
} from "reselect";

const shopDomain = (state) => state.shop;

export const selectProducts = createSelector(
  [shopDomain],
  (shop) => shop.products
);

export const selectBrands = createSelector(
  [shopDomain],
  (shop) => shop.brands
)

export const selectWoods = createSelector(
  [shopDomain],
  (shop) => shop.woods
)

export const selectSize = createSelector(
  [shopDomain],
  (shop) => shop._size
)