import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Verses'>;

interface Verse {
  verse: number;
  text: string;
}

interface Book {
  name: string;
  chapters: Verse[][]; // Each chapter contains an array of Verse objects
}

const VersesScreen: React.FC<Props> = ({ route }) => {
  const { chapterId, verseId } = route.params;
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVerses = async () => {
      try {
        const kjv = require('../assets/data/KJV.json');
        console.log('Loaded KJV JSON:', kjv);

        const book = kjv.books.find((b: Book) => b.name === chapterId);
        console.log('Found book:', book);

        if (book) {
          const chapterIndex = verseId ? parseInt(verseId, 10) - 1 : 0;
          console.log('Chapter index:', chapterIndex);

          const chapterVerses = book.chapters[chapterIndex];
          console.log('Chapter verses:', chapterVerses);

          if (chapterVerses) {
            setVerses(chapterVerses);
            console.log('Verses state updated:', chapterVerses);
          } else {
            console.warn('Chapter not found');
          }
        } else {
          console.warn('Book not found');
        }
      } catch (error) {
        console.error('Error loading verses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVerses();
  }, [chapterId, verseId]);

  const renderItem = ({ item }: { item: Verse }) => {
    console.log('Rendering item:', item);
    return (
      <View style={styles.item}>
        <Text style={styles.text}>
          <Text style={styles.verseNumber}>{item.verse}.</Text> {item.text}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  if (verses.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 18, color: '#555' }}>No verses found.</Text>
      </View>
    );
  }

  console.log('Rendering verses:', verses);

  return (
    <View style={styles.container}>
      <FlatList
        data={verses}
        keyExtractor={(item, index) => `${item.verse}-${index}`}
        renderItem={renderItem}
        initialNumToRender={10} // Render only 10 items initially
        windowSize={5} // Adjust the window size for better performance
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default VersesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 10,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  verseNumber: {
    fontWeight: '600',
    color: '#555',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
