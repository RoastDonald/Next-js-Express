import React, { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import ReactQuill from "react-quill";
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";
import schemas from "@common/validation";
import {
  Box, Button, Divider, Grid
} from "@material-ui/core";
import { Field, Form, Formik, useFormikContext } from "formik";

import API_CONTROLLER from '@/api/controller.api';

import { FileUpload, Alert } from '@/components';
import { FMBtnGroup, FMSelectField, FMTextField } from '@/components/formik-mui';

import { brandStart, woodStart } from "@/redux/shop/shop.actions";
import {
  selectBrands,
  selectWoods
} from "@/redux/shop/shop.selectors";
import frets from "@/utils/frets";
import { useStyles } from './add-product.styles';


const formButtons = {
  shipping: ['Yes', 'No'],
  available: ['Yes', 'No'],
  publish: ['Public', 'Hidden'],
  frets,
}


const FormHook = ({ children, handleFormChange }) => {
  const { values } = useFormikContext();
  useEffect(() => {
    handleFormChange(values);
  }, [values]);
  return children;
}

const AddProduct = ({ brands, woods, getBrands, getWoods }) => {
  const classes = useStyles();
  const [alert, setAlert] = useState({
    message: '',
    isSaved: null,
    show: false
  });

  const [state, setState] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    shipping: '',
    available: '',
    wood: '',
    frets: '',
    publish: '',
    images: []
  });


  const { images, ...rest } = state;

  const handleFileUploading = (images) => {
    setState({ ...state, images })
  };
  useEffect(() => {
    getBrands();
    getWoods();
  }, []);

  const handleAlertClose = () => {
    setAlert({ ...alert, show: false });
  }

  return (
    <Grid container>
      <Formik
        initialValues={rest}
        validateOnChange={true}

        validationSchema={schemas.product}
        onSubmit={async () => {
          try {
            const res = await API_CONTROLLER.postProduct(state);

            setAlert({ ...alert, show: true, message: 'Guitar was succesfully added', isSaved: true });
          } catch (error) {
            setAlert({ ...alert, show: true, message: 'Cannot save Guitar, check product\'s name', isSaved: false });
          }
        }}
      >
        {({ setFieldValue, values, errors }) => (
          <FormHook handleFormChange={(values) => setState({ ...state, ...values })}>
            <Form className={classes.root}>
              <FileUpload className={classes.fieldWrapper} handleFileUploading={handleFileUploading} defaultValue={state.images} />

              <FMTextField
                name="name"
                placeholder="Enter the  name"
                label="Name"
                className={classes.fieldWrapper}
                InputProps={{
                  className: classes.field,
                }}
              //   disabled={isLoading}
              />


              <Field name="description">
                {({ field }) => (
                  <ReactQuill
                    className={clsx(classes.field, classes.fieldWrapper)}
                    value={field.value}
                    onChange={field.onChange(field.name)}
                  />
                )}
              </Field>

              <FMTextField
                isNumber={true}
                name="price"
                placeholder="Enter the price"
                label="Price"
                className={clsx(classes.field, classes.fieldWrapper)}
              //   disabled={isLoading}
              />
              <Divider className={classes.divider} />
              <Box className={classes.selectors}>
                <FMSelectField
                  label="Brand"
                  name="brand"
                  className={classes.selectRoot}
                  labelStyles={classes.selectLabel}
                  items={brands}

                />

                <FMBtnGroup
                  items={formButtons.shipping}
                  label="Shipping"
                  labelStyle={classes.selectLabel}
                  containerStyle={classes.btnGroup}
                  name="shipping"
                  isToggle={true}

                />

                <FMBtnGroup
                  items={formButtons.available}
                  label="available in Stock"
                  labelStyle={classes.selectLabel}
                  containerStyle={classes.btnGroup}
                  name="available"
                  isToggle={true}

                />



              </Box>
              <Divider className={classes.divider} />
              <Box className={classes.selectors}>
                <FMSelectField
                  label="Wood"
                  className={classes.selectRoot}
                  labelStyles={classes.selectLabel}
                  items={woods}
                  name="wood"
                />

                <FMBtnGroup
                  items={formButtons.frets.map(item => item.name)}
                  label="Frets"
                  labelStyle={classes.selectLabel}
                  containerStyle={classes.btnGroup}
                  name="frets"
                  isToggle={false}

                />
              </Box>

              <Divider className={classes.divider} />

              <FMBtnGroup
                items={formButtons.publish}
                label="Publish"
                labelStyle={classes.selectLabel}
                containerStyle={classes.btnGroup}
                name="publish"
                toggleTrueProp='public'
                isToggle={true}
              />
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  disableRipple={true}
                  className={classes.subBtn}
                >
                  Add Product
              </Button>
              </Box>
            </Form>
          </FormHook>
        )}
      </Formik>

      {!alert.show ? null : <Alert text={alert.message} isSaved={alert.isSaved} handleAlertClose={handleAlertClose} />}
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  woods: selectWoods,
  brands: selectBrands,
});

const mapDispatchToProps = (dispatch) => ({
  getWoods: () => dispatch(woodStart()),
  getBrands: () => dispatch(brandStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
