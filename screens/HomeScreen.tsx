import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SPACING } from '../theme';

// Define TypeScript interfaces
interface Book {
  name: string;
  chapters: any[]; // You can define a more specific type for chapters
}

interface HomeScreenProps {
  navigation: {
    navigate: (screen: string, params: { book: Book }) => void;
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const kjv = require('../assets/data/KJV.json');
        setBooks(kjv.books);
      } catch (error) {
        console.error('Failed to load books:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBooks();
  }, []);

  const renderItem = ({ item, index }: { item: Book; index: number }) => (
    <Animatable.View 
      animation="fadeInUp" 
      duration={500}
      delay={index * 50} // Stagger animations
    >
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Chapter', { book: item })}
        activeOpacity={0.7}
        accessibilityLabel={`Select ${item.name}`}
        accessibilityRole="button"
      >
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.chapterCount}>{item.chapters.length} chapters</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No books found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: SPACING.medium,
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
    elevation: 3,
  },
  text: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: COLORS.text 
  },
  chapterCount: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.6,
    marginTop: SPACING.small / 2,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.text,
    marginTop: SPACING.large,
  },
});

export default HomeScreen;
