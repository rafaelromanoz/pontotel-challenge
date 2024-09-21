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
import { lightTheme, darkTheme } from '../theme/theme';

const { width } = Dimensions.get('window');

type LaunchDetailRouteProp = RouteProp<RootStackParamList, 'LaunchDetails'>;

const LaunchDetailScreen = () => {
  const route = useRoute<LaunchDetailRouteProp>();
  const navigation = useNavigation<any>();
  const { launchId, youtubeId, articleUrl } = route.params;

  const videoUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;

  const dispatch = useAppDispatch();
  const { rockets, launches, loading } = useAppSelector((state) => state.launches);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

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
    return <ActivityIndicator size="large" color={theme.primary} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {rocket ? rocket.name : 'Detalhes do Foguete'}
      </Text>

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
        <Text style={[styles.noVideoText, { color: theme.secondaryText }]}>
          Sem vídeo habilitado para esse lançamento.
        </Text>
      )}

      {rocket ? (
        <View style={[styles.rocketInfoContainer, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.subTitle, { color: theme.primary }]}>Informações do Foguete:</Text>
          <Text style={[styles.detail, { color: theme.text }]}>
            <Text style={styles.detailLabel}>Nome:</Text> {rocket.name}
          </Text>
          <Text style={[styles.detail, { color: theme.text }]}>
            <Text style={styles.detailLabel}>Empresa:</Text> {rocket.company}
          </Text>
          <Text style={[styles.detail, { color: theme.text }]}>
            <Text style={styles.detailLabel}>Primeiro Voo:</Text>{' '}
            {new Date(rocket.first_flight).toLocaleDateString()}
          </Text>
          <Text style={[styles.detail, { color: theme.text }]}>
            <Text style={styles.detailLabel}>Altura:</Text> {rocket.height.meters} metros
          </Text>
          <Text style={[styles.detail, { color: theme.text }]}>
            <Text style={styles.detailLabel}>Massa:</Text> {rocket.mass.kg} kg
          </Text>

          {articleUrl ? (
            <TouchableOpacity onPress={handleOpenArticle}>
              <Text style={[styles.articleLink, { color: theme.text }]}>
                Veja mais no artigo...{' '}
                <Text style={[styles.linkHighlight, { color: theme.primary }]}>clique aqui</Text>
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.noArticleText, { color: theme.secondaryText }]}>
              Nenhum artigo disponível para esse lançamento.
            </Text>
          )}
        </View>
      ) : (
        <Text style={[styles.loadingText, { color: theme.secondaryText }]}>
          Carregando detalhes do foguete...
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  videoContainer: {
    height: width * 0.5625,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#EAEAEA',
  },
  webView: {
    flex: 1,
  },
  noVideoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  rocketInfoContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: '600',
  },
  articleLink: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  linkHighlight: {
    fontWeight: 'bold',
  },
  noArticleText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  loadingText: {
    fontSize: 16,
  },
});

export default LaunchDetailScreen;
