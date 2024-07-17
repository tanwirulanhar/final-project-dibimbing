import React from 'react';

const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="block mb-2 text-sm font-bold text-black">
      {children}
    </label>
  );
};

export default Label;
