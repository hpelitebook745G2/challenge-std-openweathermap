import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import HttpService from '../services/HttpService';
import apis from '../constants/apis';
import { Today, Hourly, Daily } from '../components';

const CityDetailScreen = ({ route }) => {
  const {
    coords: { lat, lon },
  } = route.params;

  const [hourlyData, setHourlyData] = useState({});
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'today', title: 'TODAY' },
    { key: 'hourly', title: 'HOURLY' },
    { key: 'daily', title: 'DAILY' },
  ]);

  const getData = async () => {
    const payload = {
      lat,
      lon,
      exclude: 'minutely',
      appid: apis.apiKey,
    };

    try {
      const response = await HttpService.get(apis.onecall, payload).then(resp => resp);
      setHourlyData(response);
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const TodayComponent = () => <Today route={route} />;
  const HourlyComponent = () => <Hourly data={hourlyData} />;
  const DailyComponent = () => <Daily data={hourlyData} />;

  const renderScene = SceneMap({
    today: TodayComponent,
    hourly: HourlyComponent,
    daily: DailyComponent,
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#E7E7E5' }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({ route }) => <Text style={{ color: 'black' }}>{route.title}</Text>}
            indicatorStyle={{ backgroundColor: '#ec853e' }}
            style={{ backgroundColor: '#E7E7E5' }}
          />
        )}
      />
    </View>
  );
};

CityDetailScreen.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CityDetailScreen;
