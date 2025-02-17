import { useState, useEffect } from "react";

export default function MainCard() {

  const [weatherData, setWeatherData] = useState(false);

  const getWeatherByCity = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        city: data.name,
        temp: Math.floor(data.main.temp),
        icon: data
      });
      
    } catch (error) {
      
    }    
  }

  useEffect(() => {
    getWeatherByCity('Chicago')
  }, []);

  return (
    <div className="bg-cyan-600 place-self-center flex flex-col rounded-md text-center px-5">
      <h1 className="pt-5 text-5xl">Chicago</h1>
      <img className=" pt-3 place-self-center" src="src/assets/react.svg" alt="logo" style={{width: '50px'}} />
      <h3 className="pt-3 text-xl">sunny/clear</h3>
      <h3 className="py-3 pb-5 text-xl">65F</h3>
    </div>
  )
}
