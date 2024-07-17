import React from 'react';
import Input from './Input';
import Label from './Label';

const Index = ({ deskripsi, name, type, placeholder, value, onChange }) => {
  return (
    <div>
      <Label htmlFor={name}>{deskripsi}</Label>
      <Input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default Index;
