import React from 'react';
import { useField } from 'formik';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input className="text-input form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="alert alert-danger mt-3" role="alert">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default MyTextInput;
