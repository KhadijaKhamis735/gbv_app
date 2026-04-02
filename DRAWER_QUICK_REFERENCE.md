# 🎯 Drawer Navigation - Quick Reference Card

## 🚀 Getting Started

```bash
# Start the app
npx expo start -c

# Open on Android
Press 'a'

# Open on iOS
Press 'i'

# Open in Web
Press 'w'
```

---

## 📱 Open/Close Drawer

### **Open Drawer**
```javascript
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();
navigation.getParent()?.openDrawer();
```

### **Close Drawer**
```javascript
navigation.closeDrawer();
```

### **Toggle Drawer**
```javascript
navigation.getParent()?.toggleDrawer();
```

---

## 🗺️ Navigation Routes

### **All Drawer Menu Items**
```javascript
'Dashboard'                    // Home with tabs
'Report Now'                   // Report incident form
'Get Help'                     // Psychological support chat
'Local Laws'                   // Tanzania & Zanzibar laws
'Emergency'                    // Emergency contacts
'Support Services'             // Services directory
'Stories'                      // View anonymous stories
'Add Story'                    // Share new story
'Information'                  // General information
'International Policies'       // UN & global policies
'Human Rights'                 // Human rights education
'Profile'                      // User account & profile
'Settings'                     // App settings
```

### **Navigate to Menu Item**
```javascript
navigation.navigate('Report Now');
navigation.navigate('Settings');
navigation.navigate('Profile');
```

### **Navigate with Params**
```javascript
navigation.navigate('Dashboard', { 
  screen: 'HomeTab',
  params: { userId: 123 }
});
```

---

## 👤 User Context

### **Get User Data**
```javascript
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const { user, setUser } = useContext(UserContext);

console.log(user.name);        // User's name
console.log(user.email);       // User's email
console.log(user.phone);       // User's phone
console.log(user.isAnonymous); // Is anonymous?
```

### **Update User**
```javascript
setUser({
  ...user,
  name: 'New Name',
  email: 'new@email.com',
  phone: '+255123456789'
});
```

### **Logout**
```javascript
import { clearUser } from '../services/storageService';

const logout = async () => {
  await clearUser();    // Clear AsyncStorage
  setUser(null);        // Reset context
};
```

---

## 🎨 Styling

### **Colors (from constants)**
```javascript
import { colors } from '../constants/colors';

colors.primary = '#1E88E5'       // Blue
colors.secondary = '#43A047'     // Green
colors.danger = '#E53935'        // Red
colors.gray = '#757575'          // Gray
colors.white = '#FFFFFF'         // White
```

### **Spacing**
```javascript
import { spacing } from '../constants/colors';

spacing.xs = 4      // Extra small
spacing.sm = 8      // Small
spacing.md = 16     // Medium
spacing.lg = 24     // Large
spacing.xl = 32     // X-Large
spacing.xxl = 48    // 2X-Large
```

### **Border Radius**
```javascript
import { borderRadius } from '../constants/colors';

borderRadius.sm = 4
borderRadius.md = 8
borderRadius.lg = 12
borderRadius.xl = 16
borderRadius.full = 9999
```

### **Font Size**
```javascript
import { fontSize } from '../constants/colors';

fontSize.xs = 10       // Extra small
fontSize.sm = 12       // Small
fontSize.base = 14     // Base
fontSize.lg = 16       // Large
fontSize.xl = 18       // X-Large
fontSize['2xl'] = 20   // 2X-Large
fontSize['3xl'] = 24   // 3X-Large
```

---

## 🧩 Common Components

### **Button with Icon**
```javascript
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';

<TouchableOpacity onPress={() => navigation.goBack()}>
  <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
</TouchableOpacity>
```

### **Input Field**
```javascript
import { Input } from '../components/Input';

<Input
  placeholder="Enter your name"
  value={name}
  onChangeText={setName}
  icon="account"
/>
```

### **Card**
```javascript
import { Card } from '../components/Card';

<Card>
  <Text>Card content</Text>
</Card>
```

### **Loading Indicator**
```javascript
import { LoadingIndicator } from '../components/LoadingIndicator';

<LoadingIndicator visible={isLoading} />
```

---

## 🔄 Navigation Patterns

### **Go Back**
```javascript
navigation.goBack();
```

### **Reset Navigation**
```javascript
navigation.reset({
  index: 0,
  routes: [{ name: 'Dashboard' }],
});
```

### **Navigate & Replace**
```javascript
navigation.replace('Report Now');
```

### **Navigate with Animation**
```javascript
navigation.navigate('Settings', {}, 
  navigation.getState().routes.length - 1
);
```

---

## 📱 Screen Lifecycle

