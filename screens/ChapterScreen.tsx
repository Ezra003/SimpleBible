import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';

interface Book {
  name: string;
  chapters: string[];
  [key: string]: any;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Chapter'>;

const ChapterScreen: React.FC<Props> = ({ route, navigation }) => {
  const { chapterId } = route.params;

  // Simulating retrieval of book and chapters by chapterId (book name)
  // If you passed the full `book` in HomeScreen, adjust this logic accordingly
  const kjv = require('../assets/data/KJV.json');
  const book: Book | undefined = kjv.books.find((b: Book) => b.name === chapterId);

  if (!book) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Book not found.</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('Verses', {
          chapterId: book.name,
          verseId: (index + 1).toString(),
        })
      }
    >
      <Text style={styles.text}>Chapter {index + 1}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={book.chapters}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ChapterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 10,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
