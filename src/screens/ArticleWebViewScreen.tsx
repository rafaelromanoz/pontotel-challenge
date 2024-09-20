import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { RootStackParamList } from '../navigation/RootNavigator';

type ArticleWebViewRouteProp = RouteProp<RootStackParamList, 'ArticleWebViewScreen'>;

const ArticleWebView = () => {
  const route = useRoute<ArticleWebViewRouteProp>();
  const { articleUrl } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: articleUrl }}
        style={styles.webView}
        javaScriptEnabled
        domStorageEnabled
        onShouldStartLoadWithRequest={() => true}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  webView: {
    flex: 1,
  },
});

export default ArticleWebView;
