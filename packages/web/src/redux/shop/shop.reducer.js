import shopActionTypes from "./shop.types";

const INITIAL_STATE = {
  products: null,
  woods: null,
  brands: null,
  error: null,
  _size: 0,
};

export default (prevState = INITIAL_STATE, {
  type,
  payload
}) => {
  switch (type) {
    case shopActionTypes.PRODUCT_SUCCESS:
      return {
        ...prevState,
        products: payload.data,
          _size: payload.size
      };
    case shopActionTypes.BRAND_SUCCESS:
      return {
        ...prevState,
        brands: payload
      }
      case shopActionTypes.WOODS_SUCCESS:
        return {
          ...prevState,
          woods: payload
        }

        case shopActionTypes.PRODUCT_FAILURE:
        case shopActionTypes.BRAND_FAILURE:
        case shopActionTypes.WOODS_FAILURE:
          return {
            ...prevState,
            error: payload,
          };
        default:
          return prevState;
  }
};