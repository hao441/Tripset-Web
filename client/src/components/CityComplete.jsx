import React, { useState, createContext } from 'react';
import cities from '../listOfCities2.json';
import './css/citycomplete.css';
import {MyContext} from './City';

export const ValueContext = React.createContext();

const CityComplete = () => {

  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(true)

  const handleChange = event => {
    setShowList(true)
    setInputValue(event.target.value);
  };

  const citiesNoDuplicates = [...new Set(cities)]

  const filteredCities = citiesNoDuplicates.filter(city =>
    city.toLowerCase().startsWith(inputValue.toLowerCase())
  ).slice(0, 5); // slice the array to get the top 10 matches

  const cityLookUp = () => {
    if (inputValue !== '') return (
      <div className='parent-buttons'>
        <div className="buttons-container">
            {filteredCities.map((city, index) => (
            <button key={index.toString()} onClick={() => {setInputValue(city); return setShowList(false)}} hidden={!showList} className="button">
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
          onChange={handleChange}
          className="input"
          placeholder='      Home City'
        />
        {cityLookUp()}
      </div>
    
  );
};

export default CityComplete;
