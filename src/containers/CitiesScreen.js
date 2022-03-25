import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import City from '../components/City';
import HttpService from '../services/HttpService';
import apis from '../constants/apis';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtNoResults: {
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
  },
});

const CitiesScreen = ({ navigation, route }) => {
  const { lat, lon } = route.params;
  const [citiesList, setCitiesList] = useState([]);
  const getData = async () => {
    const payload = {
      lat,
      lon,
      cnt: 15,
      APPID: apis.apiKey,
    };

    try {
      const response = await HttpService.get(apis.current, payload).then(resp => resp);
      setCitiesList(response.list);
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {citiesList.length > 0 ? (
        <FlatList
          data={citiesList}
          renderItem={({ item, index }) => (
            <City item={item} navigation={navigation} coords={{ lat, lon }} />
          )}
          style={{ backgroundColor: '#E7E7E5' }}
        />
      ) : (
        <Text style={styles.txtNoResults}>No results found, please search again!</Text>
      )}
    </View>
  );
};

CitiesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CitiesScreen;
