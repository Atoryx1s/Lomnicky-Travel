import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AccommodationPage from './pages/AccommodationPage';
import BookingPage from './pages/BookingPage';
import Payment from './pages/Payment';
import FeedbackPage from './pages/FeedbackPage';
import RegistrationPage from './pages/RegistrationPage';
import ReviewsPage from './pages/ReviewsPage';

function App() {
  return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/ubytovanie" element={<AccommodationPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/successpay" element={<Payment />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;