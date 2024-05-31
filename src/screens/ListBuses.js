import {View, Text} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ListBuses = ({navigation}) => {
  const [buses, setBuses] = useState([]);
  useEffect(() => {
    fetch('http://10.0.2.2:3000/add/getBus')
      .then(response => response.json())
      .then(data => setBuses(data.bus))
      .catch(err => console.log(err));
  }, []);

  return (
    <View>
      {buses.map((buses, index) => (
        <View
          style={{
            marginTop: 30,
            backgroundColor: 'white',
            width: 300,
            alignSelf: 'center',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={{color: 'black', fontWeight: 900, padding: 20}}>
            {buses.bus_name} ({buses.source} --- {buses.destination})
          </Text>

          <Text style={{color: 'black', fontWeight: 600, padding: 20}}>
            Bus Id {buses.bus_id}
          </Text>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              height: 40,
              borderRadius: 10,
              backgroundColor: 'black',
              marginTop: 10,
              marginBottom: 20,
            }}
            onPress={() => {
              navigation.navigate('BusInfo', {bus: buses._id});
            }}>
            <Text style={{color: 'white'}}>Fetch Bus Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ListBuses;
