import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { loadColorSuccess } from './actions/color';
import store from './store';
import { useSelector, useDispatch } from 'react-redux';

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
  const [connectionCount, setConnectionCount] = useState(0);
  const [lastMessage, setLastMessage] = useState('');

  const dispatch = useDispatch();
  const color = useSelector(store => store.color.data);

  useEffect(() => {
    // ws = new ReconnectingWebSocket('ws://localhost:8999');
    // ws = new ReconnectingWebSocket('ws://localhost:5000');
    // ws = new WebSocket('ws://colorful-server.herokuapp.com');
    ws = new ReconnectingWebSocket('ws://colorful-server.herokuapp.com');

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
            dispatch(loadColorSuccess(payload));
            // setColor(payload);
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
    bubbleTop: {
        paddingVertical: 5, paddingHorizontal: 10, marginHorizontal: 10, marginTop: 10, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 20,
    },
    bubbleBottom: {
      flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 10, marginHorizontal: 10, marginBottom: 10, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 20, alignSelf: 'center'
    }
  });

  return (
      <SafeAreaView style={{backgroundColor: color, flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.bubbleTop}>
            <Text style={{alignSelf: 'center', color: 'rgba(0, 0, 0, 0.5)'}}>{lastMessage}</Text>
          </View>
          {lastMessage === '' && <Text style={styles.loading}>Loading...</Text>}
          {
            <TouchableOpacity style={styles.touchable} onPress={getColor}>
              <Text style={{fontSize: 40}}>🎨</Text>
            </TouchableOpacity>
          }

          <View style={styles.bubbleBottom}>
            <Text style={{color: 'rgba(0, 0, 0, 0.5)'}}>
              🔌{connectionCount} conectados
            </Text>
            <Text style={{color: color}}>
              🖍{color}
            </Text>
          </View>
        </View>
      </SafeAreaView>
  );
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
};

export default codePush(codePushOptions)(() => <Provider store={store}><App /></Provider>);
