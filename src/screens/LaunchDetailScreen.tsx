import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { RootStackParamList } from '../navigation/RootNavigator';
import { fetchRocket } from '../store/slices/launchesSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

const { width } = Dimensions.get('window');

type LaunchDetailRouteProp = RouteProp<RootStackParamList, 'LaunchDetails'>;

const LaunchDetailScreen = () => {
  const route = useRoute<LaunchDetailRouteProp>();
  const navigation = useNavigation<any>();
  const { launchId, youtubeId, articleUrl } = route.params;

  console.log('article url', articleUrl);

  const videoUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;

  const dispatch = useAppDispatch();
  const { rockets, launches, loading } = useAppSelector((state) => state.launches);

  const launch = launches.find((l) => l.id === launchId);
  const rocketId = launch?.rocket;

  useEffect(() => {
    if (rocketId && !rockets[rocketId]) {
      dispatch(fetchRocket(rocketId));
    }
  }, [rocketId, rockets, dispatch]);

  const rocket = rockets[rocketId || ''];

  const handleOpenArticle = () => {
    navigation.navigate('ArticleWebViewScreen', { articleUrl });
  };

  if (loading || !launch) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{rocket ? rocket.name : 'Detalhes do Foguete'}</Text>

      {videoUrl ? (
        <View style={styles.videoContainer}>
          <WebView
            style={styles.webView}
            javaScriptEnabled
            domStorageEnabled
            source={{ uri: videoUrl }}
            allowsFullscreenVideo
          />
        </View>
      ) : (
        <Text style={styles.noVideoText}>Sem vídeo habilitado para esse lançamento.</Text>
      )}

      {rocket ? (
        <View style={styles.rocketInfoContainer}>
          <Text style={styles.subTitle}>Informações do Foguete:</Text>
          <Text style={styles.detail}>Nome: {rocket.name}</Text>
          <Text style={styles.detail}>Empresa: {rocket.company}</Text>
          <Text style={styles.detail}>
            Primeiro Voo: {new Date(rocket.first_flight).toLocaleDateString()}
          </Text>
          <Text style={styles.detail}>Altura: {rocket.height.meters} metros</Text>
          <Text style={styles.detail}>Massa: {rocket.mass.kg} kg</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Carregando detalhes do foguete...</Text>
      )}

      {articleUrl ? (
        <Text style={styles.articleText}>
          Veja mais no artigo...{' '}
          <TouchableOpacity onPress={handleOpenArticle}>
            <Text style={styles.linkText}>clique aqui</Text>
          </TouchableOpacity>
        </Text>
      ) : (
        <Text style={styles.noVideoText}>Nenhum artigo disponível para esse lançamento.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  videoContainer: {
    height: width * 0.5625, // Proporção 16:9 para o vídeo
    width: '100%',
    marginBottom: 16,
  },
  webView: {
    flex: 1,
  },
  noVideoText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  rocketInfoContainer: {
    marginTop: 20,
    width: '100%',
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
  articleText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default LaunchDetailScreen;
