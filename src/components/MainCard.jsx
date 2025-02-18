import { useState, useEffect, useRef } from "react";
import sunny from '../assets/clear_day.png'
import moon from '../assets/clear_night.png'
import cloudy from '../assets/cloudy.png'
import wind from '../assets/wind.png'
import partlyCloudyDay from '../assets/partly_cloudy_day.png'
import partlyCloudyNight from '../assets/partly_cloudy_night.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import storm from '../assets/storm.png'


export default function MainCard() {

  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();

  const icons = {
    "01d": sunny,
    "01n": moon,
    "02d": partlyCloudyDay,
    "02n": partlyCloudyNight,
    "03d": partlyCloudyDay,
    "03n": partlyCloudyNight,
    "04d": cloudy,
    "04n": cloudy,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": storm,
    "11n": storm,
    "13d": snow,
    "13n": snow
  }

  const getWeatherByCity = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = icons[data.weather[0].icon] || sunny;
      setWeatherData({
        city: data.name,
        temp: Math.floor(data.main.temp),
        conditions: data.weather[0].description,
        icon: icon
      });
      
    } catch (error) {
      setWeatherData(false);
    }    
  }

  function handleSubmit(e) {
    e.preventDefault();
    getWeatherByCity(inputRef.current.value)
    inputRef.current.value = '';
  }

  useEffect(() => {
    getWeatherByCity('Chicago')
  }, []);

  return (
    <>
    {weatherData ? 
    <>
      <div className="bg-cyan-600 place-self-center flex flex-col rounded-md text-center px-5 min-w-3xs">
        <h1 className="pt-5 text-5xl">{weatherData.city}</h1>
        <img className=" pt-3 place-self-center" src={weatherData.icon} alt="logo" style={{width: '50px'}} />
        <h3 className="pt-3 text-xl">{weatherData.conditions}</h3>
        <h3 className="py-3 pb-5 text-xl">{`${weatherData.temp}F`}</h3>
      </div>
      <div className="place-self-center">
        <label className="input bg-cyan-600">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g>
          </svg>
          <form onSubmit={handleSubmit}>
            <input ref={inputRef} type="text" required placeholder="Enter a Location" />
          </form>
        </label>
      </div>
    </> :
    <>
      <div className="place-self-center">
        <label className="input bg-cyan-600">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g>
          </svg>
          <form onSubmit={handleSubmit}>
            <input ref={inputRef} type="text" required placeholder="Enter a Location" />
          </form>
        </label>
        <h3 className="text-red-800 text-right">enter a valid location</h3>
      </div>
    </>}
      
  </>
  )
}