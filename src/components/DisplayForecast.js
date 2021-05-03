// Dependencies
import React from 'react';
import LoadingScreen from './LoadingScreen';
import DayView from './DayView';
import WeekView from './WeekView';

// Styles
import '../styles/DisplayForecast.css';

const DisplayForecast = ({ 
  setIsDayView,
  isDayView,
  apiLoading, 
  currentCity, 
  currentState, 
  zipState, 
  forecast 
}) => {
  // if gate stating that if the API information is loading, display LoadingScreen component
  if (apiLoading === true) {
    return <LoadingScreen />
    // else if return specified JSX set if isDayView toggle is false
  } else if (isDayView === false) {
    return (
      <main className='col-6'>
        <section className='row'>
          <section className='col-12 ml-2'>
            <div className='button-container col-12'>
              {/* Passing state down from parent in order to toggle between daily view of weather and weekly view of weather */}
              <center>
                <button 
                  className='button'
                  onClick={() => setIsDayView(true)}
                >
                  Day View
                </button>
                <button 
                  className='button'
                  onClick={() => setIsDayView(false)}
                >
                  Week View
                </button>
              </center>
              
            </div>
            <br />
            <div className='city-state-container col-12'>
              <center>{zipState ? <h4>{`${zipState}: ${currentCity}, ${currentState}`}</h4> : null}</center>
            </div>
          </section>
          <br />
          <section className='row d-flex m-auto'>
            <center>
              {zipState 
                ? (<div>
                  {forecast.slice(0, 23).map((i) => (
                    <WeekView 
                      key={i.number}
                      icon={i.icon}
                      isDaytime={i.isDaytime}
                      shortForecast={i.shortForecast}
                      detailedForecast={i.detailedForecast}
                      startTime={i.startTime}
                      name={i.name}
                      temperature={i.temperature}
                      temperatureUnit={i.temperatureUnit}
                      windSpeed={i.windSpeed}
                      windDirection={i.windDirection}
                    />
                  ))}
                </div>)
                : null
              }
            </center>
          </section>
        </section>
      </main>
    )
  };

  // default return of forecast (provided the isDayView toggle is set to true)
  return (
    <main className='col-6'>
      <section className='row'>
        <section className='col-12 ml-2'>
          <div className='button-container col-12'>
            {/* Passing state down from parent in order to toggle between daily view of weather and weekly view of weather */}
            <center>
              <button 
                className='button'
                onClick={() => setIsDayView(true)}
              >
                Day View
              </button>
              <button 
                className='button'
                onClick={() => setIsDayView(false)}
              >
                Week View
              </button>
            </center>
            
          </div>
          <br />
          <div className='city-state-container col-12'>
            <center>{zipState ? <h4>{`${zipState}: ${currentCity}, ${currentState}`}</h4> : null}</center>
          </div>
        </section>
        <br />
        <section className='row d-flex m-auto'>
          <center>
            {zipState 
              ? (<div>
                {/* only return arrays indexed between 0 and 23 */}
                {forecast.slice(0, 23).map((i) => (
                  <DayView 
                    key={i.number}
                    icon={i.icon}
                    isDaytime={i.isDaytime}
                    shortForecast={i.shortForecast}
                    startTime={i.startTime}
                    endTime={i.endTime}
                    temperature={i.temperature}
                    temperatureUnit={i.temperatureUnit}
                    windSpeed={i.windSpeed}
                    windDirection={i.windDirection}
                  />
                ))}
              </div>)
              : null
            }
          </center>
        </section>
      </section>
    </main>
  )
};

export default DisplayForecast;