import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AddressPickup from './AddressPickup';
import {ScrollView} from 'react-native-gesture-handler';

const ChooseLocation = () => {
  const [state, setState] = useState({
    pick: {},
    drop: {},
  });
  const {pick, drop} = state;
  const fetchCord = (lat, long) => {
    console.log(lat);
    console.log(long);
  };
  return (
    <View style={{flex: 1, padding: 24}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <AddressPickup
          placeholder="Enter pickup Location"
          fetchCord={fetchCord}
        />
        <AddressPickup
          placeholder="Enter destination Location"
          fetchCord={fetchCord}
        />
      </ScrollView>
    </View>
  );
};

export default ChooseLocation;
