import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { COLORS, SPACING } from "../theme"; // Ensure the path to theme.ts is correct

const ChapterScreen = ({ route, navigation }: any) => {
  const { book } = route.params || {};
  if (!book || !Array.isArray(book.chapters)) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Invalid book data</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }: any) => (
    <Animatable.View animation="fadeInUp" duration={500}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Verses", { book, chapter: item })}
      >
        <Text style={styles.text}>Chapter {index + 1}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      {Array.isArray(book.chapters) ? (
        <FlatList
          data={book.chapters}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.text}>No chapters available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Ensure COLORS is correctly imported
  },
  item: {
    marginVertical: SPACING.small,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
});

export default ChapterScreen;
