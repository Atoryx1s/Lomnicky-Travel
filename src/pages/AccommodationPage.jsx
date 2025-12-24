import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AccommodationPage.css';

const AccommodationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
  if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    navigate('/login');
  }
  }, [navigate]);

  const [locationFilter, setLocationFilter] = useState('Všetky');
  const [priceFilter, setPriceFilter] = useState('Všetky');

  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userName = sessionStorage.getItem('userName');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };


  const accommodations = [
    {
      id: 1,
      name: "Chata Encián",
      location: "Lomnický štít, 1200m n.m.",
      description: "Pohodlná chata s výhľadom na celé Tatry. Ideálna pre rodiny a skupiny.",
      price: "85€ / noc",
      rating: "4.8",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Chata Sokol",
      location: "Štrbské pleso, 1350m n.m.",
      description: "Moderná chata pri jazere. K dispozícii sú aj vypožičovne vybavenia.",
      price: "75€ / noc",
      rating: "4.5",
      imageUrl: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Chata Skalnaté",
      location: "Skalnaté pleso, 1750m n.m.",
      description: "Vysokohorská chata pre skutočných dobrodruhov. Výhľad na ľadovce.",
      price: "110€ / noc",
      rating: "4.9",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    },
  ];

  const handleBooking = (id) => {
  const item = accommodations.find(a => a.id === id);
  const basePrice = parseInt(item.price);
  navigate(`/booking?accommodation=${encodeURIComponent(item.name)}&price=${basePrice}`);
  };

  const handleMoreInfo = (accommodationId) => {
    const accommodation = accommodations.find(a => a.id === accommodationId);
    alert(`Viac informácií o: ${accommodation?.name}\n\nLokalita: ${accommodation?.location}\nCena: ${accommodation?.price}\nHodnotenie: ${accommodation?.rating} ⭐`);
  };

  const filteredAccommodations = accommodations.filter(item => {
    const matchesLocation = locationFilter === 'Všetky' || item.location.includes(locationFilter);
    const priceValue = parseInt(item.price);
    let matchesPrice = true;
    if (priceFilter === 'Do 80€') matchesPrice = priceValue <= 80;
    else if (priceFilter === '80-100€') matchesPrice = priceValue > 80 && priceValue <= 100;
    else if (priceFilter === 'Nad 100€') matchesPrice = priceValue > 100;

    return matchesLocation && matchesPrice;
  });

  return (
    <div className="accommodation-page">
      <header className="header">
          <div className="header-content">
            <Link to="/" className="back-link">
              ← Späť na hlavnú
            </Link>
            <h1 className="logo">Lomnicky-Travel.sk</h1>
            <div className="booking-progress">
              <span className="progress-step active">1. Výber</span>
              <span className="progress-divider">›</span>
              <span className="progress-step">2. Rezervácia</span>
              <span className="progress-divider">›</span>
              <span className="progress-step">3. Platba</span>
            </div>

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
          <div className="page-header">
            <h2 className="page-title">Ubytovanie & Lanovky</h2>
            <p className="page-subtitle">
              Vyberte si z našej ponuky ubytovaní v srdci Tatier. 
              Všetky chaty majú priamy prístup k lanovkám.
            </p>
          </div>

          <div className="filters">
            <div className="filter-group">
              <span className="filter-label">Lokalita:</span>
              {['Všetky', 'Lomnický štít', 'Štrbské pleso', 'Skalnaté pleso'].map(loc => (
                <button 
                  key={loc}
                  className={`filter-btn ${locationFilter === loc ? 'active' : ''}`}
                  onClick={() => setLocationFilter(loc)}
                >
                  {loc}
                </button>
              ))}

            </div>
            <div className="filter-group">
              <span className="filter-label">Cena:</span>
              {['Všetky', 'Do 80€', '80-100€', 'Nad 100€'].map(price => (
                <button 
                  key={price}
                  className={`filter-btn ${priceFilter === price ? 'active' : ''}`}
                  onClick={() => setPriceFilter(price)}
                >
                { price}
                </button>
              ))}
            </div>
          </div>

          <div className="accommodations-grid">
            {filteredAccommodations.length > 0 ? (
              filteredAccommodations.map((accommodation) => (
              <div 
                key={accommodation.id} 
                className="accommodation-card"
              >
                <div className="accommodation-image-container">
                  <div 
                    className="accommodation-image"
                    style={{
                      backgroundImage: `url('${accommodation.imageUrl}')`,
                      backgroundColor: '#f1f5f9'
                    }}
                  >
                    <div className="accommodation-rating">
                      ⭐ {accommodation.rating}
                    </div>
                  </div>
                </div>

                <div className="accommodation-info">
                  <div className="accommodation-header">
                    <h3 className="accommodation-name">{accommodation.name}</h3>
                    <span className="accommodation-price">{accommodation.price}</span>
                  </div>
                  
                  <p className="accommodation-location">
                    📍 {accommodation.location}
                  </p>
                  
                  <p className="accommodation-description">
                    {accommodation.description}
                  </p>
                  
                  <div className="accommodation-features">
                    <span className="feature">Wi-Fi</span>
                    <span className="feature">Parkovanie</span>
                    <span className="feature">Raňajky</span>
                    <span className="feature">Blízko lanovky</span>
                  </div>
                  
                  <div className="action-buttons">
                    <button 
                      className={`book-btn primary`}
                      onClick={() => handleBooking(accommodation.id)}
                    >
                      Rezervovať
                    </button>
                    
                    <button 
                      className="info-btn"
                      onClick={() => handleMoreInfo(accommodation.id)}
                    >
                      Viac informácií
                    </button>
                  </div>
                </div>
              </div>
            ))
            ) : (
              <p className="no-results">Žiadne ubytovanie nevyhovuje zadaným kritériám.</p>
            )}
          </div>

          <div className="additional-info">
            <h3>Informácie o lanovkách</h3>
            <div className="info-cards">
              <div className="info-card">
                <h4>🔼 Lomnický štít lanovka</h4>
                <p>Prevádzková doba: 8:00 - 18:00</p>
                <p>Interval: každých 15 minút</p>
              </div>
              <div className="info-card">
                <h4>🔼 Štrbské pleso lanovka</h4>
                <p>Prevádzková doba: 7:30 - 19:00</p>
                <p>Interval: každých 20 minút</p>
              </div>
              <div className="info-card">
                <h4>🔼 Skalnaté pleso lanovka</h4>
                <p>Prevádzková doba: 8:00 - 19:00</p>
                <p>Interval: každých 30 minút</p>
              </div>
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

export default AccommodationPage;