import React from "react";
// import "./common.css";
const Input = ({ name, error, ...rest }) => {
  return (
    <div className="form-group">
      {/* <label htmlFor={name}>{label}</label> */}
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control input"
        placeholder={name}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
export default Input;
