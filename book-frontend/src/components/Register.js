import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        // No role sent from frontend
      });
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '30px', fontSize: '18px' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleRegister}>
        <label>Username</label><br />
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        /><br /><br />

        <label>Password</label><br />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        /><br /><br />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Register
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
  Already registered?{' '}
  <a href="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
    Login
  </a>
</p>
    </div>
  );
}

export default Register;