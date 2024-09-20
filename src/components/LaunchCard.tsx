import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { RootStackParamList } from '../navigation/RootNavigator';

type LaunchCardProps = {
  missionName: string;
  rocketName: string;
  launchDate: string;
  youtubeId?: string;
  launchId: string;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'LaunchDetails'>;

const LaunchCard: React.FC<LaunchCardProps> = ({
  missionName,
  rocketName,
  launchDate,
  youtubeId,
  launchId,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const goToDetails = () => {
    navigation.navigate('LaunchDetails', { launchId, youtubeId });
  };

  return (
    <TouchableOpacity onPress={goToDetails}>
      <View style={styles.card}>
        <Text style={styles.missionName}>{missionName}</Text>
        <Text style={styles.rocketName}>Rocket: {rocketName}</Text>
        <Text style={styles.launchDate}>Launch Date: {launchDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  missionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rocketName: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  launchDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
});

export default LaunchCard;
