import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Lottie from 'lottie-react-native';

const BusInfo = ({route}) => {
  console.log(route.params.bus);
  const [seats, setSeats] = useState(0);
  const [loading, setLoading] = useState(false);
  const [available, seatsAvailable] = useState(0);
  useEffect(() => {
    console.log(route.params.bus);
    fetch(`http://10.0.2.2:3000/add/spec/${route.params.bus}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setSeats(data.bus.seats);
        seatsAvailable(data.bus.seats);
      });
  }, []);

  const findSeats = () => {
    // setLoading(true);

    // fetch('http://192.168.29.89:5000/process_video')
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     setPeople(data.total_people_inside);
    //     setLoading(false);
    //   });

    setLoading(true);

    fetch('http://10.0.2.2:5000/process_video')
      .then(res => res.json())
      .then(data => {
        const totalPeopleInside = data.total_people_inside;
        // Calculate seats available
        seatsAvailable(seats - 4);
        // Update seats available in MongoDB via another API request
        fetch(`http://10.0.2.2:3000/add/update/${route.params.bus}`, {
          method: 'PUT', // or 'PATCH' depending on your backend implementation
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({seats: seats - totalPeopleInside}), // Send the updated seats value
        })
          .then(res => {
            console.log(res);
            if (!res.ok) {
              throw new Error('Failed to update seats available');
            }
            return res.json();
          })
          .then(updatedBus => {
            console.log('Seats updated successfully:', updatedBus);

            setLoading(false);
          })
          .catch(error => {
            console.error('Error updating seats:', error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  if (loading) {
    console.log('running');
    return (
      <View>
        <Lottie
          source={require('../../animation/loader.json')}
          autoPlay
          style={{width: 400, height: 400, alignSelf: 'center'}}
        />
      </View>
    );
  }
  return (
    <View>
      <Text
        style={{color: 'black', fontWeight: '700', margin: 30, fontSize: 20}}>
        Total Seats = {seats}
      </Text>
      <Text
        style={{color: 'black', fontWeight: '700', margin: 30, fontSize: 20}}>
        Total seats available {available}
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
          width: '90%',
          alignSelf: 'center',
        }}
        onPress={findSeats}>
        <Text style={{color: 'white', fontWeight: 900}}>
          Find Seats Available
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BusInfo;
