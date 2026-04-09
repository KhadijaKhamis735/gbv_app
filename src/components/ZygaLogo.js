import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, spacing, fontSize } from '../constants/colors';

export default function ZygaLogo({ showSubtitle = false, compact = false }) {
  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      <Image
        source={require('../../assets/images/zyga-logo.jpeg')}
        style={[styles.logoImage, compact && styles.compactLogoImage]}
        resizeMode="contain"
      />
      {showSubtitle && (
        <Text style={[styles.subtitle, compact && styles.compactSubtitle]}>
          Zanzibar Youth Gender Alliance
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactContainer: {
    transform: [{ scale: 0.95 }],
  },
  logoImage: {
    width: 220,
    height: 220,
    marginBottom: spacing.md,
  },
  compactLogoImage: {
    width: 170,
    height: 170,
  },
  subtitle: {
    marginTop: spacing.xxs,
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.secondary,
    textAlign: 'center',
  },
  compactSubtitle: {
    fontSize: fontSize.base,
  },
});
