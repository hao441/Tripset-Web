import React, { useEffect, useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


import './css/newComponent.css'



export default function MapsLocationSearch() {
  const [address, setAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  useEffect(() => {
    if (selectedAddress !== '') {
      setTimeout(() => {
        geocodeByAddress(selectedAddress)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
            setLat(lat);
            setLng(lng);
        });
      }, 1000)
    }
  })

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
        <div className='my-container'>
          <input className='my-input' {...getInputProps({ placeholder: 'Search for a location' })} />
          <div className='my-suggestions'>
            {suggestions.map(suggestion => (
              <div key={suggestion.index} className='my-suggestion' {...getSuggestionItemProps(suggestion)}>
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
    </div>
  );
}
