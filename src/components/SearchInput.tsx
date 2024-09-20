import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type SearchInputProps = {
  value: string;
  onChange: (text: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Procure pelo nome do foguete"
      value={value}
      onChangeText={onChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

export default SearchInput;
