import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const navigate = useNavigate();
  
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userName = sessionStorage.getItem('userName');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const database = [
    { id: 1, title: 'Hotel Lomnica', category: 'Ubytovanie', link: '/login' },
    { id: 2, title: 'Lanovka na Lomnický štít', category: 'Lanovky', link: '/login' },
    { id: 3, title: 'Penzión Plesnivec', category: 'Ubytovanie', link: '/login' },
    { id: 4, title: 'Turistické trasy', category: 'Aktivity', link: '/login' },
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 1) {
      const filtered = database.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="home-page">
      <header className="header">
          <div className="header-content">
            <div className="logo-section">
              <h1 className="logo">Lomnicky-Travel.sk</h1>
            </div>
              <div className="nav-links">
                <Link to="/reviews" className="nav-link">Recenzie</Link>
              </div>

            <form className="search-section">
              <div className="search-wrapper">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Hľadať ubytovanie, aktivity..."
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <button className="search-btn">🔍</button>
                {results.length > 0 && (
                  <ul className="search-results-dropdown">
                    {results.map(item => (
                      <li key={item.id} className="result-item">
                        <a href={item.link}>
                          <span className="result-title">{item.title}</span>
                          <span className="result-category">{item.category}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                 )}
              </div>
            </form>
            
            <div className="auth-section">
              {isLoggedIn ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontWeight: '600', color: '#1e40af' }}>
                    👋 Ahoj, {userName}
                  </span>
                  <button onClick={handleLogout} className="login-btn" style={{ background: '#dc2626' }}>
                    Odhlásiť sa
                  </button>
                </div>
              ) : (
                <Link to="/login" className="login-btn">Prihlásiť sa</Link>
              )}
            </div>
          </div>
        </header>

      <main className="main-content">
        <div className="container">
          <div className="content-wrapper">
            <div className="text-block main-heading">
              <h2>Tešíme sa, že vás vidíme.</h2>
              <h2 className="sub-heading">
                Vyberte si miesto na dovolenku a zažite nezabudnuteľné zážitky!
              </h2>
            </div>

            <div className="divider"></div>

            <div className="text-block description">
              <h3>Lomnicky-Travel — váš kľúč k Lomnický štít</h3>
              <p>
                Zabudnite na rady a starosti. Náš systém spája rezerváciu hotela, 
                podujatí a lanoviek do jedného jednoduchého a intuitívneho procesu. 
                Dobrodružstvo vo výškach čaká.
              </p>
            </div>

            <div className="divider"></div>

            <div className="text-block cta-section">
              <p className="cta-text">
                Bohatý výber možností pre príjemný oddych. 
                Neváhajte sa – zaregistrujte sa/prihláste sa.
              </p>
              
              <Link 
                to={isLoggedIn ? "/ubytovanie" : "/login"} 
                className="main-cta-button"
              >
                {isLoggedIn ? "Prejsť k rezerváciám" : "Ubytovanie/Lanovky"}
              </Link>
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

export default HomePage;