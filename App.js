import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';

let ws;

const App = () => {
  const [color, setColor] = useState('#fff');

  useEffect(() => {
    // ws = new WebSocket('ws://localhost:8999');
    // ws = new WebSocket('ws://localhost:5000');
    ws = new WebSocket('ws://colorful-server.herokuapp.com');

    ws.onopen = () => {
      // connection opened
      console.log('onopen');
      ws.send('hi from react native'); // send a message
    };

    ws.onmessage = (e) => {
      // a message was received
      console.log('onmessage', e, e.data);
      if (e && e.data) {
        setColor(e.data);
      }
    };

    ws.onerror = (e) => {
      // an error occurred
      console.log('onerror', e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log('onclose', e.code, e.reason);
    };
  }, []);

  const getColor = () => {
    console.log('getColor');
    ws.send('getColor');
  }

  return (
    <>
      <SafeAreaView style={{backgroundColor: color, flex: 1}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View>
            <TouchableOpacity style={{borderWidth: 2, alignItems: 'center', justifyContent: 'center', flex: 1, height: 300}} onPress={getColor}>
              <Text style={{fontSize: 70}}>🎨</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// const styles = StyleSheet.create({
//   body: {
//     backgroundColor: color,
//   },
// });

export default App;
