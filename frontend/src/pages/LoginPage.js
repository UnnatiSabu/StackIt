import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import visual from '../assets/Login-visual.jpg';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/auth/login', {
        email,
        password
      });

      console.log('Response:', res.data);

      localStorage.setItem('token', res.data.token);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo">StackIt</div>
        <h1>Hi there!</h1>
        <p className="subtext">Have we met before?</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

          <button type="submit" className="login-btn">Log in</button>
        </form>

        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}

        <div className="divider">OR</div>

        <button className="google-btn">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" />
          Log in with Google
        </button>

        <div className="extras">
          <a href="#">Forgot my password</a>
          <div className="links">
          <span>Don't have an account? <Link to="/register">Sign up</Link></span>
          </div>
        </div>
      </div>

      <div className="login-right">
        <img src={visual} alt="Login visual" />
      </div>
    </div>
  );
}
