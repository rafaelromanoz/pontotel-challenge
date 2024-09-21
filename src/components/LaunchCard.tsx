import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { useAppSelector } from '../store/store';
import { lightTheme, darkTheme } from '../theme/theme';

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
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <TouchableOpacity onPress={onMoreDetails}>
      <View
        style={[
          styles.card,
          { backgroundColor: theme.cardBackground, borderColor: theme.primary },
        ]}>
        <Image
          source={{ uri: patchUrl }}
          style={[styles.patchImage, { borderColor: theme.primary }]}
        />
        <View style={styles.infoContainer}>
          <Text style={[styles.missionName, { color: theme.text }]}>{missionName}</Text>
          <Text style={[styles.launchDate, { color: theme.secondaryText }]}>{launchDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  patchImage: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 25,
    borderWidth: 1,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  missionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  launchDate: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default LaunchCard;
