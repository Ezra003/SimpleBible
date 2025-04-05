import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { COLORS, SPACING } from "../theme";
import { Book, Chapter } from "../types"; // Assuming you have types defined
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types'; // Create this type

type ChapterScreenProps = NativeStackScreenProps<RootStackParamList, 'Chapter'>;

const ANIMATION_DELAY_INCREMENT = 100;

const ChapterScreen: React.FC<ChapterScreenProps> = ({ route, navigation }) => {
  const { book } = route.params;

  if (!book?.chapters?.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No chapters available</Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<Chapter> = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      delay={index * ANIMATION_DELAY_INCREMENT}
      useNativeDriver
    >
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("Verses", {
            book,
            chapter: item,
            chapterNumber: index + 1,
          })
        }
        activeOpacity={0.7}
      >
        <Text style={styles.chapterText}>Chapter {index + 1}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{book.name}</Text>
      <FlatList
        data={book.chapters}
        keyExtractor={(_, index) => `chapter-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No chapters found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.medium,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.secondary,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginVertical: SPACING.large,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: SPACING.large,
  },
  item: {
    marginVertical: SPACING.small,
    padding: SPACING.medium,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  chapterText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.small,
  },
  description: {
    fontSize: 14,
    color: COLORS.secondary,
    opacity: 0.8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: SPACING.large,
    color: COLORS.secondary,
  },
});

export default ChapterScreen;