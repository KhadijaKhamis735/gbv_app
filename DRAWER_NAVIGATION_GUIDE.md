# 🎨 Professional Drawer Navigation Guide

Your GBV Reporting and Support App now has a **complete professional drawer navigation system** with enhanced UI/UX!

---

## 📋 Navigation Structure

### **Root Navigator**
```
RootNavigator
├── AuthNavigator (Login/Register/Onboarding)
└── AppNavigator
    └── DrawerNavigator
        ├── MainStackNavigator (Tabs)
        │   ├── HomeStackNavigator
        │   │   ├── HomeScreen
        │   │   ├── ReportIncidentScreen
        │   │   ├── LocalLawsScreen
        │   │   └── EmergencyContactScreen
        │   ├── SupportStackNavigator
        │   ├── LearnStackNavigator
        │   ├── ServicesStackNavigator
        │   └── StoriesStackNavigator
        │
        ├── Report Now (Drawer Item)
        ├── Get Help (Drawer Item)
        ├── Local Laws (Drawer Item)
        ├── Emergency (Drawer Item)
        ├── Support Services (Drawer Item)
        ├── Stories (Drawer Item)
        ├── Add Story (Drawer Item)
        ├── Information (Drawer Item)
        ├── International Policies (Drawer Item)
        ├── Human Rights (Drawer Item)
        ├── Profile (Drawer Item)
        └── Feedback (Drawer Item)
```

---

## 🎯 Drawer Menu Items

### **Main Dashboard**
- **Icon**: `view-dashboard-outline`
- **Route**: Home (Tabs Navigator)
- **Description**: Quick access to home with bottom tabs

### **Core Features**
1. **Report Now**
   - Icon: `file-document-plus-outline`
   - Screen: ReportIncidentScreen
   - Purpose: Create incident reports

2. **Get Help**
   - Icon: `heart-outline`
   - Screen: PsychologicalSupportScreen
   - Purpose: Access psychological support chat

3. **Local Laws**
   - Icon: `scale-balance`
   - Screen: LocalLawsScreen
   - Purpose: Learn about Tanzania & Zanzibar laws

4. **Emergency**
   - Icon: `alert-circle-outline`
   - Screen: EmergencyContactScreen
   - Purpose: Emergency contacts

5. **Support Services**
   - Icon: `phone-outline`
   - Screen: SupportServicesScreen
   - Purpose: List of hospitals, police, NGOs

6. **Stories (Safe Voice)**
   - Icon: `chatbubble-ellipses-outline`
   - Screen: SafeVoiceScreen
   - Purpose: View anonymous stories

7. **Add Story**
   - Icon: `plus-box-outline`
   - Screen: AddStoryScreen
   - Purpose: Share your own story

### **Information & Education**
8. **Information**
   - Icon: `book-outline`
   - Screen: InformationScreen
   - Purpose: General information hub

9. **International Policies**
   - Icon: `earth`
   - Screen: InternationalPoliciesScreen
   - Purpose: UN & international GBV policies

10. **Human Rights**
    - Icon: `hand-heart-outline`
    - Screen: HumanRightsScreen
    - Purpose: Human rights education

### **User Settings**
11. **Profile**
    - Icon: `account-outline`
    - Screen: ProfileScreen
    - Purpose: User account & preferences

12. **Feedback**
    - Hidden from drawer
    - Screen: FeedbackScreen
    - Purpose: App feedback (accessible from settings)

---

## 👤 Enhanced Drawer Header

### **Features**
✅ Large avatar circle with account icon
✅ User name display (or "Anonymous User")
✅ Role badge ("Guest" or "Support Member")
✅ User email (if logged in)
✅ Green status indicator (for logged-in users)
✅ Professional blue background
✅ Proper spacing & typography

### **User Info Detection**
```javascript
// Logged-in user
displayName = "John Doe"
displayRole = "Support Member"
statusIndicator = visible (green dot)

// Anonymous user
displayName = "Anonymous User"
displayRole = "Guest"
statusIndicator = hidden
```

---

## 🔐 Sign Out / Logout

### **Features**
✅ Located at bottom of drawer
✅ Sticky position (always visible when scrolling)
✅ Red danger styling
✅ Clears AsyncStorage
✅ Resets UserContext
✅ Returns to AuthNavigator

