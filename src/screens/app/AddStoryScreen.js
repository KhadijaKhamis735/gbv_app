import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import Alert from '../../components/Alert';
import { UserContext } from '../../context/UserContext';
import { saveStory } from '../../services/storageService';
import { validateForm } from '../../utils/validation';
import { clearUser } from '../../services/storageService';

export default function AddStoryScreen({ navigation }) {
  const { t } = useTranslation();
  const { user, setUser } = useContext(UserContext);
  const [story, setStory] = useState({
    title: '',
    content: '',
    author: '',
  });

  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});
  const isAnonymous = user?.isAnonymous;

  const validateStoryForm = () => {
    const rules = {
      author: {
        required: true,
        minLength: 2,
      },
      title: {
        required: true,
        minLength: 5,
      },
      content: {
        required: true,
        minLength: 20,
      },
    };

    const validation = validateForm(story, rules);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleAddMedia = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      setAlert({
        type: 'error',
        title: t('addStory.permissionDeniedTitle'),
        message: t('addStory.permissionDeniedMessage'),
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setMedia({
        type: 'image',
        uri: result.assets[0].uri,
      });
    }
  };

  const handleGoToAuth = async () => {
    await clearUser();
    setUser(null);
  };

  const handleSubmit = async () => {
    if (isAnonymous) {
      setAlert({
        type: 'warning',
        title: t('addStory.loginRequiredTitle'),
        message: t('addStory.loginRequiredMessage'),
      });
      return;
    }

    if (!validateStoryForm()) {
      return;
    }

    setLoading(true);
    try {
      const storyData = {
        ...story,
        media,
        userId: user?.id,
      };

      await saveStory(storyData);

      setAlert({
        type: 'success',
        title: t('addStory.storySharedTitle'),
        message: t('addStory.storySharedMessage'),
      });

      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      setAlert({
        type: 'error',
        title: t('addStory.errorTitle'),
        message: error.message || t('addStory.errorMessage'),
      });
    } finally {
      setLoading(false);
    }
  };

  if (isAnonymous) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Card style={styles.guestCard}>
          <MaterialCommunityIcons
            name="account-lock-outline"
            size={56}
            color={colors.primary}
            style={styles.guestIcon}
          />
          <Text style={styles.guestTitle}>{t('addStory.loginRequiredTitle')}</Text>
          <Text style={styles.guestText}>{t('addStory.loginRequiredMessage')}</Text>
          <Button
            title={t('addStory.goToAuth')}
            onPress={handleGoToAuth}
            style={styles.guestButton}
          />
          <TouchableOpacity onPress={() => navigation.navigate('SafeVoice')}>
            <Text style={styles.guestLink}>{t('addStory.viewStories')}</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Info Card */}
      <Card style={styles.infoCard}>
        <View style={styles.infoContent}>
          <MaterialCommunityIcons
            name="information-outline"
            size={20}
            color={colors.info}
          />
          <Text style={styles.infoText}>
            {t('addStory.infoText')}
          </Text>
        </View>
      </Card>

      {/* Alert */}
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
          style={styles.alert}
        />
      )}

      {/* Form */}
      <View style={styles.formContainer}>
        <Input
          label={t('addStory.nameLabel')}
          placeholder={t('addStory.namePlaceholder')}
          value={story.author}
          onChangeText={(text) => setStory({ ...story, author: text })}
          error={errors.author}
          icon="account-outline"
        />

        <Input
          label={t('addStory.titleLabel')}
          placeholder={t('addStory.titlePlaceholder')}
          value={story.title}
          onChangeText={(text) => setStory({ ...story, title: text })}
          error={errors.title}
          icon="pencil-outline"
        />

        <Input
          label={t('addStory.storyLabel')}
          placeholder={t('addStory.storyPlaceholder')}
          value={story.content}
          onChangeText={(text) => setStory({ ...story, content: text })}
          error={errors.content}
          multiline
          numberOfLines={8}
          icon="file-document-outline"
        />

        {/* Media Upload */}
        <Card style={styles.mediaSection}>
          <Text style={styles.mediaSectionTitle}>{t('addStory.addPhotoOptional')}</Text>

          {media && (
            <View style={styles.mediaPreview}>
              <View style={styles.mediaInfo}>
                <MaterialCommunityIcons
                  name="image"
                  size={24}
                  color={colors.primary}
                />
                <Text style={styles.mediaName} numberOfLines={1}>
                  {media.uri.split('/').pop()}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setMedia(null)}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={24}
                  color={colors.danger}
                />
              </TouchableOpacity>
            </View>
          )}

          <Button
            title={media ? t('addStory.changePhoto') : t('addStory.addPhoto')}
            onPress={handleAddMedia}
            variant="outline"
            size="sm"
            style={styles.mediaButton}
          />
        </Card>

        {/* Privacy Notice */}
        <Card style={styles.privacyCard}>
          <MaterialCommunityIcons
            name="shield-lock-outline"
            size={20}
            color={colors.success}
            style={styles.privacyIcon}
          />
          <Text style={styles.privacyText}>
            {t('addStory.privacyText')}
          </Text>
        </Card>

        {/* Submit Button */}
        <Button
          title={t('addStory.shareStory')}
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  infoCard: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    backgroundColor: '#E3F2FD',
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSize.sm,
    color: colors.info,
    lineHeight: 18,
  },
  alert: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  formContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  mediaSection: {
    marginBottom: spacing.lg,
  },
  mediaSectionTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.md,
  },
  mediaPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.light,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  mediaInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaName: {
    marginLeft: spacing.md,
    fontSize: fontSize.sm,
    color: colors.dark,
  },
  mediaButton: {
    marginTop: spacing.md,
  },
  privacyCard: {
    marginBottom: spacing.lg,
    backgroundColor: '#E8F5E9',
    flexDirection: 'row',
  },
  privacyIcon: {
    marginRight: spacing.md,
    marginTop: spacing.sm,
  },
  privacyText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.success,
    lineHeight: 18,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  guestCard: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.xl,
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  guestIcon: {
    marginBottom: spacing.md,
  },
  guestTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  guestText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  guestButton: {
    width: '100%',
    marginBottom: spacing.sm,
  },
  guestLink: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});
