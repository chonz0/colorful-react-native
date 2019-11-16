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
  const [color, setColor] = useState('#e0e0e0');
  const [connectionCount, setConnectionCount] = useState(0);
  const [lastMessage, setLastMessage] = useState('');

  useEffect(() => {
    ws = new ReconnectingWebSocket('ws://localhost:8999');
    // ws = new ReconnectingWebSocket('ws://localhost:5000');
    // ws = new WebSocket('ws://colorful-server.herokuapp.com');
    // ws = new ReconnectingWebSocket('ws://colorful-server.herokuapp.com');

    ws.onopen = () => {
      console.log('onopen');
      ws.send('hi from react native'); // send a message
    };

    ws.onmessage = (msg) => {
      // a message was received
      console.log('onmessage', msg, msg.data);
      if (msg && msg.data) {
        const { type, payload } = JSON.parse(msg.data);

        switch(type) {
          case 'color':
            setColor(payload);
            break;

          case 'status':
            setLastMessage(payload);
            break;

          case 'connection_count':
            setConnectionCount(payload);
            break;

          default:
            break;
        }
      }
    };

    ws.onerror = (e) => console.log('onerror', e.message);
    ws.onclose = (e) => console.log('onclose', e.code, e.reason);
  }, []);

  const getColor = () => {
    console.log('getColor');
    ws.send('getColor');
  }

  const styles = StyleSheet.create({
    loading: {
      alignItems: 'center',
      alignContent: 'space-between',
      justifyContent: 'center',
      flex: 1
    },
    touchable: {
      alignItems: 'center',
      alignContent: 'space-between',
      justifyContent: 'center',
      flex: 1
    },
    // body: {
    //   backgroundColor: color,
    // },
  });

  return (
    <>
      <SafeAreaView style={{backgroundColor: color, flex: 1}}>
          <View style={{flex: 1}}>
            <View style={{paddingVertical: 5, paddingHorizontal: 10, marginHorizontal: 10, marginTop: 10, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 20, }}>
              <Text style={{alignSelf: 'center', color: 'rgba(0, 0, 0, 0.5)'}}>{lastMessage}</Text>
            </View>
            {lastMessage === '' && <Text style={styles.loading}>Loading...</Text>}
            {
              <TouchableOpacity style={styles.touchable} onPress={getColor}>
                <Text style={{fontSize: 40}}>🎨</Text>
              </TouchableOpacity>
            }

            <View style={{flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 10, marginHorizontal: 10, marginBottom: 10, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 20, alignSelf: 'center' }}>
              <Text style={{color: 'rgba(0, 0, 0, 0.5)'}}>
                📱{connectionCount} conectados
              </Text>
              <Text style={{color: color}}>
                🖍{color}
              </Text>
            </View>
          </View>
      </SafeAreaView>
    </>
  );
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
};

export default codePush(codePushOptions)(App);
