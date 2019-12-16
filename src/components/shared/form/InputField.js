import React from "react";

export const InputField = ({
  input,
  label,
  type,
  className,
  meta: { touched, error, warning }
}) => (
  <div className="form-group">
    <label className="label control-label">{label}</label>
    <div className="input-group">
      <input {...input} type={type} className={className} />
    </div>
      {touched &&
        ((error && <div className="alert alert-danger">{error}</div>))}
  </div>
)
