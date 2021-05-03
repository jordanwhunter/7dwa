// Dependencies
import React from 'react';
// import { Button } from 'react-bootstrap';
// import saveIcon from '../assets/save-icon.png';

// Styles
import '../styles/ZipSearch.css';

const ZipSearch = ({ onChange, id, previousZip }) => {
  
  // Input data starts here. User inputs zip code. Zip code is lifted to parent and placed into state. State is then passed down to children components for rendering information
  return (
    <aside className='col-3'>
      <section className='search-column pl-4'>
        <h4><u>Zip Code</u></h4>
        <form className='input-group mb-3'>
          <input 
            type='text'
            className='form-control'
            id={id}
            placeholder='Numbers Only'
            required
            aria-label='Recipient Zip Code'
            aria-describedby='button-addon2'
            onChange={(event) => onChange(event.target.value)}
          />
        </form>
        <h4><u>Most Recent</u></h4>
        {/* Display most recent zip search from local storage - use props*/}
        <p>{previousZip}</p>
      </section>
    </aside>
  )
};

export default ZipSearch;