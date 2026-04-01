import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { mockStories } from '../../data/mockData';
import { formatDate } from '../../utils/validation';

export default function SafeVoiceScreen({ navigation }) {
  const [stories, setStories] = useState(mockStories);
  const [likedStories, setLikedStories] = useState({});

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

  const renderStory = ({ item }) => (
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
            <Text style={styles.authorName}>{item.author}</Text>
            <Text style={styles.storyDate}>{formatDate(item.createdAt)}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.storyTitle}>{item.title}</Text>
      <Text style={styles.storyContent} numberOfLines={4}>
        {item.content}
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
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Safe Voice - Stories</Text>
          <Text style={styles.headerSubtitle}>
            Read experiences from survivors
          </Text>
        </View>
        <Button
          title="Add Story"
          onPress={() => navigation.navigate('AddStory')}
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
            Your story can inspire and help others. Share your journey if you feel comfortable.
          </Text>
        </View>
      </Card>

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
