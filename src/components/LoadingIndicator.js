import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { colors, spacing, fontSize } from '../constants/colors';

export default function LoadingIndicator({
  size = 'large',
  color = colors.primary,
  message,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  message: {
    marginTop: spacing.md,
    fontSize: fontSize.base,
    color: colors.gray,
    textAlign: 'center',
  },
});
