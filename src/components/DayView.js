// Dependencies
import React from 'react';
import moment from 'moment';

// Styles
import '../styles/DayView.css';

const DayView = ({
  icon,
  isDaytime,
  shortForecast,
  startTime,
  temperature,
  temperatureUnit,
  windSpeed,
  windDirection,
}) => {
  let newTime = moment(startTime);

  return (
    <section className='day-card col-12'>
      <p className='day-card-header'>{`${newTime._d}`}</p>
      <div className='day-card-body'>
        <div className='icon-temperature-container'>
          <img 
            src={icon}
            alt='icon'
          />
            <div>
              <p className='short-forecast'>{`Temperature: ${temperature}º${temperatureUnit}`}</p>
              <p className='temperature-wind'>
                {`${shortForecast}, Wind Speed: ${windSpeed} ${windDirection}`}
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

export default DayView;