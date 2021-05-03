// Dependencies
import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import ZipSearch from './components/ZipSearch';
import DisplayForecast from './components/DisplayForecast';
import Favorites from './components/Favorites';

// Bootstrap CDN
import 'bootstrap/dist/css/bootstrap.min.css';

// Node Package Module requirement
let zipcodes = require('zipcodes');


function App() {
  const [zipState, setZipState] = useState('');
  const [prevZip, setPrevZip] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [area, setArea] = useState({});
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [currentState, setCurrentState] = useState('');
  const [hasData, setHasData] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const [isDayView, setIsDayView] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [hasFavorites, setHasFavorites] = useState(false);

  const setCurrent = useCallback((favorite) => {
    setZipState(favorite.zip);
    setCurrentLatitude(favorite.latitude);
    setCurrentLongitude(favorite.longitude);
    setCurrentCity(favorite.city);
    setCurrentState(favorite.state);
  }, []);

  const zipInput = 'zipInput';

  useEffect(() => {
    // Ternary operators are utilized here due to unobtainable data when initial value, before first input, reads 'undefined'
    // Zip Code entered needs to be at least 5 digits long, however useEffect cannot fire off if user enters 5 digits but then deletes last number because that will crash page. Comparison operator limits zip code to 5 digits in order for zipStates npm to search input value
    const areaInfo = zipState.length === 5 ? zipcodes.lookup(zipState) : '';
    setArea(areaInfo);
    const areasLatitude = areaInfo ? areaInfo.latitude : '';
    setCurrentLatitude(areasLatitude);
    const areasLongitude = areaInfo ? areaInfo.longitude : '';
    setCurrentLongitude(areasLongitude);
    const cityName = areaInfo ? areaInfo.city : '';
    setCurrentCity(cityName);
    const stateName = areaInfo ? areaInfo.state : '';
    setCurrentState(stateName);

    // If gate for making sure that state is only set for domestic US 5-digit zip codes
    if (zipState.length === 5) {
      setHasData(true);
      setIsReady(true);

      // Nested if gate to set API URL according to what view user chooses (day view or week view)
      if (isDayView === false) {
        setApiUrl(`https://api.weather.gov/points/${currentLatitude},${currentLongitude}/forecast/`);
        
        // Function to set up API call
        const getForecast = async () => {
          setApiLoading(true);
          try {
            // continuous header restrictions hitting the API using axios.get()...defaulted to fetch() instead
            const response = await fetch(apiUrl);
            const weather = await response.json();
            setForecast(weather.properties.periods);
          } catch (error) {
            console.log(error);
          } finally {
            setApiLoading(false);
          }
        };

        getForecast();
      } else if (isDayView === true) {
        setApiUrl(`https://api.weather.gov/points/${currentLatitude},${currentLongitude}/forecast/hourly`);
        
        // Function to set up API call
        const getForecast = async () => {
          setApiLoading(true);
          try {
            const response = await fetch(apiUrl);
            const weather = await response.json();
            const { periods } = weather.properties
            setForecast(periods);
          } catch (error) {
            console.warn(error);
          } finally {
            setApiLoading(false);
          }
        };

        getForecast();
      };

    } else if (zipState.length < 5) {
      setHasData(false);
      setApiUrl('');
      setIsReady(false);
    };
  }, [zipState, currentLatitude, currentLongitude, currentCity, currentState, isDayView, apiUrl]);

  // Allows for viewing of zip code information in console once state turns true for having data
  const consoleView = () => {
    if (hasData === true) {
      console.log(`${zipState} - ${currentCity}, ${currentState}`, area);
    } else if (zipState.length < 5) {
      console.log('Please enter a 5 digit zip code');
    };
  };

  consoleView();

  // Sets most recent zip code to local storage and then sets that as state to display on page
  if (isReady === true) {
    localStorage.setItem('recentZip', zipState);
    setPrevZip(localStorage.getItem('recentZip'));
    localStorage.setItem('recentZip', prevZip);
    setIsReady(false);
  };
  
  // console.log(apiUrl);
  // console.log('Day View? ', isDayView);
  // console.log('API Returns: ', forecast);
  

  // Build display for a day's view, then build display for a week's view
  return (
    <div className='app'>
      <Header />
      <div className='row'>
        {/* Pulling input data from ZipSearch component and lifting up to parent */}
        <ZipSearch 
          onChange={(value) => setZipState(value)}
          id={zipInput} 
          previousZip={prevZip}
        />
        {/* Passing state to child in order to toggle between API calls */}
        <DisplayForecast 
          setIsDayView={setIsDayView}
          isDayView={isDayView}
          apiLoading={apiLoading}
          zipState={zipState}
          currentCity={currentCity}
          currentState={currentState}
          forecast={forecast}
        />
        {/* select and display favorites */}
        <Favorites 
          zipState={zipState}
          currentCity={currentCity}
          currentState={currentState}
          currentLatitude={currentLatitude}
          currentLongitude={currentLongitude}
          hasFavorites={hasFavorites}
          setHasFavorites={setHasFavorites}
          setCurrent={setCurrent}
        />
      </div>
    </div>
  );
};

export default App;
