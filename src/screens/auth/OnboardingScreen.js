import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';

export default function OnboardingScreen({ navigation }) {
  const { t } = useTranslation();

  const features = [
    {
      icon: 'file-document-outline',
      title: t('auth.featureReportTitle'),
      description: t('auth.featureReportDesc'),
    },
    {
      icon: 'heart-outline',
      title: t('auth.featureSupportTitle'),
      description: t('auth.featureSupportDesc'),
    },
    {
      icon: 'phone-outline',
      title: t('auth.featureServicesTitle'),
      description: t('auth.featureServicesDesc'),
    },
    {
      icon: 'book-outline',
      title: t('auth.featureRightsTitle'),
      description: t('auth.featureRightsDesc'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={require('../../assets/zyga-logo.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.heroDescription}>
          {t('auth.onboardingDescription')}
        </Text>
      </View>

      {/* Trust Section */}
      <View style={styles.trustSection}>
        <MaterialCommunityIcons
          name="shield-check-outline"
          size={48}
          color={colors.success}
        />
        <Text style={styles.trustTitle}>{t('auth.trustTitle')}</Text>
        <Text style={styles.trustText}>
          {t('auth.trustText')}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title={t('auth.register')}
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
        />
        <Button
          title={t('auth.login')}
          onPress={() => navigation.navigate('Login')}
          variant="outline"
          style={styles.button}
        />
        <Button
          title={t('auth.continueAnonymous')}
          onPress={() => {
            navigation.navigate('Login');
          }}
          variant="ghost"
          style={styles.button}
        />
      </View>

      {/* Features */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>{t('auth.howHelps')}</Text>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <MaterialCommunityIcons
                name={feature.icon}
                size={32}
                color={colors.primary}
              />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {t('auth.terms')}
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.md,
    backgroundColor: '#F8F9FA',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing.md,
  },
  heroDescription: {
    fontSize: fontSize.base,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: spacing.lg,
  },
  featuresSection: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.lg,
  },
  featureCard: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    alignItems: 'flex-start',
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: fontSize.sm,
    color: colors.gray,
    lineHeight: 18,
  },
  trustSection: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    alignItems: 'center',
  },
  trustTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.success,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  trustText: {
    fontSize: fontSize.sm,
    color: colors.success,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  button: {
    marginBottom: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: fontSize.xs,
    color: colors.mediumGray,
    textAlign: 'center',
    lineHeight: 18,
  },
});