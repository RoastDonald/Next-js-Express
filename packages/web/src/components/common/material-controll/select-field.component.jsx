import { FormLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useField,Field } from "formik";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const M1SelectField = ({ items, ...props }) => {
  const { label, labelStyles, className } = props;
  const classes = useStyles();
  const [field, meta,{setValue}] = useField(props);
  const errorText = meta.touched && meta.error ? meta.error : "";

  return (
    <div className={classes.root}>
      <FormLabel className={labelStyles}>{label}</FormLabel>
      <Field
       as={Select}
       type='select'
       value={!field.value? items[0]._id : field.value}
        style={{ width: "100%" }}
        className={className}
        variant="filled"
        onChange={(value) =>{
          setValue(value.target.value)
        
        }}

      >
        {items &&
          items.map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
      </Field>
    </div>
  );
};

export default M1SelectField;
