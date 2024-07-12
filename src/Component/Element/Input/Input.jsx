import React from 'react';

const Input = (props) => {
  const { type, placeholder, name } = props;
  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
       className="w-full px-3 py-2  mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default Input;
