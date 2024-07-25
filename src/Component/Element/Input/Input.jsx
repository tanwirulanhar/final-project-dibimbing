import React from 'react';

const Input = ({
  type = "text",
  placeholder = "",
  name = "",
  value = "",
  onChange,
  id = "",
  className = "",
  required = false,
  disabled = false,
  ariaLabel = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-label={ariaLabel}
        className="w-full px-3 py-2 mb-4 border border-green-500 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />
    </div>
  );
};

export default Input;