### **Button Details**
- Color: #E53935 (danger red)
- Background: Light red (#FEF0F1)
- Icon: logout
- Border: 1.5px #FFCDD2
- Rounded corners: 12px

---

## 🎨 UI/UX Enhancements

### **Colors**
- Header Background: #1E88E5 (primary blue)
- Active Item Background: #E3F2FD (light blue)
- Active Text: #1E88E5 (primary)
- Inactive Text: #757575 (gray)
- Divider: #E8EEF7 / #E5E7EB (light)
- Logout Button: #E53935 (danger red)

### **Styling Features**
- Rounded drawer items (12px border radius)
- Smooth active state highlights
- Proper spacing between items (4px vertical margin)
- Horizontal margins for padding (12px)
- Professional typography
- Divider lines for visual separation

### **Animations**
- Smooth drawer slide from left
- Tap feedback with opacity changes
- Active state transitions

---

## 💻 Code Organization

### **File Structure**
```
/src
├── components/
│   └── DrawerContent.js          ← Enhanced drawer header & UI
├── navigation/
│   ├── AppNavigator.js            ← Main drawer setup
│   ├── AuthNavigator.js
│   └── RootNavigator.js (in App.js)
├── screens/
│   ├── app/
│   │   ├── HomeScreen.js
│   │   ├── ReportIncidentScreen.js
│   │   ├── PsychologicalSupportScreen.js
│   │   ├── LocalLawsScreen.js
│   │   ├── EmergencyContactScreen.js
│   │   ├── SupportServicesScreen.js
│   │   ├── SafeVoiceScreen.js
│   │   ├── AddStoryScreen.js
│   │   ├── InformationScreen.js
│   │   ├── InternationalPoliciesScreen.js
│   │   ├── HumanRightsScreen.js
│   │   ├── ProfileScreen.js
│   │   └── FeedbackScreen.js
│   └── auth/
│       ├── LoginScreen.js
│       ├── RegisterScreen.js
│       └── OnboardingScreen.js
├── services/
│   ├── storageService.js         ← AsyncStorage with logout
│   └── apiService.js
└── constants/
    └── colors.js
```

---

## 🚀 Using the Drawer Navigation

### **Open Drawer**
```javascript
// From any screen
import { useNavigation } from '@react-navigation/native';

function MyScreen() {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity onPress={() => navigation.getParent()?.openDrawer()}>
      <Text>Open Menu</Text>
    </TouchableOpacity>
  );
}
```

### **Close Drawer**
```javascript
navigation.closeDrawer();
```

### **Navigate to Drawer Item**
```javascript
navigation.navigate('Report Now');
// or
navigation.navigate('Get Help');
```

### **Check if Drawer is Open**
```javascript
const isDrawerOpen = navigation.getState()?.isDrawerOpen;
```

---

## ✨ Advanced Features

### **1. Custom Menu Icons**
All menu items have professional icons from `MaterialCommunityIcons`:
```javascript
drawerIcon: ({ color, size }) => (
  <MaterialCommunityIcons name="file-document-plus-outline" size={size} color={color} />
)
```

### **2. Active Item Highlighting**
- Blue background: #E3F2FD
- Blue text: #1E88E5
- Automatic on current route

### **3. Contextual User Management**
Uses `UserContext` to:
- Track logged-in user
- Display user info (name, email)
- Handle anonymous users
- Clear data on logout

### **4. Responsive Design**
- Mobile-first approach
- Proper spacing for touch (min 44px tap target)
- Safe area support

### **5. Accessibility**
- High contrast colors
- Clear typography hierarchy
- Touchable opacity feedback
- Icon + text labels

---

## 🧪 Testing the Drawer

### **Test Scenarios**

1. **Open Drawer**
   - Swipe from left edge
   - Tap menu icon in header
   ✅ Drawer slides smoothly from left

2. **User Info Display**
   - Log in with credentials
   ✅ Shows user name and email
   - Log in anonymously
   ✅ Shows "Anonymous User" with "Guest" role

3. **Navigation**
   - Tap different menu items
   ✅ Routes to correct screens
   ✅ Header updates with screen title

4. **Active Highlighting**
   - Tap menu item
   ✅ Highlighted with blue background
   ✅ Text color changes to primary blue

5. **Logout**
   - Tap "Sign Out" button
   ✅ Clears AsyncStorage
   ✅ Resets UserContext
   ✅ Returns to AuthNavigator
   ✅ Drawer closes

---

## 📱 Mobile-First Design

### **Drawer Behavior**
- **Phone**: Full-width drawer from left
- **Tablet**: Can be wider (configured by React Navigation)
- **Web**: Falls back to MainStackNavigator

### **Touch Targets**
- Minimum 44px height for menu items
- Proper padding around icons
- Large avatar for easy recognition

---

## 🔧 Customization

### **Change Drawer Width**
In `AppNavigator.js`:
```javascript
<Drawer.Navigator
  screenOptions={{
    drawerType: 'slide', // or 'permanent'
    // Add drawerScreenOptions: { width: '80%' }
  }}
>
```

### **Customize Colors**
Edit `/src/constants/colors.js`:
```javascript
export const colors = {
  primary: '#1E88E5',  // Change drawer active color
  danger: '#E53935',   // Change logout button color
  // ...
};
```

### **Modify Header Styling**
Edit `DrawerContent.js`:
```javascript
const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,  // Change header bg
    // Customize colors, padding, etc.
  },
});
```

---

## 🎯 Best Practices

✅ **Do's**
- Use meaningful icons
- Keep drawer items logical & organized
- Provide clear labels
- Use consistent spacing
- Test on different screen sizes
- Keep user info private

❌ **Don'ts**
- Don't mix navigation types
- Don't overcrowd the drawer
- Don't use obscure icons
- Don't hide critical features
- Don't forget accessibility

---

## 📚 Resources

- [React Navigation Drawer Docs](https://reactnavigation.org/docs/drawer-navigator)
- [Material Community Icons](https://materialdesignicons.com)
- [React Native Styling](https://reactnative.dev/docs/stylesheet)

---

## 🎉 You're All Set!

Your app now has a **professional, fully-featured drawer navigation** with:
✅ Custom drawer header with user info
✅ 12+ organized menu items
✅ Professional styling & animations
✅ Proper logout functionality
✅ Mobile-first design
✅ Best practices implemented

**Happy coding! 🚀**
