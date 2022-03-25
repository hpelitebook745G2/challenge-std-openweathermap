const getWeatherIcon = weatherType => {
  if (weatherType.includes('clear sky')) {
    return require('../assets/icons/clearSky.png');
  }
  if (weatherType.includes('few clouds')) {
    return require('../assets/icons/fewClouds.png');
  }
  if (weatherType.includes('scattered clouds')) {
    return require('../assets/icons/scatteredClouds.png');
  }
  if (weatherType.includes('broken clouds')) {
    return require('../assets/icons/brokenClouds.png');
  }
  if (weatherType.includes('shower rain')) {
    return require('../assets/icons/showerRain.png');
  }
  if (weatherType.includes('rain')) {
    return require('../assets/icons/rain.png');
  }
  if (weatherType.includes('thunderstorm'.to)) {
    return require('../assets/icons/thunderstorm.png');
  }
  if (weatherType.includes('snow')) {
    return require('../assets/icons/snow.png');
  }
  if (weatherType.includes('mist')) {
    return require('../assets/icons/mist.png');
  }
  if (weatherType.includes('overcast clouds')) {
    return require('../assets/icons/overcastClouds.png');
  }
  return null;
};

export default getWeatherIcon;
