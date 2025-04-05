import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useBookmarks } from '../context/BookmarkContext';
import { Verse } from '../types/BibleTypes';

const VersesScreen = ({ route }: any) => {
  const { chapter } = route.params;
  const { addBookmark } = useBookmarks();

  const renderItem = ({ item }: { item: Verse }) => (
    <View style={styles.item}>
      <Text style={styles.text}>
        {item.verse}. {item.text}
      </Text>
      <TouchableOpacity onPress={() => addBookmark(item)}>
        <Text style={styles.bookmark}>Bookmark</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chapter.verses}
        keyExtractor={(item) => item.verse.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  text: { fontSize: 16 },
  bookmark: { color: 'blue', marginTop: 5 },
});

export default VersesScreen;