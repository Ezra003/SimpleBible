import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SPACING } from '../theme';

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
    <Animatable.View animation="fadeInUp" duration={500}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Chapter', { book: item })}
      >
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    </Animatable.View>
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
  container: { 
    flex: 1, 
    padding: SPACING.medium, 
    backgroundColor: COLORS.background 
  },
  item: { 
    padding: SPACING.medium, 
    marginVertical: SPACING.small, 
    borderRadius: 10, 
    backgroundColor: '#ffffff', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 3 
  },
  text: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: COLORS.text 
  },
});

export default HomeScreen;