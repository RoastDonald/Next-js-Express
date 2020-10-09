import shopActionTypes from "./shop.types";

export const productStart = (filters) => ({
  type: shopActionTypes.PRODUCT_START,
  payload: filters
});

export const productSuccess = (data, size) => ({
  type: shopActionTypes.PRODUCT_SUCCESS,
  payload: {
    data,
    size
  },
});

export const productFailure = (error) => ({
  type: shopActionTypes.PRODUCT_FAILURE,
  payload: error,
});




export const brandStart = () => ({
  type: shopActionTypes.BRAND_START
});

export const brandFailure = (error) => ({
  type: shopActionTypes.BRAND_FAILURE,
  payload: error
});

export const brandSuccess = (brands) => ({
  type: shopActionTypes.BRAND_SUCCESS,
  payload: brands
})

export const woodStart = () => ({
  type: shopActionTypes.WOODS_START
});

export const woodFailure = (error) => ({
  type: shopActionTypes.WOODS_FAILURE,
  payload: error
});

export const woodSuccess = (woods) => ({
  type: shopActionTypes.WOODS_SUCCESS,
  payload: woods
})



export const fileUploadStart = (file) => ({
  type: shopActionTypes.FILE_UPLOAD_START,
  payload: file
});

export const fileUploadFailure = (error) => ({
  type: shopActionTypes.FILE_UPLOAD_FAILURE,
  payload: error
});

export const fileUploadSuccess = (fileMeta) => ({
  type: shopActionTypes.FILE_UPLOAD_SUCCESS,
  payload: fileMeta
});