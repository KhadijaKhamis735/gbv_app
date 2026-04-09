import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { UserContext } from './src/context/UserContext';
import './src/localization/i18n';
import i18n from './src/localization/i18n';
import LanguageSelectionScreen from './src/screens/common/LanguageSelectionScreen';
import {
  LanguageContext,
  LANGUAGE_STORAGE_KEY,
  LANGUAGE_SELECTED_KEY,
} from './src/context/LanguageContext';

export default function App() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const [storedUser, storedLanguage, selectedLanguageFlag] = await Promise.all([
        AsyncStorage.getItem('user'),
        AsyncStorage.getItem(LANGUAGE_STORAGE_KEY),
        AsyncStorage.getItem(LANGUAGE_SELECTED_KEY),
      ]);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const nextLanguage = storedLanguage || 'en';
      setLanguage(nextLanguage);
      await i18n.changeLanguage(nextLanguage);
      setHasSelectedLanguage(selectedLanguageFlag === 'true');
    } catch (e) {
      console.error('Failed to restore token', e);
    } finally {
      setIsLoading(false);
    }
  };

  const setAppLanguage = async (nextLanguage) => {
    setLanguage(nextLanguage);
    await i18n.changeLanguage(nextLanguage);
    await AsyncStorage.multiSet([
      [LANGUAGE_STORAGE_KEY, nextLanguage],
      [LANGUAGE_SELECTED_KEY, 'true'],
    ]);
    setHasSelectedLanguage(true);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageContext.Provider
        value={{
          language,
          setAppLanguage,
          hasSelectedLanguage,
        }}
      >
        {!hasSelectedLanguage ? (
          <LanguageSelectionScreen />
        ) : (
          <UserContext.Provider value={{ user, setUser }}>
            <NavigationContainer>
              {user ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
          </UserContext.Provider>
        )}
      </LanguageContext.Provider>
    </GestureHandlerRootView>
  );
}
