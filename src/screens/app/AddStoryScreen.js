import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert as NativeAlert,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import Alert from '../../components/Alert';
import { UserContext } from '../../context/UserContext';
import { saveStory } from '../../services/storageService';
import { validateForm } from '../../utils/validation';

export default function AddStoryScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [story, setStory] = useState({
    title: '',
    content: '',
    author: '',
  });

  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});

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
        title: 'Permission Denied',
        message: 'We need permission to access your photos',
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

  const handleSubmit = async () => {
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
        title: 'Story Shared',
        message: 'Thank you for sharing your story. It will inspire others.',
      });

      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Error',
        message: error.message || 'Failed to share story',
      });
    } finally {
      setLoading(false);
    }
  };

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
            Share your story with consent. You can remain anonymous.
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
          label="Your Name or 'Anonymous'"
          placeholder="How would you like to be credited?"
          value={story.author}
          onChangeText={(text) => setStory({ ...story, author: text })}
          error={errors.author}
          icon="account-outline"
        />

        <Input
          label="Story Title"
          placeholder="Give your story a title"
          value={story.title}
          onChangeText={(text) => setStory({ ...story, title: text })}
          error={errors.title}
          icon="pencil-outline"
        />

        <Input
          label="Your Story"
          placeholder="Share your experience..."
          value={story.content}
          onChangeText={(text) => setStory({ ...story, content: text })}
          error={errors.content}
          multiline
          numberOfLines={8}
          icon="file-document-outline"
        />

        {/* Media Upload */}
        <Card style={styles.mediaSection}>
          <Text style={styles.mediaSectionTitle}>Add Photo (Optional)</Text>

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
            title={media ? 'Change Photo' : 'Add Photo'}
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
            Your story is important. We moderate all submissions to ensure safety and respect.
          </Text>
        </Card>

        {/* Submit Button */}
        <Button
          title="Share Story"
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
});
