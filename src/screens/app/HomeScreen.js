import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize, shadows } from '../../constants/colors';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { UserContext } from '../../context/UserContext';

export default function HomeScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const quickActions = [
    {
      id: 1,
      title: 'Report Now',
      icon: 'file-document-plus-outline',
      color: colors.danger,
      action: () => navigation.navigate('ReportIncident'),
    },
    {
      id: 2,
      title: 'Get Help',
      icon: 'phone-in-talk-outline',
      color: colors.primary,
      action: () => navigation.navigate('SupportTab'),
    },
    {
      id: 3,
      title: 'Local Laws',
      icon: 'book-outline',
      color: colors.accent,
      action: () => navigation.navigate('LocalLaws'),
    },
    {
      id: 4,
      title: 'Emergency',
      icon: 'alert-circle-outline',
      color: colors.warning,
      action: () => navigation.navigate('EmergencyContact'),
    },
  ];

  const resources = [
    {
      id: 1,
      title: 'What is GBV?',
      description: 'Learn about different forms of gender-based violence',
      icon: 'information-outline',
    },
    {
      id: 2,
      title: 'Your Rights',
      description: 'Know your legal rights and protections',
      icon: 'scale-balance',
    },
    {
      id: 3,
      title: 'First Steps',
      description: 'What to do if you or someone you know is affected',
      icon: 'directions-outline',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Greeting Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}!</Text>
          <Text style={styles.userName}>
            {user?.isAnonymous ? 'Anonymous User' : (user?.name || 'Welcome')}
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
            <Text style={styles.alertTitle}>Your Safety Matters</Text>
            <Text style={styles.alertDescription}>
              We're here to support you. Report confidentially.
            </Text>
          </View>
        </View>
      </Card>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, shadows.sm]}
              onPress={action.action}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: action.color + '15' }]}>
                <MaterialCommunityIcons
                  name={action.icon}
                  size={28}
                  color={action.color}
                />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Resources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resources</Text>
        {resources.map((resource) => (
          <Card key={resource.id} style={styles.resourceCard}>
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
        ))}
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
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
              No recent activity yet
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
            <Text style={styles.supportTitle}>Need Immediate Support?</Text>
            <Text style={styles.supportDescription}>
              Connect with counselors and local services
            </Text>
          </View>
        </View>
        <Button
          title="Get Support"
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
        <Text style={styles.feedbackText}>Send Feedback</Text>
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
