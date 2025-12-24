import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userName = sessionStorage.getItem('userName');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };
  const [isMobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(20);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardName: '',
    bankAccount: '',
    phoneNumber: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    cardNumber: false,
    expiryDate: false,
    cvc: false,
    cardName: false
  });

  const bookingData = location.state || {
    accommodationName: 'Chata Encián',
    date: 'Nezvolený',
    time: 'Nezvolený',
    guests: 1,
    nights: 1,
    totalPrice: 0,
    pricePerNight: 0
  };

  const bookingDetails = {
    accommodation: bookingData.accommodationName,
    date: bookingData.date,
    time: bookingData.time,
    guests: bookingData.guests,
    nights: bookingData.nights,
    total: bookingData.totalPrice,
    pricePerNight: bookingData.pricePerNight
  };

  const paymentMethods = [
    { id: 'card', name: 'Platba kartou', icon: '💳', description: 'Visa, Mastercard, American Express' },
    { id: 'bank', name: 'Bankový prevod', icon: '🏦', description: 'Platba na účet' },
    { id: 'online', name: 'Online platba', icon: '📱', description: 'Apple Pay, Google Pay' }
  ];

  const validateCardFields = () => {
  const cardNumberWithoutSpaces = formData.cardNumber.replace(/\s/g, '');
  
  return {
    cardNumber: formData.cardNumber.trim() !== '' && (cardNumberWithoutSpaces.length < 16 || !/^\d+$/.test(cardNumberWithoutSpaces)),
    expiryDate: formData.expiryDate.trim() !== '' && !/^\d{2}\/\d{2}$/.test(formData.expiryDate),
    cvc: formData.cvc.trim() !== '' && (formData.cvc.length < 3 || !/^\d+$/.test(formData.cvc)),
    cardName: formData.cardName.trim() !== '' && formData.cardName.trim().length < 2
  };
  };

  useEffect(() => {
  if (selectedPaymentMethod === 'card') {
    const hasAnyInput = 
      formData.cardNumber.trim() !== '' || 
      formData.expiryDate.trim() !== '' || 
      formData.cvc.trim() !== '' || 
      formData.cardName.trim() !== '';
    
    if (hasAnyInput) {
      const errors = validateCardFields();
      setFormErrors(errors);
    } else {
      setFormErrors({
        cardNumber: false,
        expiryDate: false,
        cvc: false,
        cardName: false
      });
    }
  }
  // eslint-disable-next-line
}, [formData.cardNumber, formData.expiryDate, formData.cvc, formData.cardName, selectedPaymentMethod]);

useEffect(() => {
  let interval;
  if (isProcessing && timer > 0) {
    interval = setInterval(() => setTimer(t => t - 1), 1000);
  } else if (timer === 0) {
    setPaymentCompleted(true);
  }
  return () => clearInterval(interval);
}, [isProcessing, timer]);

const formatCardNumber = (value) => {
  const numbers = value.replace(/\D/g, '');
  
  const limited = numbers.slice(0, 16);
  
  const formatted = limited.replace(/(\d{4})/g, '$1 ').trim();
  
  return formatted;
};

const formatExpiryDate = (value) => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length >= 2) {
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
  }
  
  return numbers;
};

  const isFormValid = () => {
  switch (selectedPaymentMethod) {
    case 'card':
      const errors = validateCardFields();
      const allFieldsFilled = 
        formData.cardNumber.trim() !== '' && 
        formData.expiryDate.trim() !== '' && 
        formData.cvc.trim() !== '' && 
        formData.cardName.trim() !== '';
      
      const noErrors = !Object.values(errors).some(error => error);
      
      return allFieldsFilled && noErrors;
    case 'bank':
      return formData.bankAccount.trim().length > 0;
    case 'online':
      return formData.phoneNumber.trim().length > 0;
    default:
      return false;
  }
};

  useEffect(() => {
    if (isConfirmed && !isFormValid()) {
      setIsConfirmed(false);
    }
  // eslint-disable-next-line
  }, [formData, selectedPaymentMethod]);

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  
  let formattedValue = value;
  
  if (name === 'cardNumber') {
    formattedValue = formatCardNumber(value);
  } else if (name === 'expiryDate') {
    formattedValue = formatExpiryDate(value);
  } else if (name === 'cvc') {
    formattedValue = value.replace(/\D/g, '').slice(0, 3);
  }
  
  setFormData(prev => ({ ...prev, [name]: formattedValue }));
};

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      alert('Najprv vyplňte všetky povinné polia pre zvolený spôsob platby!');
      return;
    }
    
    if (!isConfirmed) {
      alert('Najprv potvrďte, že ste vybrali všetko správne!');
      return;
    }
    
    if (selectedPaymentMethod === 'online') {
    setIsProcessing(true);
  } else {
    setPaymentCompleted(true);
  }
  };

  const handleConfirmationChange = (e) => {
    if (!isFormValid()) {
      alert('Najprv vyplňte všetky povinné polia!');
      return;
    }
    setIsConfirmed(e.target.checked);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'card':
        return (
          <>
          <div className="form-group">
            <label className="form-label">Číslo karty *</label>
            <input 
              type="text" 
              name="cardNumber"
              className={`form-input ${formErrors.cardNumber ? 'error' : ''}`}
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleInputChange}
              maxLength={19}
              inputMode="numeric"
              autoComplete="cc-number"
          />
          {formErrors.cardNumber && formData.cardNumber.trim() !== '' && (
            <span className="error-message">
              {formData.cardNumber.replace(/\s/g, '').length < 16 ? 'Zadajte 16-miestne číslo karty' : 'Zadajte platné číslo karty'}
           </span>
         )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Platnosť (MM/RR) *</label>
          <input 
            type="text" 
            name="expiryDate"
            className={`form-input ${formErrors.expiryDate ? 'error' : ''}`}
            placeholder="MM/RR"
            value={formData.expiryDate}
            onChange={handleInputChange}
            maxLength={5}
            inputMode="numeric"
            autoComplete="cc-exp"
          />
         {formErrors.expiryDate && formData.expiryDate.trim() !== '' && (
          <span className="error-message">
             Zadajte platnosť v formáte MM/RR (napr. 12/25)
        </span>
          )}
      </div>

      <div className="form-group">
        <label className="form-label">CVC *</label>
        <input 
          type="password" 
          name="cvc"
          className={`form-input ${formErrors.cvc ? 'error' : ''}`}
          placeholder="123"
          value={formData.cvc}
          onChange={handleInputChange}
          maxLength={3}
          inputMode="numeric"
          autoComplete="cc-csc"
        />
        {formErrors.cvc && formData.cvc.trim() !== '' && (
          <span className="error-message">
            {formData.cvc.length < 3 ? 'Zadajte 3-miestny CVC kód' : 'Zadajte platný CVC kód'}
          </span>
        )}
   </div>
  </div>

  <div className="form-group">
    <label className="form-label">Meno na karte *</label>
    <input 
      type="text" 
      name="cardName"
      className={`form-input ${formErrors.cardName ? 'error' : ''}`}
      placeholder="Ján Novák"
      value={formData.cardName}
      onChange={handleInputChange}
      autoComplete="cc-name"
    />
    {formErrors.cardName && formData.cardName.trim() !== '' && (
      <span className="error-message">
        {formData.cardName.trim().length < 2 ? 'Zadajte aspoň 2 znaky' : 'Zadajte platné meno'}
      </span>
    )}
</div>
          </>
        );
      
      case 'bank':
        return (
          <div className="form-group">
            <label className="form-label">Číslo bankového účtu *</label>
            <input 
              type="text" 
              name="bankAccount"
              className="form-input"
              placeholder="SK12 1234 1234 1234 1234 1234"
              value={formData.bankAccount}
              onChange={handleInputChange}
            />
            <div className="bank-info">
              <p><strong>Bankové údaje:</strong></p>
              <p>Lomnicky-Travel s.r.o.</p>
              <p>IBAN: SK05 8954 4569 0490 4464 6467</p>
              <p>BIC/SWIFT: TATRSKBX</p>
              <p>Variabilný symbol: 2025001</p>
            </div>
          </div>
        );
      
      case 'online':
        if (isProcessing) {
          return (
            <div className="processing-payment">
              <div className="loader"></div>
              <p>
                {isMobile 
                  ? "Prebieha autorizácia cez Apple/Google Pay..." 
                  : "Čakáme na naskenovanie QR kódu vaším telefónom..."}
              </p>
              <p className="timer">Zostáva: {timer} sekúnd</p>
            </div>
          );
        }

        return (
          <div className="online-selection">
            {isMobile ? (
              <div className="mobile-pay-options">
                <p className="form-label">Rýchla platba</p>
                <div className="pay-icons-row">
                  <span className="pay-badge apple"> Pay</span>
                  <span className="pay-badge google">G Pay</span>
                </div>
                <p className="online-info">Budete presmerovaní na potvrdenie platby vo vašom zariadení.</p>
              </div>
            ) : (
              <div className="desktop-qr-payment">
                <p className="form-label">Platba cez QR kód</p>
                <div className="qr-placeholder">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Lomnický Štít" alt="QR Code" />
                </div>
                <p className="online-info">Otvorte bankovú aplikáciu a naskenujte kód pre bezpečnú platbu.</p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="successpay-page">
      <header className="header">
          <div className="header-content">
            <Link to="/booking" className="back-link">
              ← Späť na rezerváciu
            </Link>
            <h1 className="logo">Lomnicky-Travel.sk</h1>
            <div className="booking-progress">
              <span className="progress-step">1. Výber</span>
              <span className="progress-divider">›</span>
              <span className="progress-step">2. Rezervácia</span>
              <span className="progress-divider">›</span>
              <span className="progress-step active">3. Platba</span>
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
          {!paymentCompleted ? (
            <div className="payment-container">
              <div className="payment-header">
                <h2 className="payment-title">
                  Vaše konečné rozhodnutie a platba
                </h2>
                <p className="payment-subtitle">
                  Skontrolujte si detaily rezervácie a pokračujte k platbe
                </p>
              </div>

              <div className="payment-content">
                <div className="payment-details">
                  <div className="details-card">
                    <h3 className="details-title">Detaily rezervácie</h3>
                    
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Ubytovanie:</span>
                        <span className="detail-value">{bookingDetails.accommodation}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Dátum príchodu:</span>
                        <span className="detail-value">{bookingDetails.date}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Čas príchodu:</span>
                        <span className="detail-value">{bookingDetails.time}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Počet osôb:</span>
                        <span className="detail-value">{bookingDetails.guests}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Počet nocí:</span>
                        <span className="detail-value">{bookingDetails.nights}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Cena za noc:</span>
                        <span className="detail-value">{bookingDetails.pricePerNight}€</span>
                      </div>
                    </div>
                    
                    <div className="details-divider"></div>
                    
                    <div className="price-summary">
                      <div className="price-row">
                        <span>Ubytovanie ({bookingDetails.nights} noci x {bookingDetails.guests} os.)</span>
                        <span>{bookingDetails.total - 30}€</span> 
                      </div>
                      <div className="price-row">
                        <span>Rezervačný poplatok</span>
                        <span>10€</span>
                      </div>
                      <div className="price-row">
                        <span>Daň</span>
                        <span>20€</span>
                      </div>
                      <div className="price-row total">
                        <span>Spolu k úhrade:</span>
                        <span className="total-amount">{bookingDetails.total}€</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="confirmation-section">
                    <div className="confirmation-checkbox">
                      <input
                        type="checkbox"
                        id="confirm-details"
                        checked={isConfirmed}
                        onChange={handleConfirmationChange}
                        className="checkbox-input"
                        disabled={!isFormValid()}
                      />
                      <label htmlFor="confirm-details" className="checkbox-label">
                        {!isFormValid() ? (
                          <span style={{color: '#dc2626'}}>
                            Najprv vyplňte všetky povinné polia platby
                          </span>
                        ) : (
                          'Potvrdzujem, že som si skontroloval(a) všetky detaily a vybral som všetko správne.'
                        )}
                      </label>
                    </div>
                    <p className="confirmation-note">
                      <small>* Po vyplnení všetkých povinných polí budete môcť zaškrtnúť potvrdenie</small>
                    </p>
                  </div>
                </div>

                <div className="payment-methods">
                  <div className="methods-card">
                    <h3 className="methods-title">Spôsob platby</h3>
                    
                    <div className="method-options">
                      {paymentMethods.map((method) => (
                        <div 
                          key={method.id}
                          className={`method-option ${selectedPaymentMethod === method.id ? 'active' : ''}`}
                          onClick={() => handlePaymentMethodSelect(method.id)}
                        >
                          <div className="method-icon">{method.icon}</div>
                          <div className="method-info">
                            <h4>{method.name}</h4>
                            <p>{method.description}</p>
                          </div>
                          <div className="method-radio">
                            {selectedPaymentMethod === method.id && <div className="radio-dot"></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="payment-form">
                      {renderPaymentForm()}
                      
                      <button 
                        className={`payment-btn ${!isConfirmed ? 'disabled' : ''}`}
                        onClick={handlePayment}
                        disabled={!isConfirmed}
                      >
                        {selectedPaymentMethod === 'card' ? `Zaplatiť kartou — ${bookingDetails.total}€` : 
                         selectedPaymentMethod === 'bank' ? `Potvrdiť bankový prevod — ${bookingDetails.total}€` :
                         `Pokračovať k online platbe — ${bookingDetails.total}€`}
                      </button>
                      
                      <div className="secure-payment">
                        <span className="secure-icon">🔒</span>
                        <span className="secure-text">Zabezpečená platba SSL šifrovaním</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="success-screen">
              <div className="success-icon">✅</div>
              
              <h2 className="success-title">Platba prebehla úspešne!</h2>
              
              <p className="success-message">
                Vaša rezervácia <strong>{bookingDetails.accommodation + ' '}</strong> 
                na dátum <strong>{bookingDetails.date}</strong> bola potvrdená.
                Potvrdenie bolo odoslané na váš email.
              </p>
              
              <div className="success-details">
                <div className="success-card">
                  <h3>Vaša rezervácia</h3>
                  <div className="success-info">
                    <p><strong>Číslo rezervácie:</strong> RES-2025-ENCIAN-001</p>
                    <p><strong>Dátum príchodu:</strong> {bookingDetails.date} o {bookingDetails.time}</p>
                    <p><strong>Ubytovanie:</strong> {bookingDetails.accommodation}</p>
                    <p><strong>Spôsob platby:</strong> {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}</p>
                    <p><strong>Suma:</strong> {bookingDetails.total}€</p>
                  </div>
                </div>
              </div>
              
              <div className="post-payment-choice">
                <p>Chceli by ste nám zanechať krátku spätnú väzbu o procese rezervácie?</p>
    
                <div className="success-actions" style={{ flexDirection: 'column', gap: '15px' }}>
                  <button 
                    className="payment-btn" 
                    onClick={() => navigate('/feedback')}
                    style={{ width: '100%', maxWidth: '300px' }}
                  >
                    ✍️ Napísať recenziu
                  </button>

                  <button 
                     className="home-btn" 
                      onClick={handleBackToHome}
                      style={{ background: 'transparent', color: '#64748b', border: '1px solid #cbd5e1' }}
                    >
                      Neskôr, vrátiť sa na hlavnú stránku
                    </button>
                </div>
              </div>
              
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2025 Lomicky-Travel, Všetky práва vyhradené.</p>
        </div>
      </footer>
    </div>
  );
};

export default Payment;