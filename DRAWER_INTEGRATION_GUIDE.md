# 🚀 Drawer Navigation Integration Guide

## Complete Setup & Usage Instructions

---

## ✅ What's Been Added

### **1. Enhanced DrawerContent Component**
- **File**: `/src/components/DrawerContent.js`
- **Features**:
  - Professional header with avatar
  - User info display (name, email, role)
  - Status indicator for active users
  - Clean menu section
  - Sticky logout button with confirmation

### **2. Updated AppNavigator**
- **File**: `/src/navigation/AppNavigator.js`
- **Features**:
  - Drawer navigator with 13 menu items
  - Stack navigation for each drawer item
  - Bottom tabs integrated
  - Conditional web fallback
  - Professional drawer styling

### **3. New SettingsScreen**
- **File**: `/src/screens/app/SettingsScreen.js`
- **Features**:
  - Account settings (edit profile, email, phone)
  - Notifications preferences
  - Privacy & security toggle
  - App information
  - Data management
  - Sign out functionality

---

## 📱 Navigation Structure

```
App Root
├── AuthNavigator (if not logged in)
│   ├── OnboardingScreen
│   ├── LoginScreen
│   └── RegisterScreen
│
└── AppNavigator (if logged in)
    └── DrawerNavigator
        ├── Dashboard (MainStackNavigator with bottom tabs)
        │   ├── HomeTab
        │   ├── SupportTab
        │   ├── LearnTab
        │   ├── ServicesTab
        │   └── StoriesTab
        │
        ├── Report Now (ReportIncidentScreen)
        ├── Get Help (PsychologicalSupportScreen)
        ├── Local Laws (LocalLawsScreen)
        ├── Emergency (EmergencyContactScreen)
        ├── Support Services (SupportServicesScreen)
        ├── Stories (SafeVoiceScreen)
        ├── Add Story (AddStoryScreen)
        ├── Information (InformationScreen)
        ├── International Policies (InternationalPoliciesScreen)
        ├── Human Rights (HumanRightsScreen)
        ├── Profile (ProfileScreen)
        └── Settings (SettingsScreen)
```

---

## 🎯 Menu Items Overview

| Menu Item | Icon | Screen | Purpose |
|-----------|------|--------|---------|
| Dashboard | dashboard-outline | MainStackNavigator | Home with tabs |
| Report Now | file-document-plus-outline | ReportIncidentScreen | Create reports |
| Get Help | heart-outline | PsychologicalSupportScreen | Mental support |
| Local Laws | scale-balance | LocalLawsScreen | Legal info |
| Emergency | alert-circle-outline | EmergencyContactScreen | Emergency contacts |
| Support Services | phone-outline | SupportServicesScreen | Services directory |
| Stories | chatbubble-ellipses-outline | SafeVoiceScreen | View stories |
| Add Story | plus-box-outline | AddStoryScreen | Share story |
| Information | book-outline | InformationScreen | General info |
| International Policies | earth | InternationalPoliciesScreen | Global policies |
| Human Rights | hand-heart-outline | HumanRightsScreen | Rights education |
| Profile | account-outline | ProfileScreen | User account |
| Settings | cog-outline | SettingsScreen | App settings |

---

## 💻 How to Use the Drawer

### **Open Drawer Programmatically**
```javascript
import { useNavigation } from '@react-navigation/native';

export default function MyScreen() {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.getParent()?.openDrawer();
  };

  return (
    <TouchableOpacity onPress={openDrawer}>
      <Text>Open Menu</Text>
    </TouchableOpacity>
  );
}
```

### **Navigate from Drawer**
```javascript
// Navigate to drawer item
navigation.navigate('Report Now');
navigation.navigate('Settings');
navigation.navigate('Profile');

// Or with params
navigation.navigate('Dashboard', { 
  screen: 'HomeTab',
  params: { someParam: 'value' }
});
```

### **Close Drawer After Navigation**
```javascript
const handleItemPress = (screen) => {
  navigation.navigate(screen);
  navigation.closeDrawer();
};
```

### **Check if Drawer is Open**
```javascript
const { isDrawerOpen } = navigation.getState();
```

---

## 🎨 Styling & Customization

### **Change Primary Color**
**File**: `/src/constants/colors.js`
```javascript
export const colors = {
  primary: '#1E88E5',  // Change this to your color
  // ...other colors
};
```

### **Modify Drawer Width**
**File**: `/src/navigation/AppNavigator.js`
```javascript
<Drawer.Navigator
  screenOptions={{
    drawerType: 'slide',
    // Add this:
    // width: '80%' // Not supported directly, but can use nested navigators
  }}
>
```

### **Change Drawer Header Colors**
**File**: `/src/components/DrawerContent.js`
```javascript
const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,  // Change header color
    // Modify other properties
  },
  // ...
});
```

### **Modify Menu Item Styling**
**File**: `/src/navigation/AppNavigator.js`
```javascript
<Drawer.Navigator
  screenOptions={{
    drawerActiveTintColor: '#YOUR_COLOR',
    drawerActiveBackgroundColor: '#LIGHT_COLOR',
    drawerItemStyle: {
      borderRadius: 12,
      marginVertical: 4,
      marginHorizontal: 12,
    },
  }}
>
```

