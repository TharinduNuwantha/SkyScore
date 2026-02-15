import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [citys,setCitys] = useState([]);
    const [loarding,setLoarding] = useState(true);

useEffect(()=>{
    fetch("http://localhost:5000/api/weather")
    .then((res)=>res.json())
    .then((data) =>{
        setCitys(data);
        setLoarding(false);
    })
    .catch((err)=>console.log(err));
});

  if (loarding) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      {citys.map((city) => (
        <div key={city.name} className="city-card">
          <h2>{city.rank}. {city.name}</h2>
          <p>Weather: {city.weatherDescription}</p>
          <p>Temperature: {city.temperature} °C</p>
          <p>Comfort Score: {city.comfortScore}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard
