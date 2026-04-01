import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { UserContext } from '../../context/UserContext';
import { clearUser } from '../../services/storageService';

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    clearUser();
    setUser(null);
  };

  const profileItems = [
    {
      id: 1,
      icon: 'email-outline',
      label: 'Email',
      value: user?.email || 'Not provided',
    },
    {
      id: 2,
      icon: 'phone-outline',
      label: 'Phone',
      value: user?.phone || 'Not provided',
    },
    {
      id: 3,
      icon: 'calendar-outline',
      label: 'Member Since',
      value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown',
    },
  ];

  const settingsItems = [
    {
      id: 1,
      icon: 'bell-outline',
      label: 'Notifications',
      onPress: () => {},
    },
    {
      id: 2,
      icon: 'shield-outline',
      label: 'Privacy & Security',
      onPress: () => {},
    },
    {
      id: 3,
      icon: 'file-document-outline',
      label: 'Terms & Conditions',
      onPress: () => Linking.openURL('https://example.com/terms'),
    },
    {
      id: 4,
      icon: 'lock-outline',
      label: 'Privacy Policy',
      onPress: () => Linking.openURL('https://example.com/privacy'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <Card style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={60}
              color={colors.primary}
            />
          </View>
        </View>
        <Text style={styles.profileName}>
          {user?.isAnonymous ? 'Anonymous User' : (user?.name || 'User')}
        </Text>
        {user?.isAnonymous && (
          <View style={styles.anonymousBadge}>
            <MaterialCommunityIcons
              name="incognito"
              size={16}
              color={colors.primary}
            />
            <Text style={styles.anonymousText}>Anonymous Mode</Text>
          </View>
        )}
      </Card>

      {/* Profile Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        {profileItems.map((item) => (
          <Card key={item.id} style={styles.infoCard}>
            <View style={styles.infoContent}>
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color={colors.primary}
                style={styles.icon}
              />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {settingsItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <Card style={styles.settingsCard}>
              <View style={styles.settingsContent}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={24}
                  color={colors.primary}
                  style={styles.icon}
                />
                <Text style={styles.settingsLabel}>{item.label}</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={colors.gray}
                />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Card style={styles.aboutCard}>
          <Text style={styles.appName}>ZYGA v1.0.0</Text>
          <Text style={styles.appTagline}>
            Gender-Based Violence Reporting & Support
          </Text>
          <View style={styles.divider} />
          <Text style={styles.aboutText}>
            ZYGA is a safe platform designed to support survivors of gender-based violence. We provide reporting, counseling, and resource connections with utmost confidentiality.
          </Text>
        </Card>
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <Button
          title="Change Password"
          variant="outline"
          style={styles.button}
        />
        <Button
          title="Download My Data"
          variant="outline"
          style={styles.button}
        />
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="danger"
          style={styles.button}
        />
      </View>

      {/* Help */}
      <Card style={styles.helpCard}>
        <MaterialCommunityIcons
          name="help-circle-outline"
          size={24}
          color={colors.info}
          style={styles.helpIcon}
        />
        <Text style={styles.helpTitle}>Need Help?</Text>
        <Text style={styles.helpText}>
          Contact our support team or visit our FAQ section for common questions.
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
  profileCard: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  anonymousBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primary + '20',
    borderRadius: 20,
  },
  anonymousText: {
    marginLeft: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.md,
  },
  infoCard: {
    marginBottom: spacing.md,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.md,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.dark,
  },
  settingsCard: {
    marginBottom: spacing.md,
  },
  settingsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingsLabel: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSize.base,
    color: colors.dark,
  },
  aboutCard: {
    marginBottom: spacing.md,
  },
  appName: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  appTagline: {
    fontSize: fontSize.sm,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.light,
    marginVertical: spacing.md,
  },
  aboutText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    lineHeight: 18,
    textAlign: 'center',
  },
  button: {
    marginBottom: spacing.md,
  },
  helpCard: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
  },
  helpIcon: {
    marginBottom: spacing.md,
  },
  helpTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.info,
    marginBottom: spacing.xs,
  },
  helpText: {
    fontSize: fontSize.sm,
    color: colors.info,
     textAlign: 'center',
    lineHeight: 18,
  },
});
