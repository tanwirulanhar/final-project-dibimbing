import React from 'react';
import Index from '../../Component/Element/Input/Index';
import Button from '../../Component/Element/Button/Button';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <form
        action=""
        className="p-10 mt-20 shadow-2xl w-419 mr-44 h-489 rounded-xl"
      >
        <h1 className="text-2xl font-bold text-center text-green-800 mb-14">Sign Up</h1>
        <Index
          deskripsi="Full Name"
          type="text"
          placeholder="mr. jhoon doe"
          name="name"
        />
        <Index
          deskripsi="Email"
          type="email"
          placeholder="example@gmail.com"
          name="email"
        />
        <Index
          deskripsi="Password"
          type="password"
          placeholder="******"
          name="password"
        />

        <p className='mb-4 text-center'> have an account? <Link to="/login" className='text-green-600'> Sign In Here</Link></p>

        <Button text="Login" className="w-full mb-4"></Button>
      </form>
    </div>
  );
};

export default Register;
