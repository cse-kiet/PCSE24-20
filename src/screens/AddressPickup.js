import {View, Text} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const AddressPickup = ({placeholder, fetchCord}) => {
  const key = 'AIzaSyA3kKnWP33jLRslTcL6Ei7T61eCNlvSU6A';
  const fetchPlaceDetails = async placeId => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${key}`,
      );
      const data = await response.json();
      if (
        data &&
        data.result &&
        data.result.geometry &&
        data.result.geometry.location
      ) {
        return ({lat, lng} = data.result.geometry.location);

        // If you want to call fetchCord with latitude and longitude
        // fetchCord(lat, lng);
      } else {
        console.error('Invalid response or structure:', data);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <View style={{marginTop: 23}}>
      <GooglePlacesAutocomplete
        styles={{description: {color: 'black'}}}
        placeholder={placeholder}
        textInputProps={{
          placeholderTextColor: 'black',
          color: 'black',
          returnKeyType: 'search',
        }}
        onPress={async (data, details) => {
          if (details && details.place_id) {
            const result = await fetchPlaceDetails(details.place_id);

            fetchCord(result.lat, result.lng);
          } else {
            console.error('Invalid details object or structure:', details);
          }
        }}
        query={{
          key: 'AIzaSyA3kKnWP33jLRslTcL6Ei7T61eCNlvSU6A',
          language: 'en',
        }}
      />
    </View>
  );
};

export default AddressPickup;
