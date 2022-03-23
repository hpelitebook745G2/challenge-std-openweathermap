import React from 'react';
import { StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

const MapScreen = ({ navigation }) => (
  <Button
    style={styles.highlight}
    onPress={() => navigation.navigate('CitiesScreen')}
    title="Search"
    color="#841584"
  />
);

MapScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default MapScreen;
