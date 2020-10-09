import { TextField } from "@material-ui/core";
import { useField } from "formik";
import React from "react";
import NumberFormat from "react-number-format";

function NumberFormatCustom(props) {
  const { inputRef, className } = props;
  const [field, meta, { setValue }] = useField(props);

  return (
    <NumberFormat
      getInputRef={inputRef}
      thousandSeparator
      isNumericString
      className={className}
      prefix="$"
      onValueChange={(val) => {
        setValue(val.floatValue);
      }}
      {...field}
    />
  );
}

const M1TextField = ({ isNumber, className, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.touched && meta.error ? meta.error : "";
  if (isNumber) {
    return (
      <div>
        <TextField
          style={{ width: "100%" }}
          size="medium"
          error={!!errorText}
          helperText={errorText}
          variant="filled"
          {...field}
          {...props}
          InputProps={{
            inputComponent: NumberFormatCustom,
            className,
          }}
        />
      </div>
    );
  }
  return (
    <div>
      <TextField
        style={{ width: "100%" }}
        size="medium"
        className={className}
        error={!!errorText}
        helperText={errorText}
        variant="filled"
        {...field}
        {...props}
      />
    </div>
  );
};

export default M1TextField;
