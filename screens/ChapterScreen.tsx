import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  ListRenderItem,
} from "react-native";
import { COLORS, SPACING, FONTS } from "../theme";
import { Book, Chapter } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import SearchBar from "../components/SearchBar"; // Ensure the file exists at this path or update the path to the correct location

type ChapterScreenProps = NativeStackScreenProps<RootStackParamList, "Chapter">;

const INITIAL_CHAPTERS_TO_RENDER = 15;
const CHAPTERS_INCREMENT = 10;

const ChapterScreen: React.FC<ChapterScreenProps> = React.memo(
  ({ route, navigation }) => {
    const { book } = route.params;
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [chaptersToRender, setChaptersToRender] = useState(
      INITIAL_CHAPTERS_TO_RENDER
    );

    // Filter chapters based on search query
    const filteredChapters = useMemo(() => {
      if (!searchQuery.trim()) return book.chapters;

      return book.chapters.filter((_, index) =>
        `Chapter ${index + 1}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [book.chapters, searchQuery]);

    const handleRefresh = useCallback(() => {
      setRefreshing(true);
      // Simulate network refresh
      setTimeout(() => {
        setRefreshing(false);
        setChaptersToRender(INITIAL_CHAPTERS_TO_RENDER);
      }, 1000);
    }, []);

    const loadMoreChapters = useCallback(() => {
      if (chaptersToRender < filteredChapters.length) {
        setChaptersToRender((prev) =>
          Math.min(prev + CHAPTERS_INCREMENT, filteredChapters.length)
        );
      }
    }, [filteredChapters.length, chaptersToRender]);

    const renderItem: ListRenderItem<Chapter> = useCallback(
      ({ item, index }) => (
        <View
          style={styles.item}
          accessibilityRole="button"
          accessibilityLabel={`Chapter ${index + 1}`}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Verses", {
                book,
                chapter: item,
                chapterNumber: index + 1,
              })
            }
            activeOpacity={0.7}
            accessibilityLabel={`Navigate to Chapter ${index + 1}`}
            accessibilityHint={`Opens verses for Chapter ${index + 1} of ${
              book.name
            }`}
          >
            <Text style={styles.chapterText} allowFontScaling={true}>
              Chapter {index + 1}
            </Text>
          </TouchableOpacity>
        </View>
      ),
      [book, navigation]
    );

    const renderFooter = useCallback(() => {
      if (chaptersToRender >= filteredChapters.length) return null;

      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      );
    }, [chaptersToRender, filteredChapters.length]);

    if (!book?.chapters) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Book data not available</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
            accessibilityHint="Navigates back to previous screen"
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!filteredChapters.length) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {searchQuery.trim()
              ? `No chapters found for "${searchQuery}"`
              : "No chapters available"}
          </Text>
          {searchQuery.trim() && (
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => setSearchQuery("")}
              accessibilityLabel="Clear search"
            >
              <Text style={styles.retryButtonText}>Clear Search</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return (
      <View style={styles.container} accessibilityLabel="Chapters list">
        <Text style={styles.header} accessibilityRole="header">
          {book.name}
        </Text>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search chapters..."
          debounceTime={400}
        />
        <FlatList
          data={filteredChapters.slice(0, chaptersToRender)}
          keyExtractor={(_, index) => `chapter-${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          ListFooterComponent={renderFooter}
          onEndReached={loadMoreChapters}
          onEndReachedThreshold={0.5}
          initialNumToRender={INITIAL_CHAPTERS_TO_RENDER}
          maxToRenderPerBatch={CHAPTERS_INCREMENT}
          windowSize={10}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Darker background color
    paddingHorizontal: SPACING.medium,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Darker background color
    padding: SPACING.large,
  },
  errorText: {
    fontSize: 16,
    color: "#cccccc", // Light text color for contrast
    textAlign: "center",
    marginBottom: SPACING.medium,
  },
  header: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: "#ffffff", // White text for header
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
    backgroundColor: "#333333", // Darker item background
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  chapterText: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: "#ffffff", // White text for chapters
    marginBottom: SPACING.small,
  },
  footer: {
    padding: SPACING.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  retryButton: {
    marginTop: SPACING.medium,
    padding: SPACING.medium,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
  },
});

export default ChapterScreen;
