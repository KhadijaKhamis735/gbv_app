import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize, borderRadius } from '../../constants/colors';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageSelectionScreen() {
  const { t } = useTranslation();
  const { setAppLanguage } = useLanguage();

  const options = [
    { code: 'en', label: t('language.english') },
    { code: 'sw', label: t('language.swahili') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialCommunityIcons name="translate" size={56} color={colors.primary} />
        <Text style={styles.title}>{t('language.title')}</Text>
        <Text style={styles.subtitle}>{t('language.subtitle')}</Text>

        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.code}
              style={styles.optionButton}
              onPress={() => setAppLanguage(option.code)}
              activeOpacity={0.85}
            >
              <Text style={styles.optionText}>{option.label}</Text>
              <MaterialCommunityIcons name="chevron-right" size={22} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FF',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    marginTop: spacing.md,
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.dark,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.base,
    color: colors.gray,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#D7E6FB',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFCFF',
  },
  optionText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.dark,
  },
});
