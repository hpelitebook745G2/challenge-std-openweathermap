import React from 'react';
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { getWeatherIcon, convertToCelsius } from '../utils';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: colors.backgroundGrey,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  txtDay: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txtDate: {
    textAlign: 'center',
  },
  firstContainer: {
    flexDirection: 'column',
    flex: 0.2,
  },
  iconContainer: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWeather: {
    width: 30,
    height: 30,
  },
  txtTempMax: {
    paddingLeft: 20,
    fontSize: 25,
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  txtTempMin: {
    textAlign: 'center',
    fontSize: 15,
  },
  iconDroplet: {
    width: 20,
    height: 20,
  },
  txtPrecipitation: {
    paddingHorizontal: 5,
    alignItems: 'center',
    textAlign: 'center',
  },
});

const Daily = ({ data }) => (
  <View style={styles.container}>
    <FlatList
      data={data?.daily}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <View style={styles.firstContainer}>
            <Text style={styles.txtDay}>{dayjs.unix(item.dt).format('ddd').toUpperCase()}</Text>
            <Text style={styles.txtDate}>{dayjs.unix(item.dt).format('DD/MM')}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image
              style={styles.iconWeather}
              source={getWeatherIcon(item?.weather[0]?.description)}
            />
            <Text style={styles.txtTempMax}>{convertToCelsius(item?.temp?.max)}</Text>
            <Text style={styles.txtTempMin}>/{convertToCelsius(item?.temp?.min)}</Text>
          </View>
          <View style={{ flex: 0.2, flexDirection: 'row' }}>
            <Image style={styles.iconDroplet} source={require('../assets/icons/droplet.png')} />
            <Text style={styles.txtPrecipitation}>{item.pop}%</Text>
          </View>
        </View>
      )}
      style={{}}
    />
  </View>
);

Daily.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Daily;
