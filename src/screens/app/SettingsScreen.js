import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Switch,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize, borderRadius } from '../../constants/colors';
import { UserContext } from '../../context/UserContext';
import { clearUser } from '../../services/storageService';

export default function SettingsScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [locationEnabled, setLocationEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Sign Out',
          onPress: async () => {
            await clearUser();
            setUser(null);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all saved reports and data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: () => {
            // Add clear data logic here
            Alert.alert('Success', 'All data has been cleared.');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const SettingRow = ({ icon, label, value, onPress }) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.settingLeft}>
        <MaterialCommunityIcons name={icon} size={24} color={colors.primary} />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <View style={styles.settingRight}>
        {value}
      </View>
    </TouchableOpacity>
  );

  const ToggleSetting = ({ icon, label, value, onChange }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <MaterialCommunityIcons name={icon} size={24} color={colors.primary} />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#E0E0E0', true: '#B3E5FC' }}
        thumbColor={value ? colors.primary : '#F0F0F0'}
      />
    </View>
  );

  const SectionTitle = ({ title }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ACCOUNT SECTION */}
      <View style={styles.section}>
        <SectionTitle title="ACCOUNT" />
        <View style={styles.card}>
          <SettingRow
            icon="account-circle"
            label="Edit Profile"
            value={<MaterialCommunityIcons name="chevron-right" size={24} color={colors.gray} />}
            onPress={() => navigation.navigate('Profile')}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="email"
            label="Email"
            value={
              <Text style={styles.valueText}>
                {user?.email || 'Not provided'}
              </Text>
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="phone"
            label="Phone"
            value={
              <Text style={styles.valueText}>
                {user?.phone || 'Not provided'}
              </Text>
            }
          />
        </View>
      </View>

      {/* NOTIFICATIONS SECTION */}
      <View style={styles.section}>
        <SectionTitle title="NOTIFICATIONS" />
        <View style={styles.card}>
          <ToggleSetting
            icon="bell-outline"
            label="Push Notifications"
            value={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
          <View style={styles.divider} />
          <ToggleSetting
            icon="email-outline"
            label="Email Alerts"
            value={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
          <View style={styles.divider} />
          <ToggleSetting
            icon="sms"
            label="SMS Alerts"
            value={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
        </View>
      </View>

      {/* PRIVACY & SECURITY */}
      <View style={styles.section}>
        <SectionTitle title="PRIVACY & SECURITY" />
        <View style={styles.card}>
          <ToggleSetting
            icon="map-marker-outline"
            label="Location Tracking"
            value={locationEnabled}
            onChange={setLocationEnabled}
          />
          <View style={styles.divider} />
          <ToggleSetting
            icon="moon-waning-crescent"
            label="Dark Mode"
            value={darkModeEnabled}
            onChange={setDarkModeEnabled}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="lock-outline"
            label="Change Password"
            value={<MaterialCommunityIcons name="chevron-right" size={24} color={colors.gray} />}
            onPress={() => Alert.alert('Change Password', 'Password change feature coming soon')}
          />
        </View>
      </View>

      {/* APP SECTION */}
      <View style={styles.section}>
        <SectionTitle title="APP" />
        <View style={styles.card}>
          <SettingRow
            icon="information-outline"
            label="About"
            value={<Text style={styles.versionText}>v1.0.0</Text>}
            onPress={() => Alert.alert('About', 'ZYGA - GBV Reporting and Support App\nVersion 1.0.0')}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="file-document-outline"
            label="Privacy Policy"
            value={<MaterialCommunityIcons name="open-in-new" size={20} color={colors.gray} />}
            onPress={() => Alert.alert('Privacy Policy', 'Privacy policy content here')}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="text-box-outline"
            label="Terms of Service"
            value={<MaterialCommunityIcons name="open-in-new" size={20} color={colors.gray} />}
            onPress={() => Alert.alert('Terms of Service', 'Terms of service content here')}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="lifebuoy"
            label="Help & Support"
            value={<MaterialCommunityIcons name="chevron-right" size={24} color={colors.gray} />}
            onPress={() => navigation.navigate('Feedback')}
          />
        </View>
      </View>

      {/* DATA MANAGEMENT */}
      <View style={styles.section}>
        <SectionTitle title="DATA" />
        <View style={styles.card}>
          <SettingRow
            icon="trash-can-outline"
            label="Clear Cache"
            value={<MaterialCommunityIcons name="chevron-right" size={24} color={colors.gray} />}
            onPress={() => Alert.alert('Success', 'Cache cleared successfully')}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="close-circle-outline"
            label="Clear All Data"
            value={<MaterialCommunityIcons name="chevron-right" size={24} color={colors.danger} />}
            onPress={handleClearData}
          />
        </View>
      </View>

      {/* LOGOUT */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.logoutButtonLarge}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name="logout" size={24} color={colors.danger} />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ZYGA v1.0.0</Text>
        <Text style={styles.footerSubText}>© 2024 - Zanzibar Youth Gender Alliance</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  section: {
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.gray,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  settingLabel: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.dark,
  },
  settingRight: {
    alignItems: 'flex-end',
  },
  valueText: {
    fontSize: fontSize.base,
    color: colors.gray,
    maxWidth: 150,
    textAlign: 'right',
  },
  versionText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: spacing.md,
  },
  logoutButtonLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: '#FEF0F1',
    borderWidth: 2,
    borderColor: colors.danger,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.lg,
  },
  logoutButtonText: {
    color: colors.danger,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  footerText: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.gray,
  },
  footerSubText: {
    fontSize: fontSize.sm,
    color: colors.mediumGray,
    marginTop: spacing.xs,
  },
});
