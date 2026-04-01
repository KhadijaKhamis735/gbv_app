import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize } from '../../constants/colors';
import Card from '../../components/Card';
import { mockLocalLaws } from '../../data/mockData';

export default function LocalLawsScreen() {
  const [expandedLaws, setExpandedLaws] = useState({});

  const toggleLaw = (lawId) => {
    setExpandedLaws((prev) => ({
      ...prev,
      [lawId]: !prev[lawId],
    }));
  };

  const renderLaws = (country, laws) => (
    <View key={country} style={styles.countrySection}>
      <Text style={styles.countryTitle}>{country}</Text>

      {laws.map((law) => (
        <TouchableOpacity
          key={law.id}
          onPress={() => toggleLaw(law.id)}
          activeOpacity={0.7}
        >
          <Card style={styles.lawCard}>
            <View style={styles.lawHeader}>
              <View style={styles.lawInfo}>
                <Text style={styles.lawTitle}>{law.title}</Text>
                <Text style={styles.lawDesc}>{law.description}</Text>
              </View>
              <MaterialCommunityIcons
                name={
                  expandedLaws[law.id]
                    ? 'chevron-up'
                    : 'chevron-down'
                }
                size={24}
                color={colors.primary}
              />
            </View>

            {expandedLaws[law.id] && (
              <View style={styles.lawContent}>
                <View style={styles.contentDivider} />
                <Text style={styles.contentText}>{law.content}</Text>
              </View>
            )}
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Local Laws</Text>
        <Text style={styles.headerSubtitle}>
          Tanzania & Zanzibar GBV Legal Protections
        </Text>
      </View>

      {/* Info Banner */}
      <Card style={styles.infoBanner}>
        <View style={styles.bannerContent}>
          <MaterialCommunityIcons
            name="scale-balance"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.bannerText}>
            These laws protect your rights. Tap any law to learn more.
          </Text>
        </View>
      </Card>

      {/* Tanzaniaaws */}
      {renderLaws('Tanzania', mockLocalLaws.tanzania.laws)}

      {/* Zanzibar Laws */}
      {renderLaws('Zanzibar', mockLocalLaws.zanzibar.laws)}

      {/* Help Banner */}
      <Card style={styles.helpBanner}>
        <MaterialCommunityIcons
          name="phone-outline"
          size={24}
          color={colors.warning}
          style={styles.helpIcon}
        />
        <Text style={styles.helpTitle}>Need Legal Help?</Text>
        <Text style={styles.helpText}>
          Contact FIDA Tanzania or local legal aid organizations for assistance with your case.
        </Text>
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
    fontSize: fontSize.sm,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  infoBanner: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    backgroundColor: '#E3F2FD',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSize.sm,
    color: colors.primary,
    lineHeight: 18,
  },
  countrySection: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  countryTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.md,
    paddingLeft: spacing.sm,
  },
  lawCard: {
    marginBottom: spacing.md,
  },
  lawHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lawInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  lawTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  lawDesc: {
    fontSize: fontSize.sm,
    color: colors.gray,
  },
  lawContent: {
    marginTop: spacing.md,
  },
  contentDivider: {
    height: 1,
    backgroundColor: colors.light,
    marginBottom: spacing.md,
  },
  contentText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    lineHeight: 20,
  },
  helpBanner: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    backgroundColor: '#FFF3E0',
  },
  helpIcon: {
    marginBottom: spacing.sm,
  },
  helpTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.warning,
    marginBottom: spacing.xs,
  },
  helpText: {
    fontSize: fontSize.sm,
    color: colors.warning,
    lineHeight: 18,
  },
});
