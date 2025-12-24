import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ReviewsPage.css';

const ReviewsPage = () => {
  const reviews = [
    {
      id: 1,
      name: "Ján M.",
      rating: 5,
      date: "15.12.2024",
      text: "Neskutočný zážitok! Rezervácia lanovky prebehla hladko і bez čakania v rade. Určite odporúčam."
    },
    {
      id: 2,
      name: "Mária K.",
      rating: 4,
      date: "02.01.2025",
      text: "Hotel bol skvelý, výhľad na Lomnický štít priamo z okna. Jediná nevýhoda bola obsadenosť parkoviska."
    },
    {
      id: 3,
      name: "Peter S.",
      rating: 5,
      date: "10.01.2025",
      text: "Najlepšia dovolenka v Tatrách. Systém Lomnicky-Travel nám ušetril kopec času."
    }
  ];

  return (
    <div className="reviews-page">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="back-link">← Domov</Link>
          <h1 className="logo">Recenzie hostí</h1>
          <div className="placeholder"></div>
        </div>
      </header>

      <main className="main-content container">
        <div className="reviews-header">
          <h2>Čo hovoria naši návštevníci</h2>
          <p>Viac ako 500 spokojných klientov túto sezónu</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-stars">
                {"⭐".repeat(review.rating)}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-footer">
                <span className="review-author">{review.name}</span>
                <span className="review-date">{review.date}</span>
              </div>
            </div>
          ))}
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

export default ReviewsPage;