import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import MapView, { Marker } from 'react-native-maps';

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
    backgroundColor: '#ec853e',
    borderRadius: 50,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 30,
    right: 100,
    left: 100,
  },
});

const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [marker, setMarker] = useState(null);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // specify our coordinates.
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={region => setRegion(region)}
        onPress={e => setMarker(e.nativeEvent.coordinate)}>
        {marker && <Marker coordinate={marker} />}
      </MapView>
      <TouchableOpacity
        style={styles.btnSearchContainer}
        disabled={marker === null}
        onPress={() =>
          navigation.navigate('CitiesScreen', { lat: marker.latitude, lon: marker.longitude })
        }>
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
