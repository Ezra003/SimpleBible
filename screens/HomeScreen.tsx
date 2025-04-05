import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Switch } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { THEME, SPACING } from '../theme';

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const COLORS = isDarkMode ? THEME.dark : THEME.light;

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
        style={[styles.item, { backgroundColor: COLORS.white, shadowColor: COLORS.shadow }]}
        onPress={() => navigation.navigate('Chapter', { book: item })}
        activeOpacity={0.7}
        accessibilityLabel={`Select ${item.name}`}
        accessibilityRole="button"
      >
        <Text style={[styles.text, { color: COLORS.text }]}>{item.name}</Text>
        <Text style={[styles.chapterCount, { color: COLORS.text }]}>{item.chapters.length} chapters</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: COLORS.background }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <Switch
        value={isDarkMode}
        onValueChange={setIsDarkMode}
        thumbColor={COLORS.primary}
        trackColor={{ false: COLORS.border, true: COLORS.secondary }}
        style={styles.switch}
      />
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: COLORS.text }]}>No books found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
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
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 3,
  },
  text: { 
    fontSize: 18, 
    fontWeight: 'bold', 
  },
  chapterCount: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: SPACING.small / 2,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: SPACING.large,
  },
  switch: {
    alignSelf: 'flex-end',
    margin: SPACING.medium,
  },
});

export default HomeScreen;
