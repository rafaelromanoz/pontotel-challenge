import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';

import LaunchCard from '../components/LaunchCard';
import SearchInput from '../components/SearchInput';
import { RootStackParamList } from '../navigation/RootNavigator';
import { fetchLaunches } from '../store/slices/launchesSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { lightTheme, darkTheme } from '../theme/theme';

type LaunchScreenNavigationProp = NavigationProp<RootStackParamList, 'LaunchList'>;

const PAGE_LIMIT = 10;

const LaunchListScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LaunchScreenNavigationProp>();
  const { launches, loading, page, isFetchingMore } = useAppSelector((state) => state.launches);

  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

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

  const renderFooterLoading = () => <ActivityIndicator size="large" color={theme.primary} />;

  const emptyLaunchesComponent = () => {
    return (
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={[styles.txtEmptyList, { color: theme.primary }]}>
          Sem lançamentos no momento!
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
  },
  searchInput: {
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  txtEmptyList: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default LaunchListScreen;
