import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ChapterScreen = ({ route, navigation }: any) => {
  const { book } = route.params;

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Verses', { book, chapter: item })}
    >
      <Text style={styles.text}>Chapter {index + 1}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={book.chapters}
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

export default ChapterScreen;