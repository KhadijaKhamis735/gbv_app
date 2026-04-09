import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { UserContext } from '../../context/UserContext';
import { saveUser } from '../../services/storageService';

export default function ProfileScreen({ navigation }) {
  const { t } = useTranslation();
  const { user, setUser } = useContext(UserContext);
  const [editingProfile, setEditingProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setEditingProfile({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) {
      Alert.alert(t('feedback.errorTitle'), t('profile.profileUpdateFailed'));
      return;
    }

    setSaving(true);
    try {
      const updatedUser = {
        ...user,
        name: editingProfile.name.trim(),
        email: editingProfile.email.trim(),
        phone: editingProfile.phone.trim(),
      };

      await saveUser(updatedUser);
      setUser(updatedUser);
      Alert.alert(t('common.success'), t('profile.profileUpdated'));
    } catch (error) {
      Alert.alert(t('feedback.errorTitle'), t('profile.profileUpdateFailed'));
    } finally {
      setSaving(false);
    }
  };

  const profileItems = [
    {
      id: 1,
      icon: 'email-outline',
      label: t('settings.email'),
      value: user?.email || t('common.notProvided'),
    },
    {
      id: 2,
      icon: 'phone-outline',
      label: t('settings.phone'),
      value: user?.phone || t('common.notProvided'),
    },
    {
      id: 3,
      icon: 'calendar-outline',
      label: t('profile.memberSince'),
      value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : t('profile.unknown'),
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
          {user?.isAnonymous ? t('common.anonymousUser') : (user?.name || t('profile.user'))}
        </Text>
        {user?.isAnonymous && (
          <View style={styles.anonymousBadge}>
            <MaterialCommunityIcons
              name="incognito"
              size={16}
              color={colors.primary}
            />
            <Text style={styles.anonymousText}>{t('profile.anonymousMode')}</Text>
          </View>
        )}
      </Card>

      {/* Profile Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.profileInformation')}</Text>
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

      {/* Edit Profile */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.editProfile')}</Text>
        <Card style={styles.editCard}>
          <Input
            label={t('profile.nameLabel')}
            placeholder={t('profile.namePlaceholder')}
            value={editingProfile.name}
            onChangeText={(text) => setEditingProfile((prev) => ({ ...prev, name: text }))}
            icon="account-outline"
          />
          <Input
            label={t('settings.email')}
            placeholder={t('profile.emailPlaceholder')}
            value={editingProfile.email}
            onChangeText={(text) => setEditingProfile((prev) => ({ ...prev, email: text }))}
            icon="email-outline"
            keyboardType="email-address"
          />
          <Input
            label={t('settings.phone')}
            placeholder={t('profile.phonePlaceholder')}
            value={editingProfile.phone}
            onChangeText={(text) => setEditingProfile((prev) => ({ ...prev, phone: text }))}
            icon="phone-outline"
            keyboardType="phone-pad"
          />
          <Button
            title={t('profile.saveChanges')}
            onPress={handleSaveProfile}
            loading={saving}
            disabled={saving}
            style={styles.saveButton}
          />
        </Card>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.about')}</Text>
        <Card style={styles.aboutCard}>
          <Text style={styles.appName}>ZYGA v1.0.0</Text>
          <Text style={styles.appTagline}>
            {t('profile.appTagline')}
          </Text>
          <View style={styles.divider} />
          <Text style={styles.aboutText}>
            {t('profile.aboutText')}
          </Text>
        </Card>
      </View>

      {/* Help */}
      <Card style={styles.helpCard}>
        <MaterialCommunityIcons
          name="help-circle-outline"
          size={24}
          color={colors.info}
          style={styles.helpIcon}
        />
        <Text style={styles.helpTitle}>{t('profile.needHelp')}</Text>
        <Text style={styles.helpText}>
          {t('profile.helpText')}
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
  editCard: {
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
  saveButton: {
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
