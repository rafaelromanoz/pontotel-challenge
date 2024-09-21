import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { useAppSelector } from '../store/store';
import { lightTheme, darkTheme } from '../theme/theme';

interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.primary },
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || 'Buscar...'}
        placeholderTextColor={theme.secondaryText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
  },
});

export default SearchInput;
