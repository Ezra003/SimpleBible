import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ChapterScreen = ({ route, navigation }: any) => {
  const { book } = route.params;

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Verses', { book, chapter: item })}
      accessibilityRole="button"
      accessibilityLabel={`Go to Chapter ${index + 1} of ${book.name}`}
    >
      <Text style={styles.text}>Chapter {index + 1}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📘 {book.name}</Text>
      <FlatList
        data={book.chapters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        initialNumToRender={10}
        windowSize={10}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  item: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    color: '#222',
    letterSpacing: 0.5,
  },
});

export default ChapterScreen;
