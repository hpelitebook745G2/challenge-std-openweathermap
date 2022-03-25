import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';

import { colors } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1, // the container will fill the whole screen.
  },
  map: {
    flex: 1,
  },
  btnSearch: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  btnSearchContainer: {
    borderRadius: 50,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 30,
    right: 100,
    left: 100,
  },
});

const MapScreen = ({ navigation }) => {
  const [marker, setMarker] = useState({
    latitude: 1.3333333333333333,
    longitude: 103.86596046278682,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getCurrentPosition = async () => {
    Geolocation.getCurrentPosition(
      position => {
        setMarker(position.coords);
      },
      error => {
        // eslint-disable-next-line no-console
        console.log('Geolocation error: ', error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        // do something if granted...
        getCurrentPosition();
      }
    }

    if (Platform.OS === 'android') {
      const auth = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (auth === PermissionsAndroid.RESULTS.GRANTED) {
        // do something if granted...
        getCurrentPosition();
      }
    }
  };

  useEffect(() => {
    requestPermissions();
    getCurrentPosition();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={marker}
        // eslint-disable-next-line prettier/prettier
        onPress={e => {
          setMarker({
            ...e.nativeEvent.coordinate,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          // eslint-disable-next-line prettier/prettier
        }}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>
      <TouchableOpacity
        style={[
          styles.btnSearchContainer,
          { backgroundColor: marker === null ? colors.disabledGrey : colors.primaryOrange },
        ]}
        disabled={marker === null}
        onPress={
          () => navigation.navigate('CitiesScreen', { lat: marker.latitude, lon: marker.longitude })
          // eslint-disable-next-line prettier/prettier
        }
      >
        <Text style={styles.btnSearch}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

MapScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default MapScreen;
