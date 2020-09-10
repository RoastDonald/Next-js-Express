import { useField } from "formik";

const Ffield = ({ placeholder, label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.touched && meta.error ? meta.error : "";
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input placeholder={placeholder} {...field} />
      {!errorText ? null : <div className="error">{errorText}</div>}
    </div>
  );
};

export default Ffield;
