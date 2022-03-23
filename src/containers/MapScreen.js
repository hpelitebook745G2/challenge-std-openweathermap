import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

import HttpService from '../services/HttpService';

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

const App = () => {
  const getData = async () => {
    const response = await HttpService.get('weather', { key: 'd6589540' }).then(resp => resp);
    console.log('Weather data: ', response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return <Text style={styles.highlight}>App.js</Text>;
};

export default App;
