import React, { useEffect, useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import '../../App.css'
import '../css/mapsautocomplete.css'



export default function MapsLocationSearch() {
  const [address, setAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const randomInt = Math.floor(Math.random() * 10000);
    

  return (
    <div className='page'>
    <PlacesAutocomplete
      value={address}
      onChange={(e) => {setAddress(e); setSelectedAddress('');}}
      onSelect={(e) => {setAddress(e); setSelectedAddress(e)}}
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
