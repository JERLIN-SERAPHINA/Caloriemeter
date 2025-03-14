import React from 'react';
import './FormInput.scss';

const FormInput = ({ label, type, name, value, onChange, required, children, className, placeholder }) => {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required={required}
            className={className}
          >
            {children}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required={required}
            className={className}
            placeholder={placeholder}
          />
        );
      default:
        return (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required={required}
            className={className}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="form-input">
      {label && <label htmlFor={name}>{label}</label>}
      {renderInput()}
    </div>
  );
};

export default FormInput;
