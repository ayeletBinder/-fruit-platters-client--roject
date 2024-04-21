import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function MySelectComponent({sendAddressFrom}) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    sendAddressFrom(place.value);
  };

  const GOOGLE_MAPS_API_KEY =  'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';
  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={GOOGLE_MAPS_API_KEY}
        selectProps={{
          value: selectedPlace,
          onChange: handlePlaceSelect,
          placeholder: 'Search for a place...',
          isClearable: true,
        }}
      />
     
    </div>
  );
}

export default MySelectComponent;