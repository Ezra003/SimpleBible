import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { Verse } from '../types/BibleTypes';
import KJV from '../assets/data/KJV.json';

// Define proper types for the JSON structure
interface BibleBook {
  chapters: {
    verses: Verse[];
  }[];
}

interface BibleData {
  books: {
    chapters: {
      verses: Verse[];
    }[];
  }[];
}

const DailyVerse = () => {
    const [dailyVerse, setDailyVerse] = useState<Verse | null>(null);
    const [loading, setLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current; // Moved inside useState for better hooks practice

    useEffect(() => {
        const fetchDailyVerse = () => {
            try {
                // Type guard to ensure KJV has the expected structure
                const bibleData = KJV as BibleData;
                if (!bibleData.books) throw new Error("Invalid Bible data structure");
                
                const allVerses = bibleData.books
                    .flatMap(book => book.chapters.flatMap(chapter => chapter.verses));
                
                if (allVerses.length > 0) {
                    const randomIndex = Math.floor(Math.random() * allVerses.length);
                    setDailyVerse(allVerses[randomIndex]);
                }
            } catch (error) {
                console.error('Error fetching daily verse:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDailyVerse();
    }, []);

    useEffect(() => {
        if (dailyVerse) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }
    }, [dailyVerse, fadeAnim]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daily Verse</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#6200ee" />
            ) : dailyVerse ? (
                <Animated.View style={{ opacity: fadeAnim }}>
                    <Text style={styles.verse}>
                        <Text style={styles.verseNumber}>{dailyVerse.verse}:</Text> {dailyVerse.text}
                    </Text>
                    <Text style={styles.reference}>
                        {dailyVerse.bookName} {dailyVerse.chapter}:{dailyVerse.verse}
                    </Text>
                </Animated.View>
            ) : (
                <Text style={styles.error}>Failed to load verse. Please try again later.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        margin: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    verse: {
        fontSize: 18,
        lineHeight: 26,
        color: '#555',
        textAlign: 'center',
        marginBottom: 10,
    },
    verseNumber: {
        fontWeight: 'bold',
        color: '#6200ee',
    },
    reference: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#666',
        textAlign: 'center',
    },
    error: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default DailyVerse;