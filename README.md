# 🏔️ Lomnicky-Travel.sk

**Hotel and Cable Car Booking Platform in the Tatras**  
An intuitive website for planning your mountain getaway.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone git@github.com:Atoryx1s/Lomnicky-Travel.git

cd Lomnicky-Travel/
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```
### 3. Run the application
```bash
npm start
# or
yarn start
```

Open your browser at:
👉 http://localhost:3000

### 4.📁 Project Structure
```bash
Lomnicky-Travel/
├── public/                 # Static files
│   ├── *.html
│   ├── *.png
│   └── *.ico
├── src/                    # Project Source
│   ├── assets/             # Images, fonts
│   │   └── *.png
│   ├── pages/              # Application pages
│   │   └── *.jsx
│   ├── styles/             # Application styles
│   │   └── *.css
│   ├── App.jsx             # Main component
│   ├── index.css           # Main styles
│   ├── index.js            # Entry point
│   └── main.jsx            # App setting
├── package-lock.json 
└── package.json
```

### 5. 🌐 Available Pages
```bash
Page	        Path	    Description

Homepag         /           Accommodation search and information
Login	        /login      User authentication
Registration    /register   User registration
Reviews         /reviews    Reviews
Accommodation	/ubytovanie Hotel listings
Booking	        /booking    Reservation form
Payment	        /successpay Payment processing
Feedback        /feedback   Review form
```
### 6. 🔑 Test Credentials

To test the system and to log in to the system, you must first register.

When registering, your name must not be longer than 1 character and be less than 12 characters inclusive.

### 7. ⚙️ Technologies

React 18 – UI library

React Router 6 – Navigation

CSS3 – Styling

ES6+ – Modern JavaScript

### 8. 🎯 Features
```bash
✅ Complete booking flow – From search to payment
✅ Responsive design – Works on all devices
✅ Form validation – Input data validation
✅ User-friendly interface – Intuitive navigation
✅ Test scenarios – Ready demo logic
```
### 9.🛠️ Development Commands
```bash
# Run in development mode
npm start

# Create production build
npm run build

# Run tests
npm test (optional)

# Code analysis with ESLint
npm run lint
```
### 10. 🎨 Design
#### Color palette:
```bash
Primary: #1e40af (blue), #ffffff (white)

Accents: #059669 (green), #dc2626 (red)

Background: #f8fafc (light gray)
```
#### Fonts:

System fonts (Apple, BlinkMacSystemFont)

#### 📱 Responsiveness

Fully responsive project:

🖥️ Desktop (> 1200px)

📱 Tablet (768px – 1200px)

📲 Mobile (< 768px)

### 🤝 Project Team

Developed as a demo project for a Tatra Mountains booking platform.

### 📄 License

Tento projekt bol vytvorený výhradne pre vzdelávacie účely ako súčasť osobného portfólia.

This project was developed exclusively for educational purposes as part of a personal portfolio.

### SK (Slovenčina)
* **Autorské práva:** Všetky práva na dizajn, grafické prvky a zdrojový kód sú vyhradené autorom.
* **Komerčné využitie:** Akékoľvek komerčné využitie, predaj alebo distribúcia tohto kódu bez predchádzajúceho písomného súhlasu autora je **zakázané**.
* **Kopírovanie:** Kód je možné študovať a používať pre inšpiráciu, ale priame kopírovanie celého projektu za účelom vydávania za vlastnú prácu je neprijateľné.

### EN (English)
* **Copyright:** All rights to the design, graphics, and source code are reserved by the author.
* **Commercial Use:** Any commercial use, sale, or distribution of this code without prior written consent from the author is **strictly prohibited**.
* **Usage:** You are welcome to study the code and use it for inspiration. However, direct duplication of the entire project to claim it as your own work is not permitted.

---
Copyright © 2025 Nazar Adamenko. All rights reserved.

### 💬 Support

If you encounter issues:

Ensure Node.js version 14+ is installed

Check that all dependencies are installed

Clear cache:
```bash
npm cache clean --force
```