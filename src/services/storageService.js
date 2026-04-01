import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER: 'user',
  INCIDENTS: 'incidents',
  STORIES: 'stories',
  FEEDBACK: 'feedback',
};

// User Storage
export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error retrieving user:', error);
    return null;
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error clearing user:', error);
  }
};

// Incidents Storage
export const saveIncident = async (incident) => {
  try {
    const incidents = await getIncidents();
    const newIncidents = [...incidents, { ...incident, id: Date.now() }];
    await AsyncStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(newIncidents));
    return newIncidents[newIncidents.length - 1];
  } catch (error) {
    console.error('Error saving incident:', error);
    throw error;
  }
};

export const getIncidents = async () => {
  try {
    const incidents = await AsyncStorage.getItem(STORAGE_KEYS.INCIDENTS);
    return incidents ? JSON.parse(incidents) : [];
  } catch (error) {
    console.error('Error retrieving incidents:', error);
    return [];
  }
};

// Stories Storage
export const saveStory = async (story) => {
  try {
    const stories = await getStories();
    const newStories = [...stories, { ...story, id: Date.now(), createdAt: new Date() }];
    await AsyncStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(newStories));
    return newStories[newStories.length - 1];
  } catch (error) {
    console.error('Error saving story:', error);
    throw error;
  }
};

export const getStories = async () => {
  try {
    const stories = await AsyncStorage.getItem(STORAGE_KEYS.STORIES);
    return stories ? JSON.parse(stories) : [];
  } catch (error) {
    console.error('Error retrieving stories:', error);
    return [];
  }
};

// Feedback Storage
export const saveFeedback = async (feedback) => {
  try {
    const allFeedback = await getFeedback();
    const newFeedback = [...allFeedback, { ...feedback, id: Date.now(), createdAt: new Date() }];
    await AsyncStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(newFeedback));
    return newFeedback[newFeedback.length - 1];
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw error;
  }
};

export const getFeedback = async () => {
  try {
    const feedback = await AsyncStorage.getItem(STORAGE_KEYS.FEEDBACK);
    return feedback ? JSON.parse(feedback) : [];
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    return [];
  }
};

// Clear all storage
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};
