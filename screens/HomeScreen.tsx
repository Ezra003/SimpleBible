import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      const kjv = require('../assets/data/KJV.json');
      setBooks(kjv.books);
    };
    loadBooks();
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Chapter', { book: item })}
    >
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  text: { fontSize: 18 },
});

export default HomeScreen;