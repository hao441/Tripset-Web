import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

import '../../App.css'
import '../css/mapsautocomplete.css'

export default function MapsLocationSearch() {
  const [address, setAddress] = useState('');
    
  return (
    <div className='page'>
    <PlacesAutocomplete
      id={'mapsInput'}
      value={address}
      onChange={(e) => {setAddress(e)}}
      onSelect={(e) => {setAddress(e)}}
      shouldFetchSuggestions={true}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div className='container'>
          <input id='mapsInput' className='input' {...getInputProps({type: 'search', placeholder: 'Search for a location'})} required />
          <div className='parent-buttons'>
            <div className='buttons-container'>
              {suggestions.map(suggestion => (
                <button key={suggestion.index} className='button' {...getSuggestionItemProps(suggestion)}>
                  {suggestion.description}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </PlacesAutocomplete>
    </div>
  );
}
