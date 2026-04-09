import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import Alert from '../../components/Alert';
import { saveFeedback } from '../../services/storageService';
import { validateForm } from '../../utils/validation';

export default function FeedbackScreen({ navigation }) {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState({
    message: '',
    rating: 0,
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});

  const validateFeedbackForm = () => {
    const rules = {
      message: {
        required: true,
        minLength: 10,
      },
    };

    const validation = validateForm({ message: feedback.message }, rules);
    setErrors(validation.errors);
    return validation.isValid && feedback.rating > 0;
  };

  const handleSubmit = async () => {
    if (!validateFeedbackForm()) {
      if (feedback.rating === 0) {
        setAlert({
          type: 'error',
          title: t('feedback.ratingRequiredTitle'),
          message: t('feedback.ratingRequiredMessage'),
        });
      }
      return;
    }

    setLoading(true);
    try {
      await saveFeedback(feedback);

      setAlert({
        type: 'success',
        title: t('feedback.thankYouTitle'),
        message: t('feedback.thankYouMessage'),
      });

      setTimeout(() => {
        setFeedback({ message: '', rating: 0 });
        navigation.goBack();
      }, 2000);
    } catch (error) {
      setAlert({
        type: 'error',
        title: t('feedback.errorTitle'),
        message: t('feedback.errorMessage'),
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setFeedback({ ...feedback, rating: star })}
            style={styles.starButton}
          >
            <MaterialCommunityIcons
              name={feedback.rating >= star ? 'star' : 'star-outline'}
              size={40}
              color={feedback.rating >= star ? colors.accent : colors.mediumGray}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <MaterialCommunityIcons
          name="comment-smile-outline"
          size={40}
          color={colors.primary}
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>{t('feedback.headerTitle')}</Text>
        <Text style={styles.headerSubtitle}>
          {t('feedback.headerSubtitle')}
        </Text>
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
        {/* Rating */}
        <Card>
          <Text style={styles.formLabel}>{t('feedback.rateExperience')}</Text>
          {renderStars()}
        </Card>

        {/* Message */}
        <Input
          label={t('feedback.yourFeedback')}
          placeholder={t('feedback.placeholder')}
          value={feedback.message}
          onChangeText={(text) => setFeedback({ ...feedback, message: text })}
          error={errors.message}
          multiline
          numberOfLines={6}
          icon="pencil-outline"
        />

        {/* Submit Button */}
        <Button
          title={t('home.sendFeedback')}
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.submitButton}
        />
      </View>

      {/* Info */}
      <Card style={styles.infoCard}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.infoText}>
            {t('feedback.infoAnonymous')}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.infoText}>
            {t('feedback.infoActOnFeedback')}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.infoText}>
            {t('feedback.infoPrivacy')}
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const { TouchableOpacity } = require('react-native');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  headerCard: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
  },
  headerIcon: {
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.primary,
    textAlign: 'center',
  },
  alert: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  formContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  formLabel: {
    fontSize: spacing.base,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  starButton: {
    padding: spacing.sm,
  },
  submitButton: {
    marginTop: spacing.lg,
  },
  infoCard: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    backgroundColor: '#E8F5E9',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSize.sm,
    color: colors.success,
  },
});