### **React Navigation Hooks**
```javascript
import { useFocusEffect } from '@react-navigation/native';

useFocusEffect(
  React.useCallback(() => {
    // Do something when screen comes to focus
    console.log('Screen focused');
    
    return () => {
      // Cleanup when screen loses focus
      console.log('Screen blurred');
    };
  }, [])
);
```

### **Get Current Route**
```javascript
const route = navigation.getState().routes[
  navigation.getState().index
];
console.log('Current route:', route.name);
```

---

## 🔐 Permissions & AsyncStorage

### **Store Data**
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error storing data:', error);
  }
};
```

### **Retrieve Data**
```javascript
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};
```

### **Clear Data**
```javascript
const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
```

---

## 🧪 Debugging

### **Enable Redux DevTools** (if using Redux)
```javascript
import { composeWithDevTools } from 'redux-devtools-extension';
// Configure in store setup
```

### **Log Navigation State**
```javascript
import { useNavigationState } from '@react-navigation/native';

const state = useNavigationState(state => state);
console.log('Navigation State:', state);
```

### **React DevTools**
```bash
npm install --save-dev @react-navigation/devtools
```

### **Console Logs**
```javascript
console.log('Message:', value);         // Info
console.warn('Warning:', value);        // Warning
console.error('Error:', error);         // Error
```

---

## 🎯 Menu Items & Icons

| Item | Icon | Route |
|------|------|-------|
| Dashboard | dashboard-outline | Dashboard |
| Report | file-document-plus-outline | Report Now |
| Help | heart-outline | Get Help |
| Laws | scale-balance | Local Laws |
| Emergency | alert-circle-outline | Emergency |
| Services | phone-outline | Support Services |
| Stories | chatbubble-ellipses-outline | Stories |
| Add Story | plus-box-outline | Add Story |
| Info | book-outline | Information |
| Policies | earth | International Policies |
| Rights | hand-heart-outline | Human Rights |
| Profile | account-outline | Profile |
| Settings | cog-outline | Settings |

---

## 🚨 Common Issues & Solutions

### **Issue: Drawer not opening**
```javascript
// Add GestureHandlerRootView
import { GestureHandlerRootView } from 'react-native-gesture-handler';

<GestureHandlerRootView style={{ flex: 1 }}>
  <YourApp />
</GestureHandlerRootView>
```

### **Issue: User data not showing**
```javascript
// Ensure UserContext.Provider wraps NavigationContainer
<UserContext.Provider value={{ user, setUser }}>
  <NavigationContainer>
    {/* Navigation */}
  </NavigationContainer>
</UserContext.Provider>
```

### **Issue: Icons not displaying**
```javascript
// Check import statement
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Use correct syntax
<MaterialCommunityIcons name="menu" size={24} color="#000" />
```

### **Issue: Navigation crashing**
```bash
# Clear cache and restart
npx expo start -c

# Reinstall dependencies if needed
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 File Locations

```
Drawer Header:     src/components/DrawerContent.js
Navigation Setup:  src/navigation/AppNavigator.js
Settings:          src/screens/app/SettingsScreen.js
Colors:            src/constants/colors.js
User Context:      src/context/UserContext.js
Storage:           src/services/storageService.js
```

---

## 🎓 Useful Links

- [React Navigation Drawer Docs](https://reactnavigation.org/docs/drawer-navigator)
- [React Navigation Docs](https://reactnavigation.org)
- [React Native Docs](https://reactnative.dev)
- [Material Community Icons](https://materialdesignicons.com)
- [Expo Docs](https://docs.expo.dev)
- [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/)

---

## 💡 Pro Tips

1. **Always use `getParent()?.openDrawer()`** for nested navigators
2. **Test on real device** for smooth animations
3. **Use `useFocusEffect`** for screen-specific logic
4. **Clear cache regularly** during development
5. **Keep drawer under 15 items** for usability
6. **Use consistent icons** from same library
7. **Test logout thoroughly** - verify data clears
8. **Monitor performance** - use React DevTools

---

## 🎉 Quick Test Checklist

- [ ] Swipe from left to open drawer
- [ ] Tap menu icon to open drawer
- [ ] User info displays in header
- [ ] All menu items navigate
- [ ] Active item highlights
- [ ] Drawer closes after navigation
- [ ] Settings screen opens
- [ ] Logout button works
- [ ] Data clears on logout
- [ ] App returns to login screen

---

## 📞 Need Help?

Check these files:
1. `DRAWER_INTEGRATION_GUIDE.md` - Detailed setup guide
2. `DRAWER_NAVIGATION_GUIDE.md` - Feature overview
3. `DRAWER_IMPLEMENTATION_SUMMARY.md` - Implementation details

---

**Happy Coding! 🚀**
