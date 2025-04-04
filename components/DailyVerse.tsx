import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Verse } from '../types/BibleTypes';
import KJV from '../assets/data/KJV.json';

const DailyVerse = () => {
    const [dailyVerse, setDailyVerse] = useState<Verse | null>(null);

    useEffect(() => {
        const allVerses: Verse[] = (KJV.books as { chapters: { verses: Verse[] }[] }[]).flatMap(book =>
            book.chapters.flatMap(chapter => chapter.verses)
        );
        const randomIndex = Math.floor(Math.random() * allVerses.length);
        setDailyVerse(allVerses[randomIndex]);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daily Verse</Text>
            {dailyVerse && (
                <Text style={styles.verse}>
                    {dailyVerse.verse}: {dailyVerse.text}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    verse: { fontSize: 16 },
});

export default DailyVerse;