import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/FeedbackPage.css';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentStatus = queryParams.get('payment') || 'success';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    experience: '',
    suggestions: '',
    wouldRecommend: null
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleRecommendation = (value) => {
    setFormData(prev => ({
      ...prev,
      wouldRecommend: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Feedback submitted:', formData);
    setIsSubmitted(true);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={starValue}
          type="button"
          className={`star-btn ${starValue <= formData.rating ? 'active' : ''}`}
          onClick={() => handleRatingClick(starValue)}
          aria-label={`Оцінити на ${starValue} зірок`}
        >
          ★
        </button>
      );
    });
  };

  return (
    <div className="feedback-page">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="back-link">
              ← Späť na hlavnú
            </Link>
            <h1 className="logo">Lomnicky-Travel.sk</h1>
            <div className="feedback-badge">
              <span className="badge-text">Spätná väzba</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          {!isSubmitted ? (
            <div className="feedback-container">
              <div className="feedback-header">
                <h2 className="feedback-title">
                  Spätná väzba o vašej skúsenosti
                </h2>
                <p className="feedback-subtitle">
                  Pomôžte nám zlepšiť naše služby. Vaše odpovede sú anonymné 
                  a budú použité len na vylepšenie systému.
                </p>
                
                {paymentStatus === 'success' && (
                  <div className="payment-success-note">
                    ✅ Ďakujeme za vašu rezerváciu! Teraz by sme radi poznali 
                    vašu skúsenosť s rezervačným procesom.
                  </div>
                )}
              </div>

              <form className="feedback-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3 className="section-title">O vás (voliteľné)</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Meno
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-input"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ján Novák"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jan.novak@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">
                    1. Ako by ste ohodnotili celkovú skúsenosť?
                  </h3>
                  <div className="rating-section">
                    <div className="stars-container">
                      {renderStars()}
                    </div>
                    <div className="rating-labels">
                      <span>Veľmi zlá</span>
                      <span>Vynikajúca</span>
                    </div>
                    <p className="rating-value">
                      {formData.rating > 0 ? `Vaše hodnotenie: ${formData.rating}/5` : 'Kliknite na hviezdičky'}
                    </p>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">
                    2. Opíšte svoju skúsenosť s rezervačným procesom
                  </h3>
                  <div className="form-group">
                    <textarea
                      id="experience"
                      name="experience"
                      className="form-textarea"
                      rows="4"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="Čo sa vám páčilo? Čo by sme mohli zlepšiť? Bolo všetko jasné a intuitívne?"
                      required
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">
                    3. Máte nejaké návrhy na zlepšenie?
                  </h3>
                  <div className="form-group">
                    <textarea
                      id="suggestions"
                      name="suggestions"
                      className="form-textarea"
                      rows="3"
                      value={formData.suggestions}
                      onChange={handleInputChange}
                      placeholder="Akú novú funkciu by ste uvítali? Čo vám chýbalo?"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">
                    4. Odporučili by ste našu službu priateľom?
                  </h3>
                  <div className="recommendation-section">
                    <button
                      type="button"
                      className={`recommend-btn ${formData.wouldRecommend === true ? 'active' : ''}`}
                      onClick={() => handleRecommendation(true)}
                    >
                      Áno, určite
                    </button>
                    <button
                      type="button"
                      className={`recommend-btn maybe ${formData.wouldRecommend === null ? 'active' : ''}`}
                      onClick={() => handleRecommendation(null)}
                    >
                      Možno
                    </button>
                    <button
                      type="button"
                      className={`recommend-btn ${formData.wouldRecommend === false ? 'active' : ''}`}
                      onClick={() => handleRecommendation(false)}
                    >
                      Pravdepodobne nie
                    </button>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    Odoslať spätnú väzbu
                  </button>
                  <button 
                    type="button" 
                    className="skip-btn"
                    onClick={handleBackToHome}
                  >
                    Preskočiť a vrátiť sa domov
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="thank-you-screen">
              <div className="thank-you-icon">🎉</div>
              
              <h2 className="thank-you-title">
                Ďakujeme za vašu spätnú väzbu!
              </h2>
              
              <p className="thank-you-message">
                Vaše odpovede nám pomôžu vytvoriť lepšiu skúsenosť 
                pre všetkých používateľov. Oceňujeme váš čas a úsilie.
              </p>
              
              <div className="feedback-summary">
                <h3>Zhrnutie vašej odpovede:</h3>
                <div className="summary-grid">
                  {formData.rating > 0 && (
                    <div className="summary-item">
                      <span className="summary-label">Hodnotenie:</span>
                      <span className="summary-value">
                        {formData.rating} ★
                      </span>
                    </div>
                  )}
                  {formData.wouldRecommend !== null && (
                    <div className="summary-item">
                      <span className="summary-label">Odporučenie:</span>
                      <span className="summary-value">
                        {formData.wouldRecommend === true ? 'Áno' : 
                         formData.wouldRecommend === false ? 'Nie' : 'Možno'}
                      </span>
                    </div>
                  )}
                </div>
                
                {formData.experience && (
                  <div className="summary-comment">
                    <h4>Vaše komentáre:</h4>
                    <p className="comment-text">{formData.experience}</p>
                  </div>
                )}
              </div>
              
              <div className="thank-you-actions">
                <button className="home-btn" onClick={handleBackToHome}>
                  Dokončiť a vrátiť sa na hlavnú stránku
                </button>
                
                <Link to="/ubytovanie" className="new-booking-link">
                  Vytvoriť novú rezerváciu →
                </Link>
              </div>
            </div>
          )}
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

export default FeedbackPage;