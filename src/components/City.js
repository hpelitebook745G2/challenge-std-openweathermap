import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types';

import { getWeatherIcon, convertToCelsius } from '../utils';

const styles = StyleSheet.create({
  cityContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 15,
  },
  itemCity: {
    alignItems: 'center',
    paddingVertical: 15,
    fontSize: 20,
    color: 'black',
    flex: 0.6,
    paddingLeft: 20,
  },
  rightContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconWeather: {
    width: 45,
    height: 45,
  },
  txtTemp: {
    paddingHorizontal: 10,
    fontSize: 20,
  },
});

const City = ({ item, navigation, coords }) => (
  <TouchableOpacity
    style={[styles.cityContainer, { backgroundColor: 'white' }]}
    onPress={
      () =>
        navigation.navigate('CityDetailScreen', {
          city: item,
          coords,
        })
      // eslint-disable-next-line prettier/prettier
    }
  >
    <Text style={styles.itemCity}>{item.name}</Text>
    <View style={styles.rightContainer}>
      <Image style={styles.iconWeather} source={getWeatherIcon(item?.weather[0]?.description)} />
      <Text style={styles.txtTemp}>{convertToCelsius(item?.main?.temp)}</Text>
    </View>
  </TouchableOpacity>
);

City.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  coords: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default City;
