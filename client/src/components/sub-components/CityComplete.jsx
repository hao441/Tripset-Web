import React, { useState } from 'react';
import cities from '../../data/listOfCities2.json';
import '../css/citycomplete.css';

const CityComplete = () => {

  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(true)

  const citiesNoDuplicates = [...new Set(cities)]

  const filteredCities = citiesNoDuplicates.filter(city =>
    city.toLowerCase().startsWith(inputValue.toLowerCase())
  ).slice(0, 5); // slice the array to get the top 10 matches

  const cityLookUp = () => {
    if (inputValue !== '') return (
      <div className='parent-buttons'>
        <div className="buttons-container">
            {filteredCities.map((city, index) => (
            <button key={index.toString()} onClick={(e) => {e.preventDefault(); setInputValue(city); return setShowList(false)}} hidden={!showList} className="button">
                {city}
            </button>
            ))}
        </div>
      </div>
    )};

  return (
      <div className="container">
        <input
          id={'cityInput'}
          autoComplete='off'
          type="search"
          value={inputValue}
          onChange={((e) => {setShowList(true); return setInputValue(e.target.value)})}
          className="input"
          placeholder='      Home City'
        />
        {cityLookUp()}
      </div>
    
  );
};

export default CityComplete;
