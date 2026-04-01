import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize, EMERGENCY_CONTACTS } from '../../constants/colors';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Alert from '../../components/Alert';

export default function EmergencyContactScreen() {
  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleSMS = (phone) => {
    Linking.openURL(`sms:${phone}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Alert Banner */}
      <Alert
        type="error"
        title="Emergency Contact"
        message="In immediate danger? Call emergency services now!"
        style={styles.emergencyAlert}
      />

      {/* Quick Call Buttons */}
      <View style={styles.quickCallSection}>
        <Text style={styles.sectionTitle}>One-Tap Emergency Call</Text>
        <View style={styles.quickCallButtons}>
          <TouchableOpacity
            style={[styles.quickButton, styles.policeButton]}
            onPress={() => handleCall('112')}
          >
            <MaterialCommunityIcons
              name="police-box"
              size={28}
              color={colors.white}
            />
            <Text style={styles.quickButtonLabel}>Police</Text>
            <Text style={styles.quickButtonNumber}>112</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickButton, styles.ambulanceButton]}
            onPress={() => handleCall('995')}
          >
            <MaterialCommunityIcons
              name="ambulance"
              size={28}
              color={colors.white}
            />
            <Text style={styles.quickButtonLabel}>Medical</Text>
            <Text style={styles.quickButtonNumber}>995</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickButton, styles.fireButton]}
            onPress={() => handleCall('114')}
          >
            <MaterialCommunityIcons
              name="fire-truck"
              size={28}
              color={colors.white}
            />
            <Text style={styles.quickButtonLabel}>Fire</Text>
            <Text style={styles.quickButtonNumber}>114</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Emergency Contacts List */}
      <View style={styles.contactsSection}>
        <Text style={styles.sectionTitle}>Emergency Services</Text>

        {EMERGENCY_CONTACTS.map((contact) => (
          <Card key={contact.id} style={styles.contactCard}>
            <View style={styles.contactHeader}>
              <View>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactCountry}>{contact.country}</Text>
              </View>
              <View style={styles.contactBadge}>
                <MaterialCommunityIcons
                  name="phone"
                  size={20}
                  color={colors.white}
                />
              </View>
            </View>

            <View style={styles.contactNumber}>
              <Text style={styles.numberLabel}>Phone:</Text>
              <Text style={styles.numberValue}>{contact.phone}</Text>
            </View>

            <View style={styles.contactActions}>
              <Button
                title="Call"
                onPress={() => handleCall(contact.phone)}
                variant="primary"
                size="sm"
                style={styles.actionButton}
              />
              <Button
                title="Text"
                onPress={() => handleSMS(contact.phone)}
                variant="outline"
                size="sm"
                style={styles.actionButton}
              />
            </View>
          </Card>
        ))}
      </View>

      {/* Tips Section */}
      <Card style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Safety Tips</Text>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.tipText}>
            Stay calm and provide clear information to emergency responders
          </Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.tipText}>
            Go to a safe place before calling if possible
          </Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.tipText}>
            Keep someone you trust informed about your location
          </Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.tipText}>
            Save important phone numbers in your contacts
          </Text>
        </View>
      </Card>

      {/* Support Services Info */}
      <Card style={styles.supportCard}>
        <MaterialCommunityIcons
          name="heart-outline"
          size={24}
          color={colors.primary}
          style={styles.supportIcon}
        />
        <Text style={styles.supportTitle}>After Reaching Safety</Text>
        <Text style={styles.supportText}>
          Connect with support services, counselors, and legal aid to help you recover and plan next steps.
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
  emergencyAlert: {
    margin: spacing.md,
  },
  quickCallSection: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.lg,
  },
  quickCallButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  quickButton: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  policeButton: {
    backgroundColor: colors.primary,
  },
  ambulanceButton: {
    backgroundColor: colors.danger,
  },
  fireButton: {
    backgroundColor: colors.warning,
  },
  quickButtonLabel: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  quickButtonNumber: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  contactsSection: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  contactCard: {
    marginBottom: spacing.md,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  contactName: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.dark,
  },
  contactCountry: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  contactBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactNumber: {
    marginBottom: spacing.md,
  },
  numberLabel: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  numberValue: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.primary,
  },
  contactActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  tipsCard: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    backgroundColor: '#E8F5E9',
  },
  tipsTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  tipText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSize.sm,
    color: colors.dark,
    lineHeight: 18,
  },
  supportCard: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
  },
  supportIcon: {
    marginBottom: spacing.md,
  },
  supportTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  supportText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
