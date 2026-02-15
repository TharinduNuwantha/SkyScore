import React, { useEffect, useState } from 'react'
import "./Dashboard.css";

const Dashboard = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/weather")
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading)
    return (
      <div className="loading">
        <h2>Loading Weather Dashboard...</h2>
      </div>
    );

  return (
    <div className="dashboard-container">
      {cities.map((city) => (
        <div key={city.name} className="city-card">
          <div className="rank-badge">{city.rank}</div>
          <h2 className="city-name">{city.name}</h2>
          <p className="weather">
            <strong>Weather:</strong> {city.weatherDescription}
          </p>
          <p className="temperature">
            <strong>Temperature:</strong> {city.temperature} °C
          </p>
          <p className="comfort-score">
            <strong>Comfort Score:</strong>{" "}
            <span
              className={`score ${
                city.comfortScore >= 80
                  ? "high"
                  : city.comfortScore >= 50
                  ? "medium"
                  : "low"
              }`}
            >
              {city.comfortScore}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard
