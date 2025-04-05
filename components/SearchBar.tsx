import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, FONTS } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  debounceTime?: number;
  autoFocus?: boolean;
  showClearButton?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  debounceTime = 300,
  autoFocus = false,
  showClearButton = true,
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  // Debounce the input
  useEffect(() => {
    const timer = setTimeout(() => {
      onChangeText(displayValue);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [displayValue, debounceTime, onChangeText]);

  const handleClear = () => {
    setDisplayValue('');
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={24}
          color={COLORS.secondary}
          style={styles.searchIcon}
          accessibilityRole="image"
          accessibilityLabel="Search icon"
        />
        <TextInput
          style={styles.input}
          value={displayValue}
          onChangeText={setDisplayValue}
          placeholder={placeholder}
          placeholderTextColor={COLORS.secondary}
          autoFocus={autoFocus}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="never" // We'll implement our own for consistency
          accessibilityRole="search"
          accessibilityLabel="Search input"
          accessibilityHint="Type to search chapters"
        />
        {showClearButton && displayValue ? (
          <TouchableOpacity
            onPress={handleClear}
            style={styles.clearButton}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <Icon
              name="close"
              size={20}
              color={COLORS.secondary}
              accessibilityRole="image"
              accessibilityLabel="Clear icon"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 25,
    paddingHorizontal: SPACING.medium,
    height: 50,
  },
  searchIcon: {
    marginRight: SPACING.small,
  },
  input: {
    flex: 1,
    fontSize: 16, // Replace with the appropriate font size value
    fontFamily: FONTS.regular,
    color: COLORS.text,
    paddingVertical: SPACING.small,
    ...Platform.select({
      android: {
        paddingVertical: 0, // Fix alignment on Android
      },
    }),
  },
  clearButton: {
    padding: SPACING.small,
    marginLeft: SPACING.small,
  },
});

export default React.memo(SearchBar);