import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  AccessibilityInfo,
} from 'react-native';

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
      accessibilityRole="button"
      accessibilityLabel={`Go to chapters of ${item.name}`}
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
        initialNumToRender={10}
        windowSize={10}
        ListHeaderComponent={() => (
          <Text style={styles.header}>📖 Bible Books</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 20,
    color: '#222',
    letterSpacing: 0.5,
  },
});

export default HomeScreen;
