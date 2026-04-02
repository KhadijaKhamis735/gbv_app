import React from 'react';
import { View, StyleSheet, Text, ScrollView, ImageBackground } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';

export default function OnboardingScreen({ navigation }) {
  const features = [
    {
      icon: 'file-document-outline',
      title: 'Report Incidents',
      description: 'Safely report gender-based violence incidents with media attachments',
    },
    {
      icon: 'heart-outline',
      title: 'Get Support',
      description: 'Access psychological support and connect with counselors',
    },
    {
      icon: 'phone-outline',
      title: 'Find Services',
      description: 'Locate nearby police, hospitals, and NGOs for immediate help',
    },
    {
      icon: 'book-outline',
      title: 'Learn Rights',
      description: 'Understand your rights and access legal information',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <MaterialCommunityIcons
          name="shield-heart-outline"
          size={80}
          color={colors.primary}
          style={styles.heroIcon}
        />
        <Text style={styles.heroTitle}>ZYGA</Text>
        <Text style={styles.heroSubtitle}>Zanzibar Youth Gender Alliance</Text>
        <Text style={styles.heroDescription}>
          A safe platform for reporting gender-based violence and accessing support services
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>How ZYGA Helps</Text>
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
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Trust Section */}
      <View style={styles.trustSection}>
        <MaterialCommunityIcons
          name="shield-check-outline"
          size={48}
          color={colors.success}
        />
        <Text style={styles.trustTitle}>Your Safety is Our Priority</Text>
        <Text style={styles.trustText}>
          • Completely confidential and secure
          {'\n'}• Your data is encrypted
          {'\n'}• Anonymous reporting option available
          {'\n'}• No one can access your information without permission
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Create Account"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
        />
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
          variant="outline"
          style={styles.button}
        />
        <Button
          title="Continue as Anonymous"
          onPress={() => {
            // Navigate to the app directly (will be handled by Auth context)
            navigation.navigate('Login');
          }}
          variant="ghost"
          style={styles.button}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By using ZYGA, you agree to our Terms of Service and Privacy Policy
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
  heroIcon: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: fontSize['4xl'],
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    fontSize: fontSize.lg,
    color: colors.gray,
    marginBottom: spacing.md,
    fontWeight: '500',
  },
  heroDescription: {
    fontSize: fontSize.base,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 22,
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
