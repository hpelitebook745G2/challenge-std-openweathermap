import React from 'react';
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { getWeatherIcon, convertToCelsius } from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#E7E7E5',
  },
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  txtTime: {
    flex: 0.1,
    fontSize: 13,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  iconContainer: {
    flex: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWeather: {
    width: 30,
    height: 30,
  },
  txtTemp: {
    fontSize: 25,
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  txtFeelsLike: {
    flex: 0.4,
    textAlign: 'center',
    fontSize: 13,
  },
  iconDroplet: {
    width: 20,
    height: 20,
  },
  txtPrecipitation: {
    paddingHorizontal: 5,
  },
});

const Hourly = ({ data }) => {
  let hourlyArray = data.hourly;
  hourlyArray = hourlyArray?.filter(item => dayjs().isSame(dayjs.unix(item.dt), 'day'));

  return (
    <View style={styles.container}>
      <FlatList
        data={hourlyArray}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.txtTime}>{dayjs.unix(item.dt).format('HH')}</Text>
            <View style={styles.iconContainer}>
              <Image
                style={styles.iconWeather}
                source={getWeatherIcon(item?.weather[0]?.description)}
              />
              <Text style={styles.txtTemp}>{convertToCelsius(item?.temp)}</Text>
            </View>
            <Text style={styles.txtFeelsLike}>Feels like {convertToCelsius(item?.feels_like)}</Text>
            <View style={{ flex: 0.25, flexDirection: 'row' }}>
              <Image style={styles.iconDroplet} source={require('../assets/icons/droplet.png')} />
              <Text style={styles.txtPrecipitation}>{item.pop}%</Text>
            </View>
          </View>
        )}
        style={{}}
      />
    </View>
  );
};

Hourly.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Hourly;
