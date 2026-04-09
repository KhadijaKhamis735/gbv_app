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
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { mockInternationalPolicies } from '../../data/mockData';

export default function InternationalPoliciesScreen({ navigation }) {
  const { t } = useTranslation();
  const learnMoreUrl = 'https://www.unwomen.org/en/what-we-do/ending-violence-against-women';
  const policyPdfUrls = {
    1: 'https://rm.coe.int/168008482e',
    2: 'https://www.un.org/womenwatch/daw/cedaw/text/econvention.pdf',
    3: 'https://www.un.org/womenwatch/daw/beijing/pdf/BDPfA%20E.pdf',
  };

  const handleLearnMore = async () => {
    await Linking.openURL(learnMoreUrl);
  };

  const openPolicyPdf = (policyId, title) => {
    const uri = policyPdfUrls[policyId] || policyPdfUrls[1];
    navigation.navigate('PdfViewer', {
      uri,
      title,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('drawer.internationalPolicies')}</Text>
        <Text style={styles.headerSubtitle}>
          {t('policies.headerSubtitle')}
        </Text>
      </View>

      {/* Policies */}
      <View style={styles.content}>
        {mockInternationalPolicies.map((policy) => (
          (() => {
            const localizedPolicy = {
              ...policy,
              title: t(`policies.items.${policy.id}.title`, { defaultValue: policy.title }),
              organization: t(`policies.items.${policy.id}.organization`, { defaultValue: policy.organization }),
              content: t(`policies.items.${policy.id}.content`, { defaultValue: policy.content }),
            };

            return (
          <TouchableOpacity
            key={policy.id}
            onPress={() => openPolicyPdf(policy.id, localizedPolicy.title)}
            activeOpacity={0.7}
          >
            <Card style={styles.policyCard}>
              <View style={styles.policyHeader}>
                <View style={styles.policyInfo}>
                  <Text style={styles.policyTitle}>{localizedPolicy.title}</Text>
                  <Text style={styles.policyOrg}>{localizedPolicy.organization}</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.tapHint}>Tap to open PDF</Text>
            </Card>
          </TouchableOpacity>
            );
          })()
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
            {t('policies.infoBanner')}
          </Text>
        </View>
      </Card>

      {/* Resources */}
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
  tapHint: {
    marginTop: spacing.sm,
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
  learnMoreButton: {
    marginTop: spacing.md,
  },
});
