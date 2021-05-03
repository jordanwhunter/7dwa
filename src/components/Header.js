// Dependencies
import React from 'react';

// Styles
import '../styles/Header.css';

// Create and export Header component
const Header = () => {
  return (
    <header 
      className='jumbotron jumbotron-fluid'>
      <section className='container'>
        <h1 className='display-5 text-center'>
          Weather Dashboard
        </h1>
      </section>
    </header>
  )
};

export default Header;
