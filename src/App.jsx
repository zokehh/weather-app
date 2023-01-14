import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import DailyWeather from "./components/DailyWeather"
import HourlyWeather from "./components/HourlyWeather"

const App = () => {
   const searchQuery = useRef()
   const [countryWeather, setCountryWeather] = useState()
   const [hourlyWeather, setHourlyWeather] = useState()
   const [dailyWeather, setDailyWeather] = useState()

   useEffect(() => {
      const getData = async () => {
         const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=53b662f7ced14aada15185055231101&q=London&days=7`)
         const data = await response.json()
         setCountryWeather(data)
         setDailyWeather(data.forecast.forecastday)
         setHourlyWeather(data.forecast.forecastday[0].hour)
      }
      getData()
   },[])

   const formSubmittionHandler = async (e) => {
      e.preventDefault()
      const enteredCity = searchQuery.current.value

      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=53b662f7ced14aada15185055231101&q=${enteredCity}&days=7`)
      const data = await response.json()

      if (data.error) {
         console.log('Something went wrong!')
         return;
      }

      setCountryWeather(data)
      setDailyWeather(data.forecast.forecastday)
      setHourlyWeather(data.forecast.forecastday[0].hour)
      searchQuery.current.value = ''
   }

   return (
      <div className="container">
         <div className="topside">
            <div className="logo">
               <img src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt="" />
               <h1>Weather App</h1>
            </div>
            <form onSubmit={formSubmittionHandler} className="searchbar">
               <input ref={searchQuery} type="text" placeholder="Enter city name!" />
               <span className="material-icons">search</span>
               <button>Search</button>
            </form>
         </div>
         <div className="currentWeather">
            {countryWeather && 
            <div>
               <div className="header">
                  <img src={countryWeather.current.condition.icon} alt="" />
                  <h4>{countryWeather.location.country}, {countryWeather.location.name}</h4>
               </div>
               <div className='dailyContainer'>
                  <div className="main">
                     <h4>{countryWeather.current.condition.text}</h4>
                     <p><span className="bold">Local Time:</span> {countryWeather.location.localtime}</p>
                     <p><span className="bold">Temperature:</span> {countryWeather.current.temp_c}℃</p>
                     <p><span className="bold">Perceptible Temperature:</span> {countryWeather.current.feelslike_c}℃</p>
                     <p><span className="bold">Humidity:</span> {countryWeather.current.humidity}%</p>
                     <p><span className="bold">Wind:</span> {countryWeather.current.wind_kph} km/h</p>
                     <p><span className="bold">Pressure:</span> {countryWeather.current.pressure_mb} hPa</p>
                  </div>
                  <div className="daily">
                     {hourlyWeather.map(item => <HourlyWeather key={Math.random()} items={item} />)}
                  </div>
               </div>
            </div>
            }
         </div>
         {countryWeather && <div className="dailyWeather">
            <h1>Daily Weather</h1>
            {dailyWeather.map(item => <DailyWeather key={Math.random()} items={item} />)}
         </div>}
      </div>
   )
}

export default App