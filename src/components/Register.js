// Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from './api';

const Register = () => {
  const nav = useNavigate();
  const [data, setData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signUp(data.name, data.password);

      // Access user ID from the response
      const userId = response.userId;

      console.log(response);

      // Pass user ID to navigate function
      nav(`user/${userId}`);
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>SIGN UP PAGE</h2>
        <p>Please fill your details</p>

        <div className="input-group">
          <input
            type="text"
            id="username"
            name="name"
            value={data.name}
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">Sign Up</button>

        <div className="bottom-text">
          <p>
            Already have an account? <span className='span' onClick={() => nav('login')}>Login IN</span>{' '}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
