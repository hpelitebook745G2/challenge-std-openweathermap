import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';

import { getWeatherIcon, convertToCelsius } from '../utils';

const styles = StyleSheet.create({
  topContainer: {
    margin: 20,
    padding: 20,
    borderLeftColor: '#E76F51',
    borderLeftWidth: 5,
    backgroundColor: '#F5B6A7',
  },
  currentContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    margin: 20,
  },
  upperPart: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftContainer: {
    flexDirection: 'column',
    flex: 0.8,
  },
  rightContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtName: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  txtNow: {
    fontSize: 20,
  },
  txtMaxTemp: {},
  txtMinTemp: {},
  txtWeatherDesc: {
    textTransform: 'capitalize',
  },
  iconWeather: {
    width: 70,
    height: 70,
  },
  bottomContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: 'lightgrey',
  },
  txtTitle: {
    fontWeight: 'bold',
    flex: 0.4,
  },
  txtValue: {
    flex: 0.6,
    textAlign: 'right',
  },
});

const Today = ({ route }) => {
  const { city } = route.params;
  const maxTemp = city?.main?.temp_max;
  const minTemp = city?.main?.temp_min;
  const weatherDesc = city?.weather[0]?.description;

  return (
    <View style={styles.currentContainer}>
      <View style={styles.topContainer}>
        <View style={styles.upperPart}>
          <View style={styles.leftContainer}>
            <Text style={styles.txtName}>{city.name}</Text>
            <Text style={styles.txtNow}>Now {convertToCelsius(city?.main?.temp)}</Text>
            <Text style={styles.txtWeatherDesc}>{weatherDesc}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Image
              style={styles.iconWeather}
              source={getWeatherIcon(city?.weather[0]?.description)}
            />
          </View>
        </View>
        <Text style={styles.txtMaxTemp}>Maximum temperature: {convertToCelsius(maxTemp)}</Text>
        <Text style={styles.txtMinTemp}>Minimum temperature: {convertToCelsius(minTemp)}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.row}>
          <Text style={styles.txtTitle}>Location</Text>
          <Text style={styles.txtValue}>{city.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txtTitle}>Longitude</Text>
          <Text style={styles.txtValue}>{city.coord.lon}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txtTitle}>Latitude</Text>
          <Text style={styles.txtValue}>{city.coord.lat}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txtTitle}>Pressure</Text>
          <Text style={styles.txtValue}>{city.main.pressure}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txtTitle}>Humidity</Text>
          <Text style={styles.txtValue}>{city.main.humidity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txtTitle}>Wind</Text>
          <Text style={styles.txtValue}>{city.wind.speed} m/s</Text>
        </View>
      </View>
    </View>
  );
};

Today.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object]).isRequired,
  city: PropTypes.oneOfType([PropTypes.object]),
};

Today.defaultProps = {
  city: {},
};

export default Today;
