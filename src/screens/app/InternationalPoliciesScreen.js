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
import { mockInternationalPolicies } from '../../data/mockData';

export default function InternationalPoliciesScreen() {
  const [expandedPolicies, setExpandedPolicies] = useState({});

  const togglePolicy = (policyId) => {
    setExpandedPolicies((prev) => ({
      ...prev,
      [policyId]: !prev[policyId],
    }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>International Policies</Text>
        <Text style={styles.headerSubtitle}>
          Global agreements protecting women's rights
        </Text>
      </View>

      {/* Policies */}
      <View style={styles.content}>
        {mockInternationalPolicies.map((policy) => (
          <TouchableOpacity
            key={policy.id}
            onPress={() => togglePolicy(policy.id)}
            activeOpacity={0.7}
          >
            <Card style={styles.policyCard}>
              <View style={styles.policyHeader}>
                <View style={styles.policyInfo}>
                  <Text style={styles.policyTitle}>{policy.title}</Text>
                  <Text style={styles.policyOrg}>{policy.organization}</Text>
                </View>
                <MaterialCommunityIcons
                  name={
                    expandedPolicies[policy.id]
                      ? 'chevron-up'
                      : 'chevron-down'
                  }
                  size={24}
                  color={colors.primary}
                />
              </View>

              {expandedPolicies[policy.id] && (
                <View style={styles.policyContent}>
                  <View style={styles.contentDivider} />
                  <Text style={styles.contentText}>{policy.content}</Text>
                </View>
              )}
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {/* Info Banner */}
      <Card style={styles.infoBanner}>
        <View style={styles.bannerContent}>
          <MaterialCommunityIcons
            name="globe-model"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.bannerText}>
            These international policies provide a framework for protecting women's rights globally.
          </Text>
        </View>
      </Card>

      {/* Resources */}
      <Card style={styles.resourcesCard}>
        <Text style={styles.resourcesTitle}>Learn More</Text>
        <View style={styles.resourceItem}>
          <MaterialCommunityIcons
            name="link"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.resourceText}>
            Visit UN Women for more information
          </Text>
        </View>
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
  policyCard: {
    marginBottom: spacing.md,
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  policyInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  policyTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  policyOrg: {
    fontSize: fontSize.sm,
    color: colors.gray,
  },
  policyContent: {
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
  infoBanner: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    backgroundColor: '#E3F2FD',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSize.sm,
    color: colors.primary,
    lineHeight: 18,
  },
  resourcesCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  resourcesTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.md,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceText: {
    marginLeft: spacing.md,
    fontSize: fontSize.sm,
    color: colors.gray,
  },
});
