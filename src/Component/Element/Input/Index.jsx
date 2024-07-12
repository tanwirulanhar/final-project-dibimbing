import React from 'react';
import Input from './Input';
import Label from './Label';

const Index = (props) => {
  const { deskripsi, name, type, placeholder, } = props;

  return (
    <div className="">
      <Label htmlFor={name}>{deskripsi}</Label>
      <Input name={name} type={type} placeholder={placeholder} />
    </div>
  );
};

export default Index;
