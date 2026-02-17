# 🌤️ SkyScore - Advanced Weather Analytics Dashboard

SkyScore is a next-generation weather application that goes beyond simple forecasts. It acts as a **Weather Intelligence Dashboard**, ranking cities based on a proprietary **"Comfort Score"** to help users find the most pleasant locations. Built with a modern **MERN stack**, it features a stunning **glassmorphism UI**, real-time data visualization, and secure user authentication.

## 🚀 Key Features

*   **🏆 Comfort Score Algorithm:** Intelligently calculates a "Comfort Score" (0-100) for cities based on temperature, humidity, and wind speed.
*   **🌍 Global City Search:** Instantly fetch and analyze weather data for any city in the world using the OpenWeatherMap API.
*   **📊 Interactive Analytics:**
    *   **Comfort Charts:** Visual comparison of comfort scores across different cities.
    *   **Temperature Trends:** Beautiful area charts showing temperature variations.
*   **🎨 Premium UI/UX:**
    *   **Glassmorphism Design:** Modern, translucent card aesthetics.
    *   **Dynamic Animations:** Rain effects, smooth transitions, and hover interactions.
    *   **Responsive Layout:** Fully optimized for Desktop, Tablet, and Mobile devices.
    *   **Dark/Light Mode:** Seamless theme switching.
*   **🔐 Secure Authentication:** Full user registration and login system protected by **JWT (JSON Web Tokens)** and **Bcrypt** encryption.

---

## 🛠️ Technology Stack

### **Frontend (Client)**
*   **Framework:** [React 19](https://react.dev/) (via [Vite](https://vitejs.dev/))
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & Custom CSS Variables
*   **Components:** Material UI (Icons)
*   **Visualization:** [Recharts](https://recharts.org/) for data graphing
*   **State Management:** React Hooks (`useState`, `useEffect`, `useContext`)
*   **Routing:** React Router DOM

### **Backend (Server)**
*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express.js](https://expressjs.com/)
*   **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
*   **Authentication:** JWT & Bcrypt.js
*   **API Integration:** Axios (OpenWeatherMap)
*   **Security:** CORS, Dotenv

---

## ⚙️ Installation & Setup Guide

Follow these steps to get the project running on your local machine.

### **1. Prerequisites**
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v16+ recommended)
*   [Git](https://git-scm.com/)
*   A [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB).
*   An [OpenWeatherMap](https://openweathermap.org/api) API Key.

### **2. Clone the Repository**
```bash
git clone https://github.com/your-username/skyscore.git
cd skyscore
```

### **3. Backend Setup**
Navigate to the server folder and install dependencies:
```bash
cd weather-server
npm install
```

Create a `.env` file in the `weather-server` directory and add your credentials:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
WEATHER_API_KEY=your_openweathermap_api_key
```

Start the backend server:
```bash
npm run dev
# Server will start on http://localhost:5000
```

### **4. Frontend Setup**
Open a new terminal, navigate to the client folder, and install dependencies:
```bash
cd weather-client
npm install
```

Start the frontend development server:
```bash
npm run dev
# Client will start at http://localhost:5173 (usually)
```

---

## 📂 Project Structure

```bash
SkyScore/
├── weather-client/       # React Frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components (Dashboard, Navbar, Charts)
│   │   ├── context/      # AuthContext for state management
│   │   ├── pages/        # Main pages (Home, Login, Register)
│   │   └── App.jsx       # Main application entry
│   ├── package.json
│   └── vite.config.js
│
└── weather-server/       # Node.js/Express Backend
    ├── models/           # Mongoose Data Models (User)
    ├── routes/           # API Routes (Auth, Weather)
    ├── services/         # Business logic & API calls
    ├── middleware/       # Auth verification middleware
    ├── server.js         # Entry point
    └── package.json
```

---

## 🔥 Usage

1.  **Register/Login:** Create an account to access personalized features.
2.  **Dashboard:** View top-ranked cities based on the default list.
3.  **Search:** Use the search bar to find your city. The app will fetch real-time data and calculate its Comfort Score.
4.  **Analyze:** meaningful charts help you visualize weather data trends.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Currently developed by **Tharindu Nuwantha**.
