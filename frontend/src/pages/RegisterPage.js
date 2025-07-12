import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // reuse same styles for simplicity

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/auth/register', {
        name, email, password
      });

      console.log(res.data);
      // auto login after signup
      localStorage.setItem('token', res.data.token);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo">StackIt</div>
        <h1>Join us!</h1>
        <p className="subtext">Create your account</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

          <button type="submit" className="login-btn">Sign Up</button>
        </form>

        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      </div>

      <div className="login-right">
        <img src="https://source.unsplash.com/600x800/?learning,code" alt="Signup visual" />
      </div>
    </div>
  );
}
