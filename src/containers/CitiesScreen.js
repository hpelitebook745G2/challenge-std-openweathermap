import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';

import HttpService from '../services/HttpService';

const styles = StyleSheet.create({
  itemCity: {
    textAlign: 'center',
    alignItems: 'center',
  },
});

const CitiesScreen = () => {
  const [citiesList, setCitiesList] = useState([]);
  const getData = async () => {
    const payload = {
      lat: 1.29027,
      lon: 103.851959,
      cnt: 15,
      APPID: '22afed12dc68443a47372453af301fb5',
    };

    try {
      const response = await HttpService.get('data/2.5/find', payload).then(resp => resp);
      setCitiesList(response.list);
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log('citiesList: ', citiesList);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={citiesList}
        renderItem={({ item }) => {
          console.log('item: ', item);
          return <Text style={styles.itemCity}>{item.name}</Text>;
        }}
        style={{}}
      />
    </View>
  );
};

export default CitiesScreen;
