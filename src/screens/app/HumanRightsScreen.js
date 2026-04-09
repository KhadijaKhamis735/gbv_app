import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Card from '../../components/Card';
import { mockHumanRights } from '../../data/mockData';

export default function HumanRightsScreen({ navigation }) {
  const { t } = useTranslation();
  const humanRightsPdfUrls = {
    1: 'https://www.ohchr.org/sites/default/files/Documents/Publications/FactSheet11Rev.1en.pdf',
    2: 'https://www.ohchr.org/sites/default/files/Documents/Publications/FactSheet4Rev.1en.pdf',
    3: 'https://www.un.org/en/udhrbook/pdf/udhr_booklet_en_web.pdf',
  };

  const handleSupportPress = () => {
    navigation.getParent?.()?.navigate('SupportTab');
  };

  const openRightPdf = (rightId, title) => {
    const uri = humanRightsPdfUrls[rightId] || humanRightsPdfUrls[3];
    navigation.navigate('PdfViewer', {
      uri,
      title,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('drawer.humanRights')}</Text>
        <Text style={styles.headerSubtitle}>
          {t('rights.headerSubtitle')}
        </Text>
      </View>

      {/* Rights */}
      <View style={styles.content}>
        {mockHumanRights.map((right) => (
          (() => {
            const localizedRight = {
              ...right,
              title: t(`rights.items.${right.id}.title`, { defaultValue: right.title }),
              description: t(`rights.items.${right.id}.description`, { defaultValue: right.description }),
              content: t(`rights.items.${right.id}.content`, { defaultValue: right.content }),
            };

            return (
          <TouchableOpacity
            key={right.id}
            onPress={() => openRightPdf(right.id, localizedRight.title)}
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
                  <Text style={styles.rightTitle}>{localizedRight.title}</Text>
                  <Text style={styles.rightDesc}>{localizedRight.description}</Text>
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

      {/* Declaration Banner */}
      <Card style={styles.declarationBanner}>
        <MaterialCommunityIcons
          name="certificate-outline"
          size={28}
          color={colors.success}
          style={styles.bannerIcon}
        />
        <Text style={styles.bannerTitle}>{t('rights.declarationTitle')}</Text>
        <Text style={styles.bannerText}>
          {t('rights.declarationText')}
        </Text>
      </Card>

      {/* Empowerment Tips */}
      <Card style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>{t('rights.knowRights')}</Text>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.tipText}>
            {t('rights.tip1')}
          </Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.tipText}>
            {t('rights.tip2')}
          </Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.tipText}>
            {t('rights.tip3')}
          </Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={colors.success}
          />
          <Text style={styles.tipText}>
            {t('rights.tip4')}
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
        <TouchableOpacity onPress={handleSupportPress} activeOpacity={0.8}>
          <Text style={styles.supportTitle}>{t('rights.supportTitle')}</Text>
        </TouchableOpacity>
        <Text style={styles.supportText}>
          {t('rights.supportText')}
        </Text>
        <TouchableOpacity onPress={handleSupportPress} activeOpacity={0.8}>
          <Text style={styles.supportLink}>{t('drawer.getHelp')}</Text>
        </TouchableOpacity>
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
  tapHint: {
    marginTop: spacing.sm,
    fontSize: fontSize.sm,
    color: colors.gray,
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
  supportLink: {
    marginTop: spacing.sm,
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
