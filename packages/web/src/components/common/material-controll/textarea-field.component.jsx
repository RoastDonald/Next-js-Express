import { TextareaAutosize } from "@material-ui/core";
import { useField } from "formik";
import React from "react";

const M1TextareaAutosize = ({ className, ...props }) => {
  const [field, meta] = useField(props);

  return <TextareaAutosize className={className} rowsMin={6} {...field} />;
};

export default M1TextareaAutosize;
