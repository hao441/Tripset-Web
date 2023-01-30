import React, { useState } from 'react';
import countries from '../../data/country-emoji.json';
import '../css/countrycomplete.css';

const CountryComplete = () => {

  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(true)

  const handleChange = event => {
    setShowList(true)
    setInputValue(event.target.value);
  };

  const countriesNoDuplicates = [...new Set(countries)]

  const filteredCountries = countriesNoDuplicates.filter(country =>
    country.toLowerCase().startsWith(inputValue.toLowerCase())
  ).slice(0, 5);

  const countryLookUp = () => {
    if (inputValue !== '') return (
      <div className='parent-buttons'>
        <div className="buttons-container">
            {filteredCountries.map((country, index) => (
            <button key={index.toString()} onClick={(e) => {e.preventDefault(); setInputValue(country); return setShowList(false)}} hidden={!showList} className="button">
                {country}
            </button>
            ))}
        </div>
      </div>
    )};

  return (
      <div className="container">
        <input
          id={'countryInput'}
          autoComplete='off'
          type="search"
          value={inputValue}
          onChange={handleChange}
          className="country-input"
          placeholder='      Country'
        />
        {countryLookUp()}
      </div>
    
  );
};

export default CountryComplete;
