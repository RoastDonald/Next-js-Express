import React from "react";
import { TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useField } from "formik";

const Ffield = ({ placeholder, label, type, ...rest }) => {
  const [field, meta] = useField(rest);
  const errorText = meta.touched && meta.error ? meta.error : "";
  return (
    <div>
      <TextField
        type={type}
        style={{ width: "100%" }}
        size="medium"
        error={!!errorText}
        helperText={errorText}
        label={label}
        variant="filled"
        placeholder={placeholder}
        {...field}
        {...rest}
      />
    </div>
  );
};

export default Ffield;
