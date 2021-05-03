// Dependencies
import React from 'react';
import throbber from '../assets/throbber.gif';

const LoadingScreen = () => {
  return (
    <main>
      <img 
        src={throbber}
        alt='throbber'
      />
    </main>
  )
};

export default LoadingScreen;