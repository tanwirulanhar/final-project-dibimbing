import React from 'react';

const Index = ({ deskripsi, type, placeholder, name, required, className, onChange, min, max }) => {
  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium text-green-600">{deskripsi}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full px-3 py-2 mb-4 border border-green-500 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />
    </div>
  );
};

export default Index;
