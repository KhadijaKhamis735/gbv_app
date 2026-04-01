import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, shadows } from '../constants/colors';

export default function Card({
  children,
  style,
  noPadding = false,
  elevation = 'md',
}) {
  return (
    <View style={[
      styles.card,
      shadows[elevation],
      !noPadding && styles.padding,
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  padding: {
    padding: spacing.md,
  },
});
