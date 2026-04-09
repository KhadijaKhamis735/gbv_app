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
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize, borderRadius } from '../../constants/colors';
import { UserContext } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';

export default function SettingsScreen({ navigation }) {
  const { t } = useTranslation();
  const { language, setAppLanguage } = useLanguage();
  const { user, setUser } = useContext(UserContext);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [locationEnabled, setLocationEnabled] = React.useState(false);

  const handleClearData = () => {
    Alert.alert(
      t('settings.clearDataConfirmTitle'),
      t('settings.clearDataConfirmMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.clear'),
          onPress: () => {
            Alert.alert(t('common.success'), t('settings.allDataCleared'));
          },
          style: 'destructive',
        },
      ]
    );
  };

  const changeLanguage = async (nextLanguage) => {
    await setAppLanguage(nextLanguage);
    Alert.alert(t('common.success'), t('language.changed'));
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
        <SectionTitle title={t('settings.account')} />
        <View style={styles.card}>
          <SettingRow
            icon="account-circle"
            label={t('settings.editProfile')}
            value={<MaterialCommunityIcons name="chevron-right" size={24} color={colors.gray} />}
            onPress={() => navigation.navigate('Profile')}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="email"
            label={t('settings.email')}
            value={
              <Text style={styles.valueText}>
                {user?.email || t('common.notProvided')}
              </Text>
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="phone"
            label={t('settings.phone')}
            value={
              <Text style={styles.valueText}>
                {user?.phone || t('common.notProvided')}
              </Text>
            }
          />
        </View>
      </View>

      {/* LANGUAGE SECTION */}
      <View style={styles.section}>
        <SectionTitle title={t('language.section')} />
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.settingRow}
            activeOpacity={0.8}
            onPress={() => changeLanguage('en')}
          >
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="alphabetical" size={24} color={colors.primary} />
              <Text style={styles.settingLabel}>{t('language.english')}</Text>
            </View>
            <MaterialCommunityIcons
              name={language === 'en' ? 'radiobox-marked' : 'radiobox-blank'}
              size={22}
              color={language === 'en' ? colors.primary : colors.gray}
            />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.settingRow}
            activeOpacity={0.8}
            onPress={() => changeLanguage('sw')}
          >
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="translate" size={24} color={colors.primary} />
              <Text style={styles.settingLabel}>{t('language.swahili')}</Text>
            </View>
            <MaterialCommunityIcons
              name={language === 'sw' ? 'radiobox-marked' : 'radiobox-blank'}
              size={22}
              color={language === 'sw' ? colors.primary : colors.gray}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* NOTIFICATIONS SECTION */}
      <View style={styles.section}>
        <SectionTitle title={t('settings.notifications')} />
        <View style={styles.card}>
          <ToggleSetting
            icon="bell-outline"
            label={t('settings.pushNotifications')}
            value={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
          <View style={styles.divider} />
          <ToggleSetting
            icon="email-outline"
            label={t('settings.emailAlerts')}
            value={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
          <View style={styles.divider} />
          <ToggleSetting
            icon="sms"
            label={t('settings.smsAlerts')}
            value={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
        </View>
      </View>

      {/* PRIVACY & SECURITY */}
      <View style={styles.section}>
        <SectionTitle title={t('settings.privacy')} />
        <View style={styles.card}>
          <ToggleSetting
            icon="map-marker-outline"
            label={t('settings.locationTracking')}
            value={locationEnabled}
            onChange={setLocationEnabled}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="lock-outline"
            label={t('settings.changePassword')}
            value={<MaterialCommunityIcons name="chevron-right" size={24} color={colors.gray} />}
            onPress={() => Alert.alert(t('settings.changePassword'), t('settings.changePasswordSoon'))}
          />
        </View>
      </View>

      {/* APP SECTION */}
      <View style={styles.section}>
        <SectionTitle title={t('settings.app')} />
        <View style={styles.card}>
          <SettingRow
            icon="information-outline"
            label={t('settings.about')}
            value={<Text style={styles.versionText}>v1.0.0</Text>}
            onPress={() => Alert.alert(t('settings.about'), `${t('common.appName')}\n${t('settings.versionLabel')} 1.0.0`)}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="file-document-outline"
            label={t('settings.privacyPolicy')}
            value={<MaterialCommunityIcons name="open-in-new" size={20} color={colors.gray} />}
            onPress={() => Alert.alert(t('settings.privacyPolicy'), t('settings.privacyPolicy'))}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="text-box-outline"
            label={t('settings.terms')}
            value={<MaterialCommunityIcons name="open-in-new" size={20} color={colors.gray} />}
            onPress={() => Alert.alert(t('settings.terms'), t('settings.terms'))}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="lifebuoy"
            label={t('settings.helpSupport')}
            value={<MaterialCommunityIcons name="chevron-right" size={24} color={colors.gray} />}
            onPress={() => navigation.navigate('Feedback')}
          />
        </View>
      </View>

      {/* DATA MANAGEMENT */}
      <View style={styles.section}>
        <SectionTitle title={t('settings.data')} />
        <View style={styles.card}>
          <SettingRow
            icon="trash-can-outline"
            label={t('settings.clearCache')}
            value={<MaterialCommunityIcons name="chevron-right" size={24} color={colors.gray} />}
            onPress={() => Alert.alert(t('common.success'), t('settings.cacheCleared'))}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="close-circle-outline"
            label={t('settings.clearData')}
            value={<MaterialCommunityIcons name="chevron-right" size={24} color={colors.danger} />}
            onPress={handleClearData}
          />
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ZYGA v1.0.0</Text>
        <Text style={styles.footerSubText}>{t('settings.footerOrg')}</Text>
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
