// Login.js

import React, { useState } from 'react';
import { logIn } from './api';
import './login.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await logIn(data.name, data.password);

      if (response.userId) {
        navigate(`/user/${response.userId}`);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>LOGIN PAGE</h2>
        <p>Please login to your account</p>

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

        <button type="submit">Login</button>

        <div className="bottom-text">
          <p>
            Don't have an account? <span className='span' onClick={() => navigate('/')}>Sign Up</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
