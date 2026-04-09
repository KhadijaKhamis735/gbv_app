import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { mockStories } from '../../data/mockData';
import { formatDate } from '../../utils/validation';
import { UserContext } from '../../context/UserContext';
import { clearUser, getStories } from '../../services/storageService';

export default function SafeVoiceScreen({ navigation }) {
  const { t } = useTranslation();
  const { user, setUser } = useContext(UserContext);
  const [stories, setStories] = useState([]);
  const [likedStories, setLikedStories] = useState({});

  const loadStories = useCallback(async () => {
    const savedStories = await getStories();
    const mergedStories = [...savedStories, ...mockStories]
      .map((item) => ({
        ...item,
        likes: item.likes || 0,
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setStories(mergedStories);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStories();
    }, [loadStories])
  );

  const handleAddStoryPress = () => {
    if (user?.isAnonymous) {
      Alert.alert(
        t('safeVoice.loginRequiredTitle'),
        t('safeVoice.loginRequiredMessage'),
        [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('safeVoice.goToAuth'),
            onPress: async () => {
              await clearUser();
              setUser(null);
            },
          },
        ]
      );
      return;
    }

    if (typeof navigation.push === 'function') {
      navigation.push('AddStory');
      return;
    }

    navigation.navigate('AddStory');
  };

  const getLocalizedStory = (item) => ({
    ...item,
    title: t(`safeVoice.stories.${item.id}.title`, { defaultValue: item.title }),
    author: t(`safeVoice.stories.${item.id}.author`, { defaultValue: item.author }),
    content: t(`safeVoice.stories.${item.id}.content`, { defaultValue: item.content }),
  });

  const handleLike = (storyId) => {
    setLikedStories((prev) => ({
      ...prev,
      [storyId]: !prev[storyId],
    }));

    setStories((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? {
              ...story,
              likes: story.likes + (likedStories[storyId] ? -1 : 1),
            }
          : story
      )
    );
  };

  const renderStory = ({ item }) => {
    const story = getLocalizedStory(item);

    return (
      <Card style={styles.storyCard}>
        <View style={styles.storyHeader}>
          <View style={styles.storyAuthorInfo}>
            <View style={styles.authorAvatar}>
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={32}
                color={colors.primary}
              />
            </View>
            <View style={styles.authorDetails}>
              <Text style={styles.authorName}>{story.author}</Text>
              <Text style={styles.storyDate}>{formatDate(story.createdAt)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.storyTitle}>{story.title}</Text>
        <Text style={styles.storyContent} numberOfLines={4}>
          {story.content}
        </Text>

        <View style={styles.storyFooter}>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => handleLike(item.id)}
          >
            <MaterialCommunityIcons
              name={likedStories[item.id] ? 'heart' : 'heart-outline'}
              size={20}
              color={likedStories[item.id] ? colors.danger : colors.gray}
            />
            <Text style={styles.likeText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <MaterialCommunityIcons
              name="share-outline"
              size={20}
              color={colors.gray}
            />
            <Text style={styles.shareText}>{t('safeVoice.share')}</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{t('safeVoice.headerTitle')}</Text>
          <Text style={styles.headerSubtitle}>
            {t('safeVoice.headerSubtitle')}
          </Text>
        </View>
        <Button
          title={user?.isAnonymous ? t('safeVoice.loginToShare') : t('drawer.addStory')}
          onPress={handleAddStoryPress}
          size="sm"
          style={styles.addButton}
        />
      </View>

      {/* Info Card */}
      <Card style={[styles.infoCard, { marginHorizontal: spacing.md, marginBottom: spacing.md }]}>
        <View style={styles.infoContent}>
          <MaterialCommunityIcons
            name="information-outline"
            size={20}
            color={colors.info}
          />
          <Text style={styles.infoText}>
            {t('safeVoice.infoText')}
          </Text>
        </View>
      </Card>

      {user?.isAnonymous && (
        <Card style={[styles.anonymousCard, { marginHorizontal: spacing.md, marginBottom: spacing.md }]}>
          <Text style={styles.anonymousTitle}>{t('safeVoice.readOnlyTitle')}</Text>
          <Text style={styles.anonymousText}>{t('safeVoice.readOnlyText')}</Text>
        </Card>
      )}

      {/* Stories List */}
      <FlatList
        data={stories}
        renderItem={renderStory}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.storiesList}
        scrollEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  addButton: {
    width: 100,
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
  },
  anonymousCard: {
    backgroundColor: '#FFF8E1',
  },
  anonymousTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  anonymousText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    lineHeight: 18,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSize.sm,
    color: colors.info,
    lineHeight: 18,
  },
  storiesList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  storyCard: {
    marginBottom: spacing.md,
  },
  storyHeader: {
    marginBottom: spacing.md,
  },
  storyAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    marginRight: spacing.md,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.dark,
  },
  storyDate: {
    fontSize: fontSize.xs,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  storyTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  storyContent: {
    fontSize: fontSize.base,
    color: colors.gray,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  storyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.light,
    paddingTopTop: spacing.md,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
    paddingVertical: spacing.sm,
  },
  likeText: {
    marginLeft: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.gray,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  shareText: {
    marginLeft: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.gray,
  },
});
