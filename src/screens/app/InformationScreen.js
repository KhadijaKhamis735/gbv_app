import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize } from '../../constants/colors';
import Card from '../../components/Card';

export default function InformationScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('policies');

  const tabs = [
    { id: 'policies', label: 'International Policies' },
    { id: 'rights', label: 'Human Rights' },
  ];

  const menuItems = [
    {
      id: 'policies',
      items: [
        {
          title: 'Istanbul Convention',
          desc: 'Council of Europe',
          action: () => navigation.navigate('InternationalPolicies'),
        },
        {
          title: 'CEDAW',
          desc: 'UN Convention',
          action: () => navigation.navigate('InternationalPolicies'),
        },
        {
          title: 'Beijing Declaration',
          desc: 'UN Platform',
          action: () => navigation.navigate('InternationalPolicies'),
        },
      ],
    },
    {
      id: 'rights',
      items: [
        {
          title: 'Right to Life',
          desc: 'Protected by law',
          action: () => navigation.navigate('HumanRights'),
        },
        {
          title: 'Freedom from Torture',
          desc: 'Fundamental right',
          action: () => navigation.navigate('HumanRights'),
        },
        {
          title: 'Equality Rights',
          desc: 'Non-discrimination',
          action: () => navigation.navigate('HumanRights'),
        },
      ],
    },
  ];

  const currentItems =
    menuItems.find((m) => m.id === activeTab)?.items || [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Education & Information</Text>
        <Text style={styles.headerSubtitle}>
          Learn about your rights and protections
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
        {currentItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.action}
            style={styles.itemTouchable}
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
          </TouchableOpacity>
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
            This information is provided for educational purposes to help you understand your rights and available protections.
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
  itemCard: {
    padding: spacing.md,
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
});
