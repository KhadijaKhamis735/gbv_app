import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Card from '../../components/Card';

export default function InfoDocumentScreen({ route }) {
  const { t } = useTranslation();
  const { type = 'policy', itemId = 1 } = route.params || {};

  const isPolicy = type === 'policy';
  const title = isPolicy
    ? t(`policies.items.${itemId}.title`)
    : t(`rights.items.${itemId}.title`);
  const subtitle = isPolicy
    ? t(`policies.items.${itemId}.organization`)
    : t(`rights.items.${itemId}.description`);
  const content = isPolicy
    ? t(`policies.items.${itemId}.content`)
    : t(`rights.items.${itemId}.content`);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>

      <Card style={styles.documentCard}>
        <View style={styles.documentHeader}>
          <MaterialCommunityIcons
            name={isPolicy ? 'file-document-outline' : 'shield-check-outline'}
            size={24}
            color={colors.primary}
          />
          <Text style={styles.documentLabel}>
            {isPolicy ? t('drawer.internationalPolicies') : t('drawer.humanRights')}
          </Text>
        </View>
        <Text style={styles.documentText}>{content}</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.dark,
  },
  headerSubtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.gray,
  },
  documentCard: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  documentLabel: {
    marginLeft: spacing.sm,
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.primary,
  },
  documentText: {
    fontSize: fontSize.base,
    color: colors.darkGray,
    lineHeight: 24,
  },
});
