import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/BookingPage.css';

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const accommodationName = queryParams.get('accommodation') || 'Chata Encián';
  const basePricePerPerson = parseInt(queryParams.get('price')) || 85;

  const [numberOfNights, setNumberOfNights] = useState(1);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  
  const accommodationTotal = basePricePerPerson * numberOfGuests * numberOfNights;
  const serviceFee = 10;
  const tax = Math.round(accommodationTotal * 0.1);
  const finalTotal = accommodationTotal + serviceFee + tax;
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const isFormValid = selectedDate !== '' && selectedTime !== '';

  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userName = sessionStorage.getItem('userName');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };


  const getMaxNights = () => {
  if (!selectedDate) return 10;
  const lastAvailableDate = new Date(availableDates[availableDates.length - 1]);
  const currentSelectedDate = new Date(selectedDate);
  const diffTime = Math.abs(lastAvailableDate - currentSelectedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
  };

  useEffect(() => {
    const max = getMaxNights();
    if (numberOfNights > max) setNumberOfNights(max);
    // eslint-disable-next-line
  }, [selectedDate]);

  const availableDates = [
    '2026-01-15', '2026-01-16', '2026-01-17', 
    '2026-01-18', '2026-01-19', '2026-01-20'
  ];
  
  const availableTimes = [
    '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '18:00'
  ];

  const handleContinue = (e) => {
  e.preventDefault();
  
  const formattedDate = formatDate(selectedDate);
  const priceToSend = typeof basePricePerPerson !== 'undefined' ? basePricePerPerson : 85;

  if (!isFormValid) {
    alert('Prosím, vyberte si dátum a čas príchodu.');
    return;
  }

  navigate('/successpay?step=summary', { 
    state: { 
      accommodationName, 
      date: formattedDate, 
      time: selectedTime, 
      guests: numberOfGuests,
      nights: numberOfNights,
      totalPrice: finalTotal,
      pricePerNight: priceToSend
    } 
  });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sk-SK', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="booking-page">
      <header className="header">
          <div className="header-content">
            <Link to="/ubytovanie" className="back-link">
              ← Späť na výber
            </Link>
            <h1 className="logo">Lomnicky-Travel.sk</h1>
            <div className="booking-progress">
              <span className="progress-step">1. Výber</span>
              <span className="progress-divider">›</span>
              <span className="progress-step active">2. Rezervácia</span>
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
          <div className="booking-container">
            <div className="booking-form-section">
              <h2 className="booking-title">Rezervácia: {accommodationName}</h2>
              
              <form className="booking-form" onSubmit={handleContinue}>
                <div className="form-section">
                  <h3 className="form-section-title">
                    📅 Vyberte dátum príchodu
                  </h3>
                  <p className="form-section-description">
                    Dostupné termíny pre {accommodationName}
                  </p>
                  
                  <div className="date-selection">
                    {availableDates.map((date) => (
                      <button
                        key={date}
                        type="button"
                        className={`date-option ${selectedDate === date ? 'selected' : ''}`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className="date-day">
                          {new Date(date).getDate()}
                        </div>
                        <div className="date-month">
                          {new Date(date).toLocaleDateString('sk-SK', { month: 'short' })}
                        </div>
                        <div className="date-weekday">
                          {new Date(date).toLocaleDateString('sk-SK', { weekday: 'short' })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-section">
                  <h3 className="form-section-title">
                    ⏰ Vyberte čas príchodu
                  </h3>
                  
                  <div className="time-selection">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-section">
                  <h3 className="form-section-title">🌙 Počet nocí</h3>
                  <div className="guests-selection">
                    <button type="button" className="guest-btn" onClick={() => setNumberOfNights(Math.max(1, numberOfNights - 1))}>−</button>
                    <div className="guest-count">
                      <span className="count">{numberOfNights}</span>
                      <span className="label">nocí (max {getMaxNights()})</span>
                    </div>
                    <button type="button" className="guest-btn" 
                      onClick={() => setNumberOfNights(Math.min(getMaxNights(), numberOfNights + 1))}>+</button>
                    </div>
                  </div>

                  <div className="form-section">
                   <h3 className="form-section-title">👥 Počet osôb</h3>
                  <div className="guests-selection">
                    <button type="button" className="guest-btn" onClick={() => setNumberOfGuests(Math.max(1, numberOfGuests - 1))}>−</button>
                    <div className="guest-count">
                      <span className="count">{numberOfGuests}</span>
                      <span className="label">osôb</span>
                    </div>
                    <button type="button" className="guest-btn" onClick={() => setNumberOfGuests(numberOfGuests + 1)}>+</button>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className={`continue-btn ${!isFormValid ? 'disabled' : ''}`}
                  disabled={!isFormValid}
                >
                  {isFormValid ? 'Pokračovať k platbe' : 'Vyberte dátum a čas'}
                </button>
              </form>
            </div>
            <div className="booking-summary">
              <div className="summary-card">
                <h3 className="summary-title">Váš výber</h3>
                
                <div className="summary-item">
                  <span className="summary-label">Ubytovanie:</span>
                  <span className="summary-value">{accommodationName}</span>
                </div>
                
                <div className="summary-item">
                  <span className="summary-label">Dátum:</span>
                  <span className="summary-value">
                    {selectedDate ? formatDate(selectedDate) : 'Nie je vybraný'}
                  </span>
                </div>
                
                <div className="summary-item">
                  <span className="summary-label">Čas:</span>
                  <span className="summary-value">
                    {selectedTime || 'Nie je vybraný'}
                  </span>
                </div>
                
                <div className="summary-item">
                  <span className="summary-label">Počet osôb:</span>
                  <span className="summary-value">{numberOfGuests}</span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Počet noci:</span>
                  <span className="summary-value">{numberOfNights}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-price">
                  <div className="price-detail">
                    <span>{accommodationName} ({numberOfNights} noci x {numberOfGuests} os.)</span>
                    <span>{accommodationTotal}€</span>
                  </div>
                  <div className="price-detail">
                    <span>Poplatok za rezerváciu</span>
                    <span>{serviceFee}€</span>
                  </div>
                  <div className="price-detail">
                    <span>Daň (10%)</span>
                    <span>{tax}€</span>
                  </div>
                  <div className="price-total">
                    <span>Celková suma:</span>
                    <span className="total-amount">{finalTotal}€</span>
                  </div>
                </div>
                
                <div className="summary-note">
                  <p>
                    Po potvrdení budete presmerovaní na stránku platby.
                    Platba je zabezpečená.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2025 Lomicky-Travel, Všetky práva vyhradené.</p>
        </div>
      </footer>
    </div>
  );
};

export default BookingPage;