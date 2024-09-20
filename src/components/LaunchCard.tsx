import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface LaunchCardProps {
  missionName: string;
  launchDate: string;
  patchUrl: string;
  onMoreDetails: () => void;
}

const LaunchCard: React.FC<LaunchCardProps> = ({
  missionName,
  launchDate,
  patchUrl,
  onMoreDetails,
}) => {
  return (
    <TouchableOpacity onPress={onMoreDetails}>
      <View style={styles.card}>
        <Image source={{ uri: patchUrl }} style={styles.patchImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.missionName}>{missionName}</Text>
          <Text style={styles.launchDate}>{launchDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  patchImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  missionName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  launchDate: {
    fontSize: 14,
    color: '#777',
  },
});

export default LaunchCard;
