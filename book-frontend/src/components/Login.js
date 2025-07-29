import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Proper import

// ✅ Moved styles above
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #74ebd5, #ACB6E5)', // light blue gradient
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '320px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
marginBottom: '15px',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#4a90e2',
    color: '#fff',
    fontSize: '16px',
  cursor: 'pointer',
  },
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://book-backend-bmpr.onrender.com/api/auth/login', {
        username,
        password,
      });

      const token = response.data.token;
      const decoded = jwtDecode(token); // ✅ correct function name
      localStorage.setItem("token", token);
      localStorage.setItem("role", decoded.role.trim()); // ✅ save role

      console.log('✅ Login Success:', token);
      navigate('/books');
    } catch (error) {
      console.error('❌ Login Failed:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed. Check your credentials.');
    }
  };

 return (
  <div style={styles.container}>
    <div style={styles.card}>
      <h2 style={{ marginBottom: '20px' }}>📚 Book Management</h2>
      <img
        src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
        alt="Book"
        style={{ width: '60px', marginBottom: '15px' }}
      />
      <h3 style={{ marginBottom: '20px' }}>🔐 Login</h3>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>

      {/* ✅ Registration link styled below the form */}
      <p style={{ marginTop: '15px', fontSize: '14px' }}>
        Don't have an account?{' '}
        <a href="/register" style={{ color: '#4a90e2', textDecoration: 'none' }}>
          Register
        </a>
      </p>
    </div>
  </div>
);
}

export default Login;