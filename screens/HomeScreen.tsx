import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Book } from '../types/BibleTypes';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = ({ navigation }: any) => {
  const [books, setBooks] = useState<Book[]>([]);
  const { colors } = useTheme();

  useEffect(() => {
    const loadBooks = async () => {
      const kjv = require('../assets/data/KJV.json');
      setBooks(kjv.books);
    };
    loadBooks();
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: colors.background }]}
      onPress={() => navigation.navigate('Chapter', { book: item })}
    >
      <Text style={[styles.text, { color: colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  text: { fontSize: 18 },
});

export default HomeScreen;