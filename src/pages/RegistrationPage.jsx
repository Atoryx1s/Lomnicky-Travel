import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const RegistrationPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'name' && value.length > 12) {
    return; 
    }
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    
    if (error) setError('');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError('Vyplňte prosím všetky polia');
      return;
    }

    if (formData.name.length < 2) {
    setError('Meno musí mať aspoň 2 znaky');
    return;
    }

    if (formData.name.length > 12) {
    setError('Meno nesmie byť dlhšie ako 12 znakov');
    return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Zadajte platnú emailovú adresu');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Heslá sa nezhodujú');
      return;
    }
    try {
      const existingUsers = JSON.parse(sessionStorage.getItem('users') || '[]');

      const userExists = existingUsers.some(user => user.email === formData.email);
      if (userExists) {
        setError('Používateľ s týmto emailom už existuje');
        return;
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      
      existingUsers.push(newUser);
      sessionStorage.setItem('users', JSON.stringify(existingUsers));

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError('Chyba pri ukladaní údajov');
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/login" className="back-link">← Späť na prihlásenie</Link>
            <h1 className="logo">Lomnicky-Travel.sk</h1>
            <div className="placeholder"></div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="login-card">
            <h2 className="login-title">Registrácia</h2>
            <p className="login-subtitle">Vytvorte si účet pre cestovanie po Tatrách.</p>
            
            {success ? (
              <div className="success-message" style={{
                color: '#15803d',
                backgroundColor: '#f0fdf4',
                padding: '15px',
                borderRadius: '6px',
                textAlign: 'center',
                border: '1px solid #bbf7d0'
              }}>
                Registrácia úspešná! Budete presmerovaní...
              </div>
            ) : (
              <form className="login-form" onSubmit={handleRegister}>
                <div className='form-group'>
                  <label htmlFor="name" className="form-label">Meno</label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    placeholder="Vaše meno"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Emailová adresa</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Heslo</label>
                  <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Vaše heslo"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Zopakujte heslo</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-input"
                    placeholder="Zopakujte heslo"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <button type="submit" className="login-submit-btn">
                  Zaregistrovať sa
                </button>
              </form>
            )}
            
            <div className="login-footer">
              <p className="register-text">
                Už máte účet? <Link to="/login" className="register-link">Prihlásiť sa</Link>
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

export default RegistrationPage;