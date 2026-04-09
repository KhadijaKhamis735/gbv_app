import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Pressable, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize, shadows } from '../../constants/colors';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { UserContext } from '../../context/UserContext';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t('greeting.morning'));
    else if (hour < 18) setGreeting(t('greeting.afternoon'));
    else setGreeting(t('greeting.evening'));
  }, [t]);

  const resources = [
    {
      id: 1,
      title: t('home.resourceGbvTitle'),
      description: t('home.resourceGbvDesc'),
      icon: 'information-outline',
      action: () => navigation.navigate('International Policies'),
    },
    {
      id: 2,
      title: t('home.resourceRightsTitle'),
      description: t('home.resourceRightsDesc'),
      icon: 'scale-balance',
      action: () => navigation.navigate('Human Rights'),
    },
    {
      id: 3,
      title: t('home.resourceStepsTitle'),
      description: t('home.resourceStepsDesc'),
      icon: 'directions-outline',
      action: () => navigation.navigate('ReportIncident'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Greeting Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}!</Text>
          <Text style={styles.userName}>
            {user?.isAnonymous ? t('common.anonymousUser') : (user?.name || t('common.welcome'))}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileButton}
        >
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={32}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Alert Banner */}
      <Card style={styles.alertCard}>
        <View style={styles.alertContent}>
          <MaterialCommunityIcons
            name="shield-alert-outline"
            size={24}
            color={colors.danger}
            style={styles.alertIcon}
          />
          <View style={styles.alertText}>
            <Text style={styles.alertTitle}>{t('home.safetyTitle')}</Text>
            <Text style={styles.alertDescription}>
              {t('home.safetyDescription')}
            </Text>
          </View>
        </View>
      </Card>

      {/* Resources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('home.resources')}</Text>
        {resources.map((resource) => (
          <Pressable
            key={resource.id}
            onPress={resource.action}
            accessibilityRole="button"
            android_ripple={{ color: 'rgba(30, 136, 229, 0.12)' }}
            style={({ pressed }) => [
              styles.resourcePressable,
              Platform.OS === 'ios' && pressed && styles.resourcePressed,
            ]}
          >
            <Card style={styles.resourceCard}>
              <View style={styles.resourceContent}>
                <MaterialCommunityIcons
                  name={resource.icon}
                  size={24}
                  color={colors.primary}
                  style={styles.resourceIcon}
                />
                <View style={styles.resourceText}>
                  <Text style={styles.resourceTitle}>{resource.title}</Text>
                  <Text style={styles.resourceDescription}>{resource.description}</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={colors.gray}
                />
              </View>
            </Card>
          </Pressable>
        ))}
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('home.recentActivity')}</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>{t('home.seeAll')}</Text>
          </TouchableOpacity>
        </View>
        <Card>
          <View style={styles.emptyActivity}>
            <MaterialCommunityIcons
              name="inbox-outline"
              size={40}
              color={colors.mediumGray}
            />
            <Text style={styles.emptyActivityText}>
              {t('home.noActivity')}
            </Text>
          </View>
        </Card>
      </View>

      {/* Support Banner */}
      <Card style={[styles.supportBanner, shadows.lg]}>
        <View style={styles.supportContent}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={32}
            color={colors.primary}
          />
          <View style={styles.supportText}>
            <Text style={styles.supportTitle}>{t('home.supportTitle')}</Text>
            <Text style={styles.supportDescription}>
              {t('home.supportDescription')}
            </Text>
          </View>
        </View>
        <Button
          title={t('home.getSupport')}
          onPress={() => navigation.navigate('SupportTab')}
          size="sm"
          style={styles.supportButton}
        />
      </Card>

      {/* Feedback */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Feedback')}
        style={styles.feedbackContainer}
      >
        <MaterialCommunityIcons
          name="comment-outline"
          size={20}
          color={colors.primary}
        />
        <Text style={styles.feedbackText}>{t('home.sendFeedback')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  greeting: {
    fontSize: fontSize.lg,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  userName: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.dark,
  },
  profileButton: {
    padding: spacing.xs,
  },
  alertCard: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    backgroundColor: '#FFF3E0',
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIcon: {
    marginRight: spacing.md,
  },
  alertText: {
    flex: 1,
  },
  alertTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  alertDescription: {
    fontSize: fontSize.sm,
    color: colors.gray,
  },
  section: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
  },
  seeAllText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.dark,
    textAlign: 'center',
  },
  resourceCard: {
    marginBottom: spacing.md,
  },
  resourcePressable: {
    borderRadius: 12,
  },
  resourcePressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  resourceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceIcon: {
    marginRight: spacing.md,
  },
  resourceText: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  resourceDescription: {
    fontSize: fontSize.sm,
    color: colors.gray,
  },
  emptyActivity: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyActivityText: {
    marginTop: spacing.md,
    fontSize: fontSize.base,
    color: colors.gray,
  },
  supportBanner: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    backgroundColor: '#E3F2FD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  supportContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  supportText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  supportTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.primary,
  },
  supportDescription: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  supportButton: {
    marginLeft: spacing.md,
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    marginBottom: spacing.xl,
  },
  feedbackText: {
    marginLeft: spacing.sm,
    fontSize: fontSize.base,
    color: colors.primary,
    fontWeight: '600',
  },
});
