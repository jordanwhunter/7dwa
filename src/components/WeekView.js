// Dependencies
import React from 'react';

const WeekView = ({
  icon, 
  isDaytime,
  detailedForecast,
  name, 
  temperature,
  temperatureUnit,
  windSpeed,
  windDirection
}) => {
  return (
    <section className='day-card col-12'>
      <p className='day-card-header'>{name}</p>
      <div className='day-card-body'>
        <div className='icon-temperature-container'>
          <img 
            src={icon}
            alt='icon'
          />
            <div>
              <p className='short-forecast'>{`Temperature: ${temperature}º${temperatureUnit}`}</p>
              <p className='detailed-forecast'>{detailedForecast}</p>
              <p className='temperature-wind'>
                {`Wind Speed: ${windSpeed} ${windDirection}`}
              </p>
              <p className='daylight-hours'>
                {`Day Time: ${isDaytime}`}
              </p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default WeekView;
