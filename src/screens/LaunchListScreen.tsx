import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';

import LaunchCard from '../components/LaunchCard';
import SearchInput from '../components/SearchInput';
import { RootStackParamList } from '../navigation/RootNavigator';
import { fetchLaunches } from '../store/slices/launchesSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

type LaunchScreenNavigationProp = NavigationProp<RootStackParamList, 'LaunchList'>;

const PAGE_LIMIT = 10;

const LaunchListScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LaunchScreenNavigationProp>();
  const { launches, loading, page, isFetchingMore } = useAppSelector((state) => state.launches);

  const [missionFilter, setMissionFilter] = useState('');

  useEffect(() => {
    dispatch(fetchLaunches({ page: 1, limit: PAGE_LIMIT }));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!isFetchingMore && !loading) {
      dispatch(fetchLaunches({ page: page + 1, limit: PAGE_LIMIT }));
    }
  };

  const filteredLaunches = launches.filter((launch) =>
    launch.name.toLowerCase().includes(missionFilter.toLowerCase())
  );

  const renderFooterLoading = () => <ActivityIndicator size="large" />;

  const emptyLaunchesComponent = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.txtEmptyList}>Sem lançamentos no momento!</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchInput
        value={missionFilter}
        onChange={setMissionFilter}
        placeholder="Buscar missão..."
      />

      <FlatList
        data={filteredLaunches}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <LaunchCard
            missionName={item.name}
            launchDate={new Date(item.date_utc).toLocaleDateString()}
            patchUrl={item.links?.patch?.small || ''}
            onMoreDetails={() =>
              navigation.navigate('LaunchDetails', {
                launchId: item.id,
                articleUrl: item.links.article,
                youtubeId: item.links.youtube_id,
              })
            }
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooterLoading}
        ListEmptyComponent={emptyLaunchesComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
  txtEmptyList: {
    fontSize: 20,
  },
});

export default LaunchListScreen;