---

## 🔐 User Context & State Management

### **Access User Data**
```javascript
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function MyScreen() {
  const { user, setUser } = useContext(UserContext);

  console.log(user.name);      // User name
  console.log(user.email);     // User email
  console.log(user.phone);     // User phone
  console.log(user.isAnonymous); // Anonymous flag
}
```

### **Update User**
```javascript
setUser({
  ...user,
  name: 'New Name',
  email: 'newemail@example.com'
});
```

### **Logout**
```javascript
import { clearUser } from '../services/storageService';

const handleLogout = async () => {
  await clearUser();  // Clear AsyncStorage
  setUser(null);      // Reset context
};
```

---

## 🧪 Testing the Drawer

### **Test Scenarios**

1. **Drawer Opens Programmatically**
   ```javascript
   // Press menu button
   // Drawer should slide from left
   ```

2. **User Info Displays Correctly**
   ```javascript
   // For logged-in user: Shows name, email, role
   // For anonymous: Shows "Anonymous User", email hidden
   ```

3. **Navigation Works**
   ```javascript
   // Tap any menu item
   // Should navigate to correct screen
   // Header should update with screen title
   ```

4. **Active Item Highlighting**
   ```javascript
   // Tap menu item
   // Should show blue background
   // Text should change to primary color
   ```

5. **Logout Functionality**
   ```javascript
   // Tap logout button
   // Should clear AsyncStorage
   // Should reset to AuthNavigator
   ```

6. **Drawer Closes After Navigation**
   ```javascript
   // Tap item
   // Drawer should close automatically
   // Screen content should display
   ```

---

## 📦 Dependencies Required

Make sure these are installed in `package.json`:

```json
{
  "dependencies": {
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/drawer": "^6.7.2",
    "@react-navigation/native-stack": "^6.11.0",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-reanimated": "~4.1.1",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-vector-icons": "^10.0.0"
  }
}
```

---

## 🚀 Quick Start

1. **Install Dependencies** (if not already done)
   ```bash
   npm install
   ```

2. **Clear Metro Cache**
   ```bash
   npx expo start -c
   ```

3. **Run on Platform**
   ```bash
   # Press 'a' for Android
   # Press 'i' for iOS
   # Press 'w' for Web
   ```

4. **Test Drawer**
   - Swipe from left edge or tap menu icon
   - Try navigating to different screens
   - Test logout functionality

---

## 🔧 Troubleshooting

### **Issue: Drawer not opening**
```javascript
// Make sure you have GestureHandlerRootView in App.js
import { GestureHandlerRootView } from 'react-native-gesture-handler';

<GestureHandlerRootView style={{ flex: 1 }}>
  {/* Your app content */}
</GestureHandlerRootView>
```

### **Issue: Drawer crashes when opening**
```javascript
// Ensure DrawerContent is properly exported
export function DrawerContent(props) {
  // Content here
}
```

### **Issue: User info not showing in drawer**
```javascript
// Check that UserContext.Provider is wrapping NavigationContainer
<UserContext.Provider value={{ user, setUser }}>
  <NavigationContainer>
    {/* Navigators */}
  </NavigationContainer>
</UserContext.Provider>
```

### **Issue: Icons not displaying**
```javascript
// Make sure vector icons are imported
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// And used correctly
<MaterialCommunityIcons name="menu" size={24} color="#fff" />
```

---

## 📚 File Locations

```
src/
├── components/
│   └── DrawerContent.js           ✨ Enhanced drawer UI
├── navigation/
│   ├── AppNavigator.js             ✨ Updated with drawer
│   ├── AuthNavigator.js
│   └── (RootNavigator in App.js)
├── screens/
│   └── app/
│       ├── SettingsScreen.js        ✨ NEW: Settings screen
│       ├── HomeScreen.js
│       ├── ReportIncidentScreen.js
│       ├── PsychologicalSupportScreen.js
│       ├── LocalLawsScreen.js
│       ├── EmergencyContactScreen.js
│       ├── SupportServicesScreen.js
│       ├── SafeVoiceScreen.js
│       ├── AddStoryScreen.js
│       ├── InformationScreen.js
│       ├── InternationalPoliciesScreen.js
│       ├── HumanRightsScreen.js
│       ├── ProfileScreen.js
│       └── FeedbackScreen.js
├── services/
│   ├── storageService.js
│   └── apiService.js
└── constants/
    └── colors.js
```

---

## 🎯 Next Steps

1. ✅ Test the drawer navigation in your app
2. ✅ Customize colors and styling
3. ✅ Add more menu items if needed
4. ✅ Implement backend API integration
5. ✅ Add user authentication
6. ✅ Set up push notifications
7. ✅ Deploy to production

---

## 📞 Support

For questions or issues with the drawer navigation, refer to:
- [React Navigation Docs](https://reactnavigation.org)
- [React Native Docs](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)

---

## 🎉 You're Ready!

Your app now has a **professional, fully-functional drawer navigation system**!

**Happy coding! 🚀**
