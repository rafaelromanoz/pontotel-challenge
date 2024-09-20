import { useRoute, RouteProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

import { RootStackParamList } from '../navigation/RootNavigator';

const { width } = Dimensions.get('window');

type LaunchDetailRouteProp = RouteProp<RootStackParamList, 'LaunchDetails'>;

const LaunchDetailScreen = () => {
  const route = useRoute<LaunchDetailRouteProp>();
  const { launchId, youtubeId } = route.params;

  const videoUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Launch Details</Text>
      <Text style={styles.detail}>Launch ID: {launchId}</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    marginBottom: 20,
  },
  videoContainer: {
    height: width * 0.5625,
    width: '100%',
  },
  webView: {
    flex: 1,
  },
  noVideoText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default LaunchDetailScreen;
