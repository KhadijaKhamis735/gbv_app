import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize } from '../../constants/colors';
import Card from '../../components/Card';
import { mockHumanRights } from '../../data/mockData';

export default function HumanRightsScreen() {
  const [expandedRights, setExpandedRights] = useState({});

  const toggleRight = (rightId) => {
    setExpandedRights((prev) => ({
      ...prev,
      [rightId]: !prev[rightId],
    }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Human Rights</Text>
        <Text style={styles.headerSubtitle}>
          Fundamental rights that protect you
        </Text>
      </View>

      {/* Rights */}
      <View style={styles.content}>
        {mockHumanRights.map((right) => (
          <TouchableOpacity
            key={right.id}
            onPress={() => toggleRight(right.id)}
            activeOpacity={0.7}
          >
            <Card style={styles.rightCard}>
              <View style={styles.rightHeader}>
                <View style={styles.rightIconContainer}>
                  <MaterialCommunityIcons
                    name="shield-heart-outline"
                    size={24}
                    color={colors.success}
                  />
                </View>
                <View style={styles.rightInfo}>
                  <Text style={styles.rightTitle}>{right.title}</Text>
                  <Text style={styles.rightDesc}>{right.description}</Text>
                </View>
                <MaterialCommunityIcons
                  name={
                    expandedRights[right.id]
                      ? 'chevron-up'
                      : 'chevron-down'
                  }
                  size={24}
                  color={colors.primary}
                />
              </View>

              {expandedRights[right.id] && (
                <View style={styles.rightContent}>
                  <View style={styles.contentDivider} />
                  <Text style={styles.contentText}>{right.content}</Text>
                </View>
              )}
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {/* Declaration Banner */}
      <Card style={styles.declarationBanner}>
        <MaterialCommunityIcons
          name="certificate-outline"
          size={28}
          color={colors.success}
          style={styles.bannerIcon}
        />
        <Text style={styles.bannerTitle}>Universal Declaration of Human Rights</Text>
        <Text style={styles.bannerText}>
          All humans are born free and equal in dignity and rights. These rights are inalienable and protected by international law.
        </Text>
      </Card>

      {/* Empowerment Tips */}
      <Card style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Know Your Rights</Text>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.tipText}>
            Your rights cannot be taken away because of your gender
          </Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.tipText}>
            You have the right to safety and protection from harm
          </Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.tipText}>
            You deserve respect, dignity, and equal opportunity
          </Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.tipText}>
            Seek help - there are resources and support available
          </Text>
        </View>
      </Card>

      {/* Support CTA */}
      <Card style={styles.supportCard}>
        <MaterialCommunityIcons
          name="heart-outline"
          size={28}
          color={colors.primary}
          style={styles.supportIcon}
        />
        <Text style={styles.supportTitle}>You Deserve Support</Text>
        <Text style={styles.supportText}>
          If your rights are being violated, reach out to support organizations and authorities who can help.
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
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.dark,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  rightCard: {
    marginBottom: spacing.md,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rightIconContainer: {
    marginRight: spacing.md,
    marginTop: spacing.xs,
  },
  rightInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  rightTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  rightDesc: {
    fontSize: fontSize.sm,
    color: colors.gray,
  },
  rightContent: {
    marginTop: spacing.md,
  },
  contentDivider: {
    height: 1,
    backgroundColor: colors.light,
    marginBottom: spacing.md,
  },
  contentText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    lineHeight: 20,
  },
  declarationBanner: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
  },
  bannerIcon: {
    marginBottom: spacing.md,
  },
  bannerTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.success,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  bannerText: {
    fontSize: fontSize.sm,
    color: colors.success,
    textAlign: 'center',
    lineHeight: 18,
  },
  tipsCard: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    backgroundColor: '#E3F2FD',
  },
  tipsTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.primary,
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
    color: colors.primary,
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
    marginBottom: spacing.sm,
  },
  supportText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
