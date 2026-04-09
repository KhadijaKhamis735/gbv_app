import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert as NativeAlert,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { colors, spacing, fontSize, GBV_TYPES } from '../../constants/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import Card from '../../components/Card';
import Alert from '../../components/Alert';
import LoadingIndicator from '../../components/LoadingIndicator';
import { UserContext } from '../../context/UserContext';
import { saveIncident } from '../../services/storageService';
import { incidentApi } from '../../services/apiService';
import { validateForm, formatDate, formatTime } from '../../utils/validation';
import { useTranslation } from 'react-i18next';

export default function ReportIncidentScreen({ navigation }) {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [incident, setIncident] = useState({
    title: '',
    description: '',
    type: '',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    location: null,
  });

  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const translatedGbvTypes = GBV_TYPES.map((item) => ({
    ...item,
    label: t(`reportIncident.types.${item.value}`),
  }));

  const handleSetCurrentDate = () => {
    setIncident({ ...incident, date: new Date().toLocaleDateString() });
  };

  const handleSetCurrentTime = () => {
    setIncident({
      ...incident,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const validateIncidentForm = () => {
    const rules = {
      title: {
        required: true,
        minLength: 5,
      },
      description: {
        required: true,
        minLength: 10,
      },
      type: {
        required: true,
      },
    };

    const validation = validateForm(incident, rules);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const isStepOneComplete = () => {
    const title = incident.title?.trim() || '';
    const description = incident.description?.trim() || '';
    const type = incident.type?.trim() || '';

    return title.length >= 5 && description.length >= 10 && type.length > 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!validateIncidentForm()) {
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const handleAddPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      setAlert({
        type: 'error',
        title: t('reportIncident.permissionDeniedTitle'),
        message: t('reportIncident.photoPermissionDeniedMessage'),
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
      setMediaItems([
        ...mediaItems,
        {
          id: Date.now(),
          type: 'image',
          uri: result.assets[0].uri,
        },
      ]);
    }
  };

  const handleAddLocation = async () => {
    const permissionResult = await Location.requestForegroundPermissionsAsync();
    
    if (!permissionResult.granted) {
      setAlert({
        type: 'error',
        title: t('reportIncident.permissionDeniedTitle'),
        message: t('reportIncident.locationPermissionDeniedMessage'),
      });
      return;
    }

    setLoading(true);
    try {
      const location = await Location.getCurrentPositionAsync({});
      setIncident({
        ...incident,
        location: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
      setAlert({
        type: 'success',
        title: t('reportIncident.locationAddedTitle'),
        message: t('reportIncident.locationAddedMessage'),
      });
    } catch (error) {
      setAlert({
        type: 'error',
        title: t('reportIncident.locationErrorTitle'),
        message: t('reportIncident.locationErrorMessage'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateIncidentForm()) {
      return;
    }

    if (mediaItems.length === 0 && !incident.location) {
      setAlert({
        type: 'warning',
        title: t('reportIncident.noMediaOrLocationTitle'),
        message: t('reportIncident.noMediaOrLocationMessage'),
      });
    }

    setLoading(true);
    try {
      const incidentData = {
        ...incident,
        userId: user?.id,
        media: mediaItems,
      };

      const savedIncident = await saveIncident(incidentData);
      await incidentApi.submitIncident(savedIncident);

      setAlert({
        type: 'success',
        title: t('reportIncident.reportSubmittedTitle'),
        message: t('reportIncident.reportSubmittedMessage'),
      });

      // Reset form
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      setAlert({
        type: 'error',
        title: t('reportIncident.submissionFailedTitle'),
        message: error.message || t('reportIncident.submissionFailedMessage'),
      });
    } finally {
      setLoading(false);
    }
  };

  const removeMedia = (id) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
  };

  if (loading && currentStep > 2) {
    return <LoadingIndicator message={t('reportIncident.submitting')} />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        {[1, 2, 3].map((step) => (
          <View key={step} style={styles.progressItem}>
            <View
              style={[
                styles.progressDot,
                {
                  backgroundColor:
                    step <= currentStep ? colors.primary : colors.light,
                },
              ]}
            >
              {step < currentStep && (
                <MaterialCommunityIcons
                  name="check"
                  size={12}
                  color={colors.white}
                />
              )}
              {step === currentStep && (
                <Text style={styles.progressText}>{step}</Text>
              )}
            </View>
            {step < 3 && (
              <View
                style={[
                  styles.progressLine,
                  {
                    backgroundColor:
                      step < currentStep ? colors.primary : colors.light,
                  },
                ]}
              />
            )}
          </View>
        ))}
      </View>

      {/* Step Indicators */}
      <View style={styles.stepIndicators}>
        <Text
          style={[styles.stepLabel, currentStep === 1 && styles.activeStep]}
        >
          {t('reportIncident.steps.details')}
        </Text>
        <Text
          style={[styles.stepLabel, currentStep === 2 && styles.activeStep]}
        >
          {t('reportIncident.steps.mediaLocation')}
        </Text>
        <Text
          style={[styles.stepLabel, currentStep === 3 && styles.activeStep]}
        >
          {t('reportIncident.steps.review')}
        </Text>
      </View>

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

      {/* Step 1: Details */}
      {currentStep === 1 && (
        <View style={styles.step}>
          <Text style={styles.stepTitle}>{t('reportIncident.step1Title')}</Text>

          <Input
            label={t('reportIncident.incidentTitleLabel')}
            placeholder={t('reportIncident.incidentTitlePlaceholder')}
            value={incident.title}
            onChangeText={(text) => setIncident({ ...incident, title: text })}
            error={errors.title}
            icon="pencil-outline"
          />

          <Input
            label={t('reportIncident.detailedDescriptionLabel')}
            placeholder={t('reportIncident.detailedDescriptionPlaceholder')}
            value={incident.description}
            onChangeText={(text) =>
              setIncident({ ...incident, description: text })
            }
            error={errors.description}
            multiline
            numberOfLines={5}
            icon="file-document-outline"
          />

          <Dropdown
            label={t('reportIncident.typeOfGbvLabel')}
            placeholder={t('reportIncident.typeOfGbvPlaceholder')}
            value={incident.type}
            onValueChange={(type) =>
              setIncident({ ...incident, type })
            }
            items={translatedGbvTypes}
            error={errors.type}
          />

          <Input
            label={t('reportIncident.dateOfIncidentLabel')}
            placeholder={t('reportIncident.datePlaceholder')}
            value={incident.date}
            onChangeText={(text) => setIncident({ ...incident, date: text })}
            icon="calendar-outline"
            rightIcon="calendar"
            onRightIconPress={handleSetCurrentDate}
            editable={false}
          />

          <Input
            label={t('reportIncident.timeOfIncidentLabel')}
            placeholder={t('reportIncident.timePlaceholder')}
            value={incident.time}
            onChangeText={(text) => setIncident({ ...incident, time: text })}
            icon="clock-outline"
            rightIcon="clock"
            onRightIconPress={handleSetCurrentTime}
            editable={false}
          />
        </View>
      )}

      {/* Step 2: Media & Location */}
      {currentStep === 2 && (
        <View style={styles.step}>
          <Text style={styles.stepTitle}>{t('reportIncident.step2Title')}</Text>

          {/* Media */}
          <Card>
            <Text style={styles.subsectionTitle}>{t('reportIncident.uploadMediaTitle')}</Text>
            <Text style={styles.subsectionDescription}>
              {t('reportIncident.uploadMediaDescription')}
            </Text>

            {mediaItems.length > 0 && (
              <View style={styles.mediaList}>
                {mediaItems.map((item) => (
                  <View key={item.id} style={styles.mediaItem}>
                    <MaterialCommunityIcons
                      name={
                        item.type === 'image'
                          ? 'image'
                          : item.type === 'video'
                          ? 'video'
                          : 'microphone'
                      }
                      size={24}
                      color={colors.primary}
                    />
                    <View style={styles.mediaInfo}>
                      <Text style={styles.mediaType}>
                        {t(`reportIncident.mediaTypes.${item.type}`)}
                      </Text>
                      <Text style={styles.mediaPath} numberOfLines={1}>
                        {item.uri.split('/').pop()}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => removeMedia(item.id)}>
                      <MaterialCommunityIcons
                        name="close-circle"
                        size={24}
                        color={colors.danger}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            <Button
              title={`${t('reportIncident.addPhoto')} ${mediaItems.length > 0 ? '(' + mediaItems.length + ')' : ''}`}
              onPress={handleAddPhoto}
              variant="outline"
              size="sm"
              style={styles.mediaButton}
            />
          </Card>

          {/* Location */}
          <Card style={styles.locationCard}>
            <Text style={styles.subsectionTitle}>{t('reportIncident.addLocationTitle')}</Text>
            <Text style={styles.subsectionDescription}>
              {t('reportIncident.addLocationDescription')}
            </Text>

            {incident.location && (
              <View style={styles.locationInfo}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={24}
                  color={colors.success}
                />
                <Text style={styles.locationText}>
                  {t('reportIncident.locationAddedPrefix')} {incident.location.lat.toFixed(4)},{' '}
                  {incident.location.lng.toFixed(4)}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setIncident({ ...incident, location: null })
                  }
                >
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={24}
                    color={colors.danger}
                  />
                </TouchableOpacity>
              </View>
            )}

            <Button
              title={incident.location ? t('reportIncident.updateLocation') : t('reportIncident.addCurrentLocation')}
              onPress={handleAddLocation}
              variant={incident.location ? 'secondary' : 'primary'}
              size="sm"
              loading={loading}
            />
          </Card>
        </View>
      )}

      {/* Step 3: Review */}
      {currentStep === 3 && (
        <View style={styles.step}>
          <Text style={styles.stepTitle}>{t('reportIncident.step3Title')}</Text>

          <Card>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>{t('reportIncident.review.title')}</Text>
              <Text style={styles.reviewValue}>{incident.title}</Text>
            </View>

            <View style={styles.reviewDivider} />

            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>{t('reportIncident.review.type')}</Text>
              <Text style={styles.reviewValue}>
                {translatedGbvTypes.find((item) => item.value === incident.type)?.label}
              </Text>
            </View>

            <View style={styles.reviewDivider} />

            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>{t('reportIncident.review.description')}</Text>
              <Text style={styles.reviewValue}>{incident.description}</Text>
            </View>

            <View style={styles.reviewDivider} />

            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>{t('reportIncident.review.dateTime')}</Text>
              <Text style={styles.reviewValue}>
                {t('reportIncident.review.atDateTime', { date: incident.date, time: incident.time })}
              </Text>
            </View>

            {mediaItems.length > 0 && (
              <>
                <View style={styles.reviewDivider} />
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>{t('reportIncident.review.mediaAttached')}</Text>
                  <Text style={styles.reviewValue}>
                    {t('reportIncident.review.mediaFiles', { count: mediaItems.length })}
                  </Text>
                </View>
              </>
            )}

            {incident.location && (
              <>
                <View style={styles.reviewDivider} />
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>{t('reportIncident.review.locationShared')}</Text>
                  <Text style={styles.reviewValue}>{t('reportIncident.review.yes')}</Text>
                </View>
              </>
            )}
          </Card>

          <Alert
            type="info"
            title={t('reportIncident.beforeSubmitTitle')}
            message={t('reportIncident.beforeSubmitMessage')}
            style={styles.alert}
          />
        </View>
      )}

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {currentStep > 1 && (
          <Button
            title={t('reportIncident.back')}
            onPress={() => setCurrentStep(currentStep - 1)}
            variant="outline"
            style={styles.navButton}
          />
        )}

        {currentStep < 3 ? (
          <Button
            title={t('reportIncident.next')}
            onPress={handleNextStep}
            style={[styles.navButton, currentStep === 1 && styles.fullButton]}
            disabled={currentStep === 1 && !isStepOneComplete()}
          />
        ) : (
          <Button
            title={t('reportIncident.submitReport')}
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={[styles.navButton, styles.submitButton]}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: fontSize.base,
  },
  progressLine: {
    width: 40,
    height: 2,
    marginHorizontal: spacing.sm,
  },
  stepIndicators: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
    justifyContent: 'space-around',
  },
  stepLabel: {
    fontSize: fontSize.sm,
    color: colors.gray,
    fontWeight: '500',
  },
  activeStep: {
    color: colors.primary,
    fontWeight: '700',
  },
  alert: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  step: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  stepTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.lg,
  },
  subsectionTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  subsectionDescription: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginBottom: spacing.md,
  },
  mediaList: {
    marginBottom: spacing.md,
  },
  mediaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  mediaInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  mediaType: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.dark,
  },
  mediaPath: {
    fontSize: fontSize.xs,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  mediaButton: {
    marginTop: spacing.md,
  },
  locationCard: {
    marginBottom: spacing.lg,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  locationText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSize.sm,
    color: colors.success,
  },
  reviewItem: {
    paddingVertical: spacing.md,
  },
  reviewLabel: {
    fontSize: fontSize.sm,
    color: colors.gray,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  reviewValue: {
    fontSize: fontSize.base,
    color: colors.dark,
    fontWeight: '500',
  },
  reviewDivider: {
    height: 1,
    backgroundColor: colors.light,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  navButton: {
    flex: 1,
  },
  fullButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.success,
  },
});
