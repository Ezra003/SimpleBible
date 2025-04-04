// filepath: e:\RESOURCES\RESOURCES (FILES)\websites-learning\react_native_apps_2025\SimpleBible\screens\SearchScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { Verse } from '../types/BibleTypes';
import KJV from '../assets/data/KJV.json';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Verse[]>([]);

    const handleSearch = () => {
        const allVerses: Verse[] = (KJV.books as { chapters: { verses: Verse[] }[] }[]).flatMap(book =>
            book.chapters.flatMap(chapter => chapter.verses)
        );
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
            <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.result}>
                        {item.verse}: {item.text}
                    </Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10 },
    result: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default SearchScreen;