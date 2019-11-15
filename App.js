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

import codePush from 'react-native-code-push';
import ReconnectingWebSocket from 'react-native-reconnecting-websocket';

let ws;

const App = () => {
  const [color, setColor] = useState(null);
  const [lastMessage, setLastMessage] = useState('');

  useEffect(() => {
    // ws = new WebSocket('ws://localhost:8999');
    // ws = new WebSocket('ws://localhost:5000');
    // ws = new WebSocket('ws://colorful-server.herokuapp.com');
    ws = new ReconnectingWebSocket('ws://colorful-server.herokuapp.com');

    ws.onopen = () => {
      // connection opened
      console.log('onopen');
      ws.send('hi from react native'); // send a message
    };

    ws.onmessage = (e) => {
      // a message was received
      console.log('onmessage', e, e.data);
      if (e && e.data) {
        setLastMessage(e.data);
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
          <View style={{flex: 1}}>
            {color === null && <Text style={{alignItems: 'center', alignContent: 'space-between', alignItems: 'center', justifyContent: 'center', flex: 1}}>Loading...</Text>}
            {
              color !== null &&
              <TouchableOpacity style={{alignItems: 'center', alignContent: 'space-between', alignItems: 'center', justifyContent: 'center', flex: 1}} onPress={getColor}>
                <Text style={{fontSize: 40}}>🎨</Text>
              </TouchableOpacity>
            }
            <Text style={{alignSelf: 'flex-end', color: '#00f'}}>{lastMessage}</Text>
          </View>
      </SafeAreaView>
    </>
  );
};

// const styles = StyleSheet.create({
//   body: {
//     backgroundColor: color,
//   },
// });

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START
};

export default codePush(codePushOptions)(App);
