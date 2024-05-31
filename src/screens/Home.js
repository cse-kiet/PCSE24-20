import React, {useState, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Home = ({navigation}) => {
  const [data, setData] = useState({
    pick: {
      latitude: 28.667856,
      longitude: 77.449791,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    drop: {
      latitude: 28.7041,
      longitude: 77.1025,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  const {pick, drop} = data;
  const GOOGLE_API = 'AIzaSyA3kKnWP33jLRslTcL6Ei7T61eCNlvSU6A';
  const mapRef = useRef();
  const findLocation = () => {
    navigation.navigate('Location');
  };
  const directToBusListing = () => {
    navigation.navigate('Listing');
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <MapView
          ref={mapRef}
          style={{height: '100%', width: '100%'}}
          initialRegion={pick}>
          <Marker coordinate={pick} />
          <Marker coordinate={drop} />
          <MapViewDirections
            origin={pick}
            destination={drop}
            apikey={GOOGLE_API}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100,
                },
              });
            }}
          />
        </MapView>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          padding: 30,
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: '900',
          }}>
          Where are you going ??.
        </Text>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            height: 60,
            borderRadius: 10,
            backgroundColor: 'black',
            marginTop: 20,
          }}
          onPress={findLocation}>
          <Text style={{color: 'white'}}> Choose your location</Text>
        </TouchableOpacity>

        <Text
          style={{
            color: 'black',
            fontWeight: '900',
            marginTop: 20,
          }}>
          Find buses for your journey
        </Text>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            height: 60,
            borderRadius: 10,
            backgroundColor: 'black',
            marginTop: 20,
          }}
          onPress={directToBusListing}>
          <Text style={{color: 'white', fontWeight: 900}}>Find Buses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;
