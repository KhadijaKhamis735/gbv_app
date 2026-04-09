import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';

export default function PsychologicalSupportScreen({ navigation }) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('psych.botWelcome'),
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const responses = t('psych.botResponses', { returnObjects: true });
      const responseList = Array.isArray(responses) && responses.length > 0
        ? responses
        : [t('psych.botFallback')];

      await new Promise((resolve) => setTimeout(resolve, 600));
      const botMessage = {
        id: messages.length + 2,
        text: responseList[Math.floor(Math.random() * responseList.length)],
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';

    return (
      <View
        style={[
          styles.messageContainer,
          isUser && styles.userMessageContainer,
        ]}
      >
        {!isUser && (
          <View style={styles.botAvatar}>
            <MaterialCommunityIcons
              name="robot-happy-outline"
              size={20}
              color={colors.white}
            />
          </View>
        )}

        <View
          style={[
            styles.messageBubble,
            isUser && styles.userBubble,
          ]}
        >
          <Text style={[styles.messageText, isUser && styles.userMessageText]}>
            {item.text}
          </Text>
          <Text style={styles.timestamp}>
            {item.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Header Info */}
      <View style={styles.header}>
        <Card style={styles.infoCard}>
          <View style={styles.infoContent}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={28}
              color={colors.primary}
            />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>{t('psych.confidentialTitle')}</Text>
              <Text style={styles.infoDescription}>
                {t('psych.confidentialDescription')}
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesList}
        scrollIndicatorStyle="black"
      />

      {/* Resources */}
      <Card style={styles.resourcesCard}>
        <Text style={styles.resourcesTitle}>{t('psych.needMoreHelp')}</Text>
        <View style={styles.resourcesButtons}>
          <Button
            title={t('psych.callCounselor')}
            onPress={() => {}}
            variant="primary"
            size="sm"
            style={styles.resourceButton}
          />
          <Button
            title={t('psych.findServices')}
            onPress={() => navigation.navigate('ServicesTab')}
            variant="secondary"
            size="sm"
            style={styles.resourceButton}
          />
        </View>
      </Card>

      {/* Input */}
      <View style={styles.inputContainer}>
        <Input
          placeholder={t('psych.typeMessage')}
          value={inputText}
          onChangeText={setInputText}
          rightIcon={loading ? 'loading' : 'send'}
          onRightIconPress={handleSendMessage}
          style={styles.input}
          containerStyle={styles.inputWrapper}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
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
  },
  infoTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  infoDescription: {
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  messagesList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexGrow: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 0,
  },
  messageText: {
    fontSize: fontSize.base,
    color: colors.dark,
    lineHeight: 20,
  },
  userMessageText: {
    color: colors.white,
  },
  timestamp: {
    fontSize: fontSize.xs,
    color: colors.mediumGray,
    marginTop: spacing.xs,
  },
  resourcesCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: '#E8F5E9',
  },
  resourcesTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.md,
  },
  resourcesButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  resourceButton: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.light,
  },
  inputWrapper: {
    marginBottom: 0,
  },
  input: {
    borderRadius: 20,
  },
});
