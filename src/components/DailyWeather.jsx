import classes from './DailyWeather.module.css'

const DailyWeather = (props) => {
   const {items} = props

   return (
      <div className={classes.container}>
         <img src={items.day.condition.icon} alt="" />
         <div>
            <p>{items.day.condition.text}</p> /
            <h4>{items.day.avgtemp_c}℃</h4>
         </div>
      </div>
   )
}

export default DailyWeather