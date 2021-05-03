import React from 'react';

const FavoritesList = ({ favorite, setCurrent }) => {
  const { zip, city, state } = favorite;

  // onClick event set to make favorite cities fire off an updated API call for most recent weather
  return (
    <center>
      <button onClick={() => setCurrent(favorite)}>{`${zip} - ${city}, ${state}`}</button>
    </center>
  )
}

export default FavoritesList;