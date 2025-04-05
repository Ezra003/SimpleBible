import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  AccessibilityInfo,
} from 'react-native';

const VersesScreen = ({ route }: any) => {
  const { chapter } = route.params;

  const renderItem = ({ item }: any) => (
    <View style={styles.item} accessible accessibilityLabel={`Verse ${item.verse}. ${item.text}`}> 
      <Text style={styles.text}>
        {item.verse}. {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📄 Chapter {chapter.chapter}</Text>
      <FlatList
        data={chapter.verses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        initialNumToRender={15}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#222',
    lineHeight: 22,
    letterSpacing: 0.3,
  },
});

export default VersesScreen;
