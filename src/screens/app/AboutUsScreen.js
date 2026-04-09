import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ZygaLogo from '../../components/ZygaLogo';

export default function AboutUsScreen({ navigation }) {
  const { t } = useTranslation();

  const goToReport = () => {
    navigation.getParent?.()?.navigate('HomeTab', { screen: 'ReportIncident' });
  };

  const goToSupport = () => {
    navigation.getParent?.()?.navigate('SupportTab');
  };

  const sections = [
    {
      icon: 'shield-heart-outline',
      title: t('aboutUs.missionTitle'),
      text: t('aboutUs.missionText'),
    },
    {
      icon: 'account-group-outline',
      title: t('aboutUs.whatWeDoTitle'),
      text: t('aboutUs.whatWeDoText'),
    },
    {
      icon: 'lock-outline',
      title: t('aboutUs.privacyTitle'),
      text: t('aboutUs.privacyText'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <ZygaLogo compact />
        <Text style={styles.heroText}>{t('aboutUs.heroText')}</Text>
      </View>

      <View style={styles.content}>
        {sections.map((section) => (
          <Card key={section.title} style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name={section.icon} size={24} color={colors.primary} />
              <Text style={styles.cardTitle}>{section.title}</Text>
            </View>
            <Text style={styles.cardText}>{section.text}</Text>
          </Card>
        ))}

        <Card style={styles.contactCard}>
          <Text style={styles.contactTitle}>{t('aboutUs.contactTitle')}</Text>
          <Text style={styles.contactText}>{t('aboutUs.contactText')}</Text>
          <Button
            title={t('aboutUs.getStarted')}
            onPress={goToReport}
            style={styles.button}
          />
          <TouchableOpacity onPress={goToSupport}>
            <Text style={styles.linkText}>{t('aboutUs.needHelp')}</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  hero: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  heroText: {
    marginTop: spacing.md,
    fontSize: fontSize.base,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    marginLeft: spacing.sm,
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
  },
  cardText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    lineHeight: 20,
  },
  contactCard: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    textAlign: 'center',
  },
  contactText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  button: {
    width: '100%',
    marginBottom: spacing.sm,
  },
  linkText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});
