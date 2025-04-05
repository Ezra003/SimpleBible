import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { Verse } from '../types/BibleTypes';
import KJV from '../assets/data/KJV.json';

// Define the type for your KJV data structure
type Book = {
  chapters: {
    verses: Verse[];
  }[];
};

type KJVData = {
  books: Book[];
};

// Assert the imported KJV data as KJVData
const bibleData = KJV as KJVData;

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Verse[]>([]);

    const handleSearch = () => {
        const allVerses: Verse[] = bibleData.books
            .flatMap(book => book.chapters.flatMap(chapter => chapter.verses));
        const filtered = allVerses.filter(verse =>
            verse.text.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search verses..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
            />
            {results.length === 0 && query ? (
                <Text style={styles.noResults}>No results found.</Text>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.verse.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.result}>
                            {item.verse}: {item.text}
                        </Text>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10 },
    result: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    noResults: { textAlign: 'center', color: 'gray', marginTop: 20 },
});

export default SearchScreen;