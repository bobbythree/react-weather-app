import { useState, useEffect, useRef } from "react";
import { icons } from '../data/icons.js'


export default function MainCard() {
  //state variables
  const [weatherData, setWeatherData] = useState(null);
  const [isDaytime, setIsDaytime] = useState();
  const inputRef = useRef();


  //api call
  const getWeatherByCity = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = icons[data.weather[0].icon] || sunny;

      //get the time of day
      const weatherCode = data.weather[0].icon;
      const lastChar = weatherCode[weatherCode.length - 1];
      setIsDaytime(lastChar === 'd' ? true : false);

      setWeatherData({
        city: data.name,
        temp: Math.floor(data.main.temp),
        conditions: data.weather[0].description,
        icon: icon,
        weatherCode: weatherCode
      });
      
    } catch (error) {
      setWeatherData(false);
    }    
  }
  useEffect(() => {
    getWeatherByCity('Chicago')
  }, []);

  //form submit func - call api and pass user input as location - clear form
  function handleSubmit(e) {
    e.preventDefault();
    getWeatherByCity(inputRef.current.value)
    inputRef.current.value = '';
  }

  //background image
  const getBackgroundImg = (weatherCode) => {
    if (!weatherCode) return ''; //if no code available

    switch (weatherCode) {
      case '01d': //clear day
        return 'bg-[url(./assets/sunny_bg.jpg)] bg-cover';
      case '01n': //clear night
        return 'bg-[url(./assets/stars_bg.jpg)] bg-cover';
      case '02d': //partly cloudy day
      case '03d': 
        return 'bg-[url(./assets/partly_day_bg.jpg)] bg-cover';
      case '02n': //partly cloudy night
      case '03n': 
        return 'bg-[url(./assets/partly_night_bg.jpg)] bg-cover';
      case '04d': //overcast day
        return 'bg-[url(./assets/overcast_day_bg.jpg)] bg-cover';
      case '04n': //overcast night
        return 'bg-[url(./assets/overcast_night_bg.jpg)] bg-cover';
      case '09d': //rain day
      case '10d':
        return 'bg-[url(./assets/rain_day_bg.jpg)] bg-cover';
      case '09n': //rain night
      case '10n':
        return 'bg-[url(./assets/rain_night_bg.jpg)] bg-cover';
      case '11d': // thunderstorm
      case '11n':
        return 'bg-[url(./assets/storm_bg.jpg)] bg-cover';
      case '13d': // snow day
        return 'bg-[url(./assets/snow_day_bg.jpg)] bg-cover';
      case '13n': // snow day
        return 'bg-[url(./assets/snow_night_bg.jpg)] bg-cover';
    }
  }

  return (
    <>
    {weatherData ? 
    <div className={`${getBackgroundImg(weatherData.weatherCode)} flex flex-col justify-center gap-1 h-screen`}>
      <div className={`${isDaytime ? 'bg-sky-600' : 'bg-black'} place-self-center flex flex-col rounded-md text-center px-5 min-w-3xs`}>
        <h1 className="pt-5 text-5xl">{weatherData.city}</h1>
        <img className=" pt-3 place-self-center" src={weatherData.icon} alt="logo" style={{width: '50px'}} />
        <h3 className="pt-3 text-xl">{weatherData.conditions}</h3>
        <h3 className="py-3 pb-5 text-xl">{`${weatherData.temp}F`}</h3>
      </div>
      <div className="place-self-center">
        <label className={`${isDaytime ? 'bg-sky-600' : 'bg-black'} input`}>
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g>
          </svg>
          <form onSubmit={handleSubmit}>
            <input ref={inputRef} type="text" required placeholder="Enter a Location" />
          </form>
        </label>
      </div>
    </div> :
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