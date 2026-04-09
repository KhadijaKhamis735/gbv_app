import React, { useState } from 'react';
import { Alert, View, StyleSheet, ScrollView, Text, TouchableOpacity, Pressable, Linking } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { mockInternationalPolicies } from '../../data/mockData';

export default function InformationScreen({ navigation }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('policies');
  const [expandedPolicies, setExpandedPolicies] = useState({});
  const learnMoreUrl = 'https://www.unwomen.org/en/what-we-do/ending-violence-against-women';

  const findNavigatorWithRoute = (routeName) => {
    let currentNav = navigation;

    while (currentNav) {
      const state = currentNav.getState?.();
      if (state?.routeNames?.includes(routeName)) {
        return currentNav;
      }
      currentNav = currentNav.getParent?.();
    }

    return null;
  };

  const navigateToDocument = (params) => {
    const stackNav = findNavigatorWithRoute('InfoDocument');
    if (stackNav) {
      stackNav.navigate('InfoDocument', params);
      return;
    }

    const drawerNav = findNavigatorWithRoute('Info Document');
    if (drawerNav) {
      drawerNav.navigate('Info Document', params);
      return;
    }

    Alert.alert('Navigation Error', 'Could not open document. Please try again.');
  };

  const togglePolicy = (policyId) => {
    setExpandedPolicies((prev) => ({
      ...prev,
      [policyId]: !prev[policyId],
    }));
  };

  const handleLearnMore = async () => {
    try {
      await Linking.openURL(learnMoreUrl);
    } catch {
      Alert.alert('Unable to Open', 'Could not open the Learn More link.');
    }
  };

  const openDocument = ({ type, itemId, title }) => {
    navigateToDocument({
      type,
      itemId,
      title,
    });
  };

  const tabs = [
    { id: 'policies', label: t('drawer.internationalPolicies') },
    { id: 'rights', label: t('drawer.humanRights') },
  ];

  const rightsItems = [
    {
      title: t('information.rightsItems.1.title'),
      desc: t('information.rightsItems.1.desc'),
      action: () =>
        openDocument({
          type: 'right',
          itemId: 1,
          title: t('information.rightsItems.1.title'),
        }),
    },
    {
      title: t('information.rightsItems.2.title'),
      desc: t('information.rightsItems.2.desc'),
      action: () =>
        openDocument({
          type: 'right',
          itemId: 2,
          title: t('information.rightsItems.2.title'),
        }),
    },
    {
      title: t('information.rightsItems.3.title'),
      desc: t('information.rightsItems.3.desc'),
      action: () =>
        openDocument({
          type: 'right',
          itemId: 3,
          title: t('information.rightsItems.3.title'),
        }),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('information.headerTitle')}</Text>
        <Text style={styles.headerSubtitle}>
          {t('information.headerSubtitle')}
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'policies' && mockInternationalPolicies.map((policy) => {
          const localizedPolicy = {
            ...policy,
            title: t(`policies.items.${policy.id}.title`, { defaultValue: policy.title }),
            organization: t(`policies.items.${policy.id}.organization`, { defaultValue: policy.organization }),
            content: t(`policies.items.${policy.id}.content`, { defaultValue: policy.content }),
          };

          return (
            <TouchableOpacity
              key={policy.id}
              onPress={() => togglePolicy(policy.id)}
              activeOpacity={0.7}
            >
              <Card style={styles.policyCard}>
                <View style={styles.policyHeader}>
                  <View style={styles.policyInfo}>
                    <Text style={styles.policyTitle}>{localizedPolicy.title}</Text>
                    <Text style={styles.policyOrg}>{localizedPolicy.organization}</Text>
                  </View>
                  <MaterialCommunityIcons
                    name={expandedPolicies[policy.id] ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={colors.primary}
                  />
                </View>

                {expandedPolicies[policy.id] && (
                  <View style={styles.policyContent}>
                    <View style={styles.contentDivider} />
                    <Text style={styles.contentText}>{localizedPolicy.content}</Text>
                  </View>
                )}
              </Card>
            </TouchableOpacity>
          );
        })}

        {activeTab === 'rights' && rightsItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={item.action}
            style={({ pressed }) => [
              styles.itemTouchable,
              pressed && styles.itemTouchablePressed,
            ]}
          >
            <Card style={styles.itemCard}>
              <View style={styles.itemContent}>
                <View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={colors.gray}
                />
              </View>
            </Card>
          </Pressable>
        ))}
      </View>

      {/* Info Banner */}
      <Card style={styles.infoBanner}>
        <View style={styles.bannerContent}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={colors.info}
          />
          <Text style={styles.bannerText}>
            {activeTab === 'policies' ? t('policies.infoBanner') : t('information.infoBanner')}
          </Text>
        </View>
      </Card>

      {activeTab === 'policies' && (
        <Card style={styles.resourcesCard}>
          <Text style={styles.resourcesTitle}>{t('policies.learnMore')}</Text>
          <View style={styles.resourceItem}>
            <MaterialCommunityIcons
              name="link"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.resourceText}>
              {t('policies.resourceText')}
            </Text>
          </View>
          <Button
            title={t('policies.learnMore')}
            onPress={handleLearnMore}
            style={styles.learnMoreButton}
          />
        </Card>
      )}
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
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    marginBottom: spacing.sm,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  itemTouchable: {
    marginBottom: spacing.md,
  },
  itemTouchablePressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
  itemCard: {
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#D9E2EC',
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
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  itemDesc: {
    fontSize: fontSize.sm,
    color: colors.gray,
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
    color: colors.info,
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
    flex: 1,
  },
  learnMoreButton: {
    marginTop: spacing.md,
  },
});
