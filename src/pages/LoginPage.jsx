import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    
    if (error) setError('');
  };

  const handleLogin = (e) => {
  e.preventDefault();
  
  const users = JSON.parse(sessionStorage.getItem('users') || '[]');

  const user = users.find(u => u.email === formData.email && u.password === formData.password);

  if (user) {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userEmail', user.email);
    sessionStorage.setItem('userName', user.name);
    navigate('/ubytovanie');
  } else {
    setError('Nesprávny email alebo heslo');
  }
};
  
  return (
    <div className="login-page">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="back-link">
              ← Späť
            </Link>
            <h1 className="logo">Lomnicky-Travel.sk</h1>
            <div className="placeholder"></div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="login-card">
            <h2 className="login-title">Prihlásiť sa</h2>
            <p className="login-subtitle">
              Pre pokračovanie sa prihláste do svojho účtu.
            </p>
            
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Emailová adresa
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Heslo
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Vaše heslo"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {error && (
                <div className="error-message" style={{
                  color: '#dc2626',
                  backgroundColor: '#fef2f2',
                  padding: '10px 15px',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  fontSize: '0.9rem',
                  border: '1px solid #fecaca'
                }}>
                  {error}
                </div>
              )}
              
              <button type="submit" className="login-submit-btn">
                Prihlásiť
              </button>
            </form>
            
            <div className="login-footer">
              <p className="register-text">
                Nemáte účet?{' '}
                <Link to="/register" className="register-link">
                  Zaregistrovať sa
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2025 Lomicky-Travel. Všetky práva vyhradené.</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;