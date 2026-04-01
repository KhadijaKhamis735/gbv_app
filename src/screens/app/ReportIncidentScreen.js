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

export default function ReportIncidentScreen({ navigation }) {
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
        title: 'Permission Denied',
        message: 'We need permission to access your location',
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
        title: 'Location Added',
        message: 'Your current location has been added',
      });
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Location Error',
        message: 'Could not get your location',
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
        title: 'No Media or Location',
        message:
          'Consider adding media (photos) or your location for better support',
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
        title: 'Report Submitted',
        message: 'Your incident has been recorded. Support services will contact you soon.',
      });

      // Reset form
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Submission Failed',
        message: error.message || 'Failed to submit your report',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeMedia = (id) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
  };

  if (loading && currentStep > 2) {
    return <LoadingIndicator message="Submitting your report..." />;
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
          Details
        </Text>
        <Text
          style={[styles.stepLabel, currentStep === 2 && styles.activeStep]}
        >
          Media & Location
        </Text>
        <Text
          style={[styles.stepLabel, currentStep === 3 && styles.activeStep]}
        >
          Review
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
          <Text style={styles.stepTitle}>Tell Us What Happened</Text>

          <Input
            label="Incident Title"
            placeholder="Brief summary of the incident"
            value={incident.title}
            onChangeText={(text) => setIncident({ ...incident, title: text })}
            error={errors.title}
            icon="pencil-outline"
          />

          <Input
            label="Detailed Description"
            placeholder="Provide more details about what happened"
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
            label="Type of GBV"
            placeholder="Select the type of violence"
            value={incident.type}
            onValueChange={(type) =>
              setIncident({ ...incident, type })
            }
            items={GBV_TYPES}
            error={errors.type}
          />

          <Input
            label="Date of Incident"
            placeholder="Date"
            value={incident.date}
            onChangeText={(text) => setIncident({ ...incident, date: text })}
            icon="calendar-outline"
            rightIcon="calendar"
            onRightIconPress={handleSetCurrentDate}
            editable={false}
          />

          <Input
            label="Time of Incident"
            placeholder="Time"
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
          <Text style={styles.stepTitle}>Add Media & Location (Optional)</Text>

          {/* Media */}
          <Card>
            <Text style={styles.subsectionTitle}>Upload Media</Text>
            <Text style={styles.subsectionDescription}>
              Add photos, videos, or audio recordings as evidence
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
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
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
              title={`Add Photo ${mediaItems.length > 0 ? '(' + mediaItems.length + ')' : ''}`}
              onPress={handleAddPhoto}
              variant="outline"
              size="sm"
              style={styles.mediaButton}
            />
          </Card>

          {/* Location */}
          <Card style={styles.locationCard}>
            <Text style={styles.subsectionTitle}>Add Location</Text>
            <Text style={styles.subsectionDescription}>
              Your current location helps services find you
            </Text>

            {incident.location && (
              <View style={styles.locationInfo}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={24}
                  color={colors.success}
                />
                <Text style={styles.locationText}>
                  Location added: {incident.location.lat.toFixed(4)},{' '}
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
              title={incident.location ? 'Update Location' : 'Add Current Location'}
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
          <Text style={styles.stepTitle}>Review Your Report</Text>

          <Card>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>Title</Text>
              <Text style={styles.reviewValue}>{incident.title}</Text>
            </View>

            <View style={styles.reviewDivider} />

            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>Type</Text>
              <Text style={styles.reviewValue}>
                {GBV_TYPES.find(t => t.value === incident.type)?.label}
              </Text>
            </View>

            <View style={styles.reviewDivider} />

            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>Description</Text>
              <Text style={styles.reviewValue}>{incident.description}</Text>
            </View>

            <View style={styles.reviewDivider} />

            <View style={styles.reviewItem}>
              <Text style={styles.reviewLabel}>Date & Time</Text>
              <Text style={styles.reviewValue}>
                {incident.date} at {incident.time}
              </Text>
            </View>

            {mediaItems.length > 0 && (
              <>
                <View style={styles.reviewDivider} />
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Media Attached</Text>
                  <Text style={styles.reviewValue}>
                    {mediaItems.length} file(s)
                  </Text>
                </View>
              </>
            )}

            {incident.location && (
              <>
                <View style={styles.reviewDivider} />
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Location Shared</Text>
                  <Text style={styles.reviewValue}>Yes</Text>
                </View>
              </>
            )}
          </Card>

          <Alert
            type="info"
            title="Before You Submit"
            message="Please ensure all information is accurate. Your report will be confidential."
            style={styles.alert}
          />
        </View>
      )}

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {currentStep > 1 && (
          <Button
            title="Back"
            onPress={() => setCurrentStep(currentStep - 1)}
            variant="outline"
            style={styles.navButton}
          />
        )}

        {currentStep < 3 ? (
          <Button
            title="Next"
            onPress={handleNextStep}
            style={[styles.navButton, currentStep === 1 && styles.fullButton]}
            disabled={currentStep === 1 && !isStepOneComplete()}
          />
        ) : (
          <Button
            title="Submit Report"
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
