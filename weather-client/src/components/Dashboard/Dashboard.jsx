import React, { useEffect, useState } from 'react'
import "./Dashboard.css";
import ComfortChart from "./ComfortChart";
import TemperatureLineChart from './TemperatureLineChart';
import toast from "react-hot-toast";


const Dashboard = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const CACHE_KEY = "weatherData";
  const CACHE_TIME = 10 * 60 * 1000;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TIME) {
        setCities(data);
        setLoading(false);
        return;
      }
    }

    //if no cache
    fetch("http://localhost:5000/api/weather")
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setLoading(false);
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading)
    return (
      <div className="loading">
        <h2>Loading Weather Dashboard...</h2>
      </div>
    );


  //search function
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    //cheack local data
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TIME) {
        // console.log(data);
        const dataFromLocale = data.find((city) => city.name.toLowerCase() === searchTerm.toLowerCase());
        if (dataFromLocale) {
          setCities([dataFromLocale]);
          return;
        }
      }
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/weather/search?city=${encodeURIComponent(searchTerm)}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setCities([data]);
    } catch (err) {
      toast.error(err.message);
    }
  }

  const handleReset = () => {
    setSearchTerm("");
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data } = JSON.parse(cached);
      setCities(data);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="search-section">
        <div className="search-wrapper">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search city..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-actions">
              <button type="submit" className="search-btn">
                Search
              </button>
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="reset-btn"
                >
                  Back
                </button>
              )}
            </div>
          </form>
        </div>
      </div>


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
              className={`score ${city.comfortScore >= 80
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

      {/* grapch part  */}
      <div className="charts-section">
        <ComfortChart data={cities} />

        {/* Line chart */}
        <TemperatureLineChart data={cities} />
      </div>
    </div>

  );
}

export default Dashboard
