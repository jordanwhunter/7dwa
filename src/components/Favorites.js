// Dependencies
import React, { useEffect, useState } from 'react';
import FavoritesList from './FavoritesList';

// Styles
import '../styles/Favorites.css';

const Favorites = ({
  zipState, 
  currentCity, 
  currentState, 
  currentLatitude,
  currentLongitude,
  setHasFavorites,
  setCurrent
}) => {
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    try {
      const storageValue = localStorage.getItem('favoritesList');
      if (!storageValue) return;
      const favorites = JSON.parse(storageValue);
      setFavoritesList(favorites);
      // const [f] = favorites; // another way
      const f = favorites[0];
      if (f) setCurrent(f);
    }
    catch {
      // console.log('Welcome to the app!');
    }
  }, [setCurrent]);

  const handleFavorite = () => {
    setHasFavorites(true);

    const favorite = {
      zip: zipState,
      city: currentCity,
      state: currentState,
      latitude: currentLatitude,
      longitude: currentLongitude
    };

    // sets return as either truthy or falsey. if truthy - boolean returns true, falsey is the oppposite
    const alreadyFavorited = Boolean(favoritesList.find(f => f.zip === favorite.zip));
    if (alreadyFavorited) return;

    // new variable to account for new state instead of mutating existing state
    const updatedFavorites = [favorite, ...favoritesList];
    setFavoritesList(updatedFavorites);
    setCurrent(favorite);

    // Every time the button is clicked, local storage is updated with most current favorites
    localStorage.setItem('favoritesList', JSON.stringify(updatedFavorites));
  };

  return (
    <aside className='col-3'>
      <center>
        <section className='favorites-column'>
          <h4 className='favorites-h4'><u>Favorites</u></h4>
          <button onClick={() => handleFavorite()}>Favorite ⭐️</button>
          {favoritesList.length > 0
            ? (<div>
                {/* mapping favoriteLists array to render clickable locations */}
                {favoritesList.map(f => (
                  <FavoritesList
                    favorite={f}
                    setCurrent={setCurrent}
                  />
                ))}
              </div>)
            : null}
        </section>
      </center>
    </aside>
    );
};

export default Favorites;

    