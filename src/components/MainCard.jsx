import { useState, useEffect, useRef } from "react";
import { icons } from '../data/icons.js'


export default function MainCard() {
  //state variables
  const [weatherData, setWeatherData] = useState(false);
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
        icon: icon
      });
      
    } catch (error) {
      setWeatherData(false);
    }    
  }
  useEffect(() => {
    getWeatherByCity('Chicago')
  }, []);

  //form subit func - call api and pass user input as location - clear form
  function handleSubmit(e) {
    e.preventDefault();
    getWeatherByCity(inputRef.current.value)
    inputRef.current.value = '';
  }  

  return (
    <>
    {weatherData ? 
    <div className='flex flex-col gap-1 justify-center h-screen bg-cyan-900'>
      <div className={`${isDaytime ? 'bg-cyan-600' : 'bg-slate-800'} place-self-center flex flex-col rounded-md text-center px-5 min-w-3xs`}>
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