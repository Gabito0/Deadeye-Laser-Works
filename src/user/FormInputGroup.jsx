import React from "react";

/** FormInputGroup Component
 *
 * A reusable input field component that includes a label and input element, styled as a Bootstrap form group.
 */

const FormInputGroup = ({ label, type, name, value, onChange, required }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormInputGroup;
