import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const VersesScreen = ({ route }: any) => {
  const { chapter } = route.params;

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.text}>
        {item.verse}. {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chapter.verses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  text: { fontSize: 16 },
});

export default VersesScreen;