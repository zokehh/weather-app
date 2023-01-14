import classes from './HourlyWeather.module.css'

const HourlyWeather = (props) => {
   const {items} = props

   const time = items.time
   const convertedTime = time.slice(11)

   return (
      <div className={classes.container}>
         <p>{convertedTime}</p>
         <img src={items.condition.icon} alt="" />
         <p>{items.temp_c}℃</p>
      </div>
   )
}

export default HourlyWeather