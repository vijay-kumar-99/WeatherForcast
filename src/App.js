import React, { useState } from 'react';

const api = {
  key: "be1a993766d6caa8b7bc311ea504c676",
  base : "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const search = evt => {
    if(evt.key==="Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result=>{
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  const dateBuilder = (d) => {
    let month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let days=["Monday","Tueday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let currentmonth = month[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${currentmonth} ${year}`
  }
  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.weather[0].main==="Rain") ? "Apprain" : 
      ((weather.weather[0].map==="Clouds") ? "Appcloud" : 
      ((weather.weather[0].map==="Clear") ? "Appclearsky" :
      ((weather.main.temp > 27) ? "Appsunny" : 
      ((weather.main.temp < 0) ? "Appsnow" : 
      "Appclearsky" )))))
       : 'Appclearsky' }> 
      <main>
        <div className="search">
            <input className= "search-bar" 
            type="text"
            placeholder="search by region" 
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="Locationbar">
            <div className="location">{weather.name},{weather.sys.country}</div>
            <div className="date">
              {dateBuilder(new Date())}
            </div>
          </div>
          <div className="weatherbar">
            <div className="degrees">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
         ) : ('')}
      </main>
    </div>
  );
}

export default App;
