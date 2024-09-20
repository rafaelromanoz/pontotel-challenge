import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';

import LaunchCard from '../components/LaunchCard';
import SearchInput from '../components/SearchInput';
import { fetchLaunches, fetchRocket } from '../store/slices/launchesSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

const LaunchScreen = () => {
  const dispatch = useAppDispatch();
  const { launches, rockets, loading, error, isFetchingMore, page } = useAppSelector(
    (state) => state.launches
  );

  const [rocketFilter, setRocketFilter] = useState('');

  // Carregar a primeira página de lançamentos ao montar o componente
  useEffect(() => {
    dispatch(fetchLaunches({ page: 1 }));
  }, [dispatch]);

  // Buscar detalhes dos foguetes relacionados aos lançamentos
  useEffect(() => {
    launches.forEach((launch) => {
      if (!rockets[launch.rocket]) {
        dispatch(fetchRocket(launch.rocket));
      }
    });
  }, [launches, rockets, dispatch]);

  // Função para carregar mais lançamentos ao final da lista
  const handleLoadMore = () => {
    if (!isFetchingMore && !loading) {
      dispatch(fetchLaunches({ page: page + 1 }));
    }
  };

  // Exibe um indicador de carregamento se estiver carregando a primeira página
  if (loading && page === 1) {
    return <ActivityIndicator size="large" />;
  }

  // Exibe uma mensagem de erro caso ocorra algum erro ao carregar os lançamentos
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  // Filtra os lançamentos de acordo com o filtro de foguetes
  const filteredLaunches = launches.filter((launch) => {
    const rocketName = rockets[launch.rocket] || '';
    return rocketName.toLowerCase().includes(rocketFilter.toLowerCase());
  });

  return (
    <View style={styles.container}>
      {/* Input de busca para filtrar por nome do foguete */}
      <SearchInput value={rocketFilter} onChange={setRocketFilter} />

      {/* Lista de lançamentos com paginação e filtro */}
      <FlatList
        data={filteredLaunches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LaunchCard
            missionName={item.name}
            rocketName={rockets[item.rocket] || 'Carregando...'}
            launchDate={new Date(item.date_utc).toLocaleDateString()}
            launchId={item.id}
            youtubeId={item.links?.youtube_id}
          />
        )}
        onEndReached={handleLoadMore} // Carrega mais lançamentos ao chegar ao fim
        onEndReachedThreshold={0.5} // Aciona o carregamento quando 50% do fim da lista é alcançado
        ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" /> : null} // Indicador de carregamento no rodapé
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
});

export default LaunchScreen;
