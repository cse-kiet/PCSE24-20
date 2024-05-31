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

const App = () => {
  const [data, setData] = useState({
    pick: {
      latitude: 30.7046,
      longitude: 76.7179,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    drop: {
      latitude: 30.7333,
      longitude: 76.7794,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  const {pick, drop} = data;
  const GOOGLE_API = 'AIzaSyA3kKnWP33jLRslTcL6Ei7T61eCNlvSU6A';
  const mapRef = useRef();
  return (
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
  );
};
export default App;
