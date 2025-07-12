import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfilePage() {
  const [userData, setUserData] = useState({ name: '', email: '', tagline: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/my-profile', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then(() => navigate('/profile'))
      .catch(err => {
        console.error(err);
        alert("Failed to update. Please try again.");
      });
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </label>
        <label>
          Tagline:
          <input
            name="tagline"
            value={userData.tagline}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: 'var(--btn-bg)',
            color: 'var(--btn-text)',
            padding: '10px 20px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '1rem',
            fontWeight: '600',
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;
