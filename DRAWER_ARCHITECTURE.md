# 📊 Drawer Navigation Architecture & Flow Diagram

## 🏗️ Overall Application Architecture

```
┌─────────────────────────────────────────────┐
│              App.js (Root)                  │
│  - GestureHandlerRootView                   │
│  - UserContext.Provider                     │
│  - CheckPermissions & Bootstrap             │
└────────────┬────────────────────────────────┘
             │
             ├──────────────────────┬──────────────────────┐
             │                      │                      │
       ✅ User found         ❌ No user found       Browser (Web)
             │                      │                      │
             ▼                      ▼                      ▼
      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
      │ AppNavigator │      │AuthNavigator │      │MainStack     │
      │   (Drawer)   │      │  (Tabs)      │      │  (Fallback)  │
      └──────────────┘      └──────────────┘      └──────────────┘
```

---

## 🗂️ Navigation Structure (Detailed)

```
AppNavigator
│
└─ DrawerNavigator (Main Navigation)
   │
   ├─ Drawer.Screen: "Home | Dashboard" ⭐
   │  └─ MainStackNavigator
   │     │
   │     ├─ Tabs Navigator
   │     │  ├─ HomeTab → HomeStackNavigator → HomeScreen
   │     │  ├─ SupportTab → SupportStackNavigator → PsychologicalSupportScreen
   │     │  ├─ LearnTab → LearnStackNavigator → InformationScreen
   │     │  ├─ ServicesTab → ServicesStackNavigator → SupportServicesScreen
   │     │  └─ StoriesTab → StoriesStackNavigator → SafeVoiceScreen
   │     │
   │     └─ Stack Screens (from tabs)
   │        ├─ ReportIncidentScreen
   │        ├─ LocalLawsScreen
   │        ├─ EmergencyContactScreen
   │        ├─ InternationalPoliciesScreen
   │        ├─ HumanRightsScreen
   │        ├─ AddStoryScreen
   │        ├─ ProfileScreen
   │        └─ FeedbackScreen
   │
   ├─ Drawer.Screen: "Report Now" 📝
   │  └─ ReportNowDrawerScreen
   │     └─ Stack.Screen → ReportIncidentScreen
   │
   ├─ Drawer.Screen: "Get Help" 💬
   │  └─ GetHelpDrawerScreen
   │     └─ Stack.Screen → PsychologicalSupportScreen
   │
   ├─ Drawer.Screen: "Local Laws" ⚖️
   │  └─ LocalLawsDrawerScreen
   │     └─ Stack.Screen → LocalLawsScreen
   │
   ├─ Drawer.Screen: "Emergency" 🚨
   │  └─ EmergencyDrawerScreen
   │     └─ Stack.Screen → EmergencyContactScreen
   │
   ├─ Drawer.Screen: "Support Services" 📞
   │  └─ SupportServicesDrawerScreen
   │     └─ Stack.Screen → SupportServicesScreen
   │
   ├─ Drawer.Screen: "Stories" 📖
   │  └─ StoriesDrawerScreen
   │     └─ Stack.Screen → SafeVoiceScreen
   │
   ├─ Drawer.Screen: "Add Story" ✍️
   │  └─ AddStoryDrawerScreen
   │     └─ Stack.Screen → AddStoryScreen
   │
   ├─ Drawer.Screen: "Information" 📚
   │  └─ InformationDrawerScreen
   │     └─ Stack.Screen → InformationScreen
   │
   ├─ Drawer.Screen: "International Policies" 🌍
   │  └─ InternationalPoliciesDrawerScreen
   │     └─ Stack.Screen → InternationalPoliciesScreen
   │
   ├─ Drawer.Screen: "Human Rights" ❤️
   │  └─ HumanRightsDrawerScreen
   │     └─ Stack.Screen → HumanRightsScreen
   │
   ├─ Drawer.Screen: "Profile" 👤
   │  └─ ProfileDrawerScreen
   │     └─ Stack.Screen → ProfileScreen
   │
   ├─ Drawer.Screen: "Settings" ⚙️
   │  └─ SettingsDrawerScreen
   │     └─ Stack.Screen → SettingsScreen
   │
   └─ Drawer.Screen: "Feedback" (Hidden)
      └─ FeedbackDrawerScreen
         └─ Stack.Screen → FeedbackScreen
```

---

## 🎭 Drawer Lifecycle & States

```
┌─────────────────────────────────────────────┐
│         Drawer Lifecycle States             │
└─────────────────────────────────────────────┘

          CLOSED                    OPEN
             │                       │
             │                       │
    ┌────────▼────────┐   ┌────────▼────────┐
    │  Hidden Offscreen│   │Slide from Left  │
    │  Content not     │   │Content visible  │
    │  interactable    │   │Tap to interact  │
    │                  │   │                 │
    │  Swipe Left      │   │  Swipe Left     │
    │  OR Tap Item     │   │  OR Tap Outside │
    │  Opens Drawer    │   │  Closes Drawer  │
    └────────┬─────────┘   └────────┬────────┘
             │                      │
             │◄─────────────────────┤
             │                      │
             └──┬────────┬──────────┘
                │        │
         Auto-close  Tap Item
         (Optional)  Navigates
```

---

## 👥 User Context Flow

```
┌──────────────────────────────┐
│    UserContext.Provider      │
│  value={{ user, setUser }}   │
└──────────────┬───────────────┘
               │
        ┌──────▼──────┐
        │ User State  │
        │  (Global)   │
        └──────┬──────┘
               │
    ┌──────────┴──────────┐
    │                     │
    ▼                     ▼
 Logged In            Anonymous
    │                     │
    ├─ name              ├─ name: "Anonymous"
    ├─ email             ├─ isAnonymous: true
    ├─ phone             └─ (Limited access)
    ├─ avatar
    └─ role
```

---

## 🔄 Navigation Flow: User Journey

```
┌─────────────────────────────────────────────┐
│          LOGIN SCREEN (Start)               │
└────────────────────┬────────────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
    Credentials          Skip / Anonymous
          │                     │
          ▼                     ▼
   🚪 AuthNavigator ──────► AppNavigator
          │                     │
    ✅ Authenticated      Anonymous Mode
          │                     │
          └──────────┬──────────┘
                     │
          ┌──────────▼──────────┐
          │  DrawerNavigator    │
          │   (13 items)        │
          └──────────┬──────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
   Tap Menu Item          Swipe from Left
        │                         │
        ▼                         ▼
   Navigate              Drawer Opens
     Screen              (Content visible)
        │                         │
        │                         │
        ├─────────────┬───────────┤
        │             │           │
        ▼             ▼           ▼
   View Content  Tap Item   Tap Outside
        │             │           │
        │             ▼           ▼
        │         Navigate      Close
        │             │        Drawer
        │             │           │
        └─────────────┴───────────┘
              │
          Keep Using
```

---

## 🧩 Component Hierarchy

```
App.js
├── GestureHandlerRootView
│   └── UserContext.Provider
│       └── NavigationContainer
│           ├── AuthNavigator
│           │   ├── OnboardingScreen
│           │   ├── LoginScreen
│           │   └── RegisterScreen
│           │
│           └── AppNavigator
│               └── DrawerNavigator
│                   ├── DrawerContent (CUSTOM HEADER) ✨
│                   │   ├── Avatar Section
│                   │   ├── User Info
│                   │   ├── Menu Items (from DrawerItemList)
│                   │   └── Logout Button
│                   │
│                   └── Drawer Screens (13 total)
│                       ├── MainStackNavigator
│                       ├── ReportNowDrawerScreen
│                       ├── GetHelpDrawerScreen
│                       ├── LocalLawsDrawerScreen
│                       ├── EmergencyDrawerScreen
│                       ├── SupportServicesDrawerScreen
│                       ├── StoriesDrawerScreen
│                       ├── AddStoryDrawerScreen
│                       ├── InformationDrawerScreen
│                       ├── IntlPoliciesDrawerScreen
│                       ├── HumanRightsDrawerScreen
│                       ├── ProfileDrawerScreen
│                       ├── SettingsDrawerScreen (NEW!) 🆕
│                       └── FeedbackDrawerScreen
```

---

## 🎨 DrawerContent Component Structure

```
DrawerContent.js
│
├─ Header Section
│  ├─ Avatar Container
│  │  ├─ MaterialCommunityIcons (account-circle)
│  │  └─ Status Indicator (green dot)
│  │
│  ├─ User Name (Bold, 24px)
│  ├─ User Role (14px, styled badge)
│  └─ User Email (12px, subtle)
│
├─ Menu Section
│  └─ DrawerItemList (13 auto-generated items)
│
└─ Logout Section (Sticky Bottom)
   ├─ Divider Line
   └─ Logout Button
      ├─ Icon (logout)
      └─ Text (Sign Out)
```

---

## 🎯 Screen Stack for Each Drawer Item

```
Each Drawer Item Follows This Pattern:

Drawer.Screen
│
├─ function: [ItemName]DrawerScreen()
│
└─ component: <DrawerStackScreen ... />
   │
   └─ Stack.Navigator
      │
      └─ Stack.Screen
         │
         └─ Actual Screen Component
            (e.g., ReportIncidentScreen)
```

**Example: Report Now**
```
Drawer.Screen name="Report Now"
└─ ReportNowDrawerScreen()
   └─ DrawerStackScreen(component=ReportIncidentScreen, title="Report Now")
      └─ Stack.Navigator
         └─ Stack.Screen: ReportIncidentScreen
```

---

## 🔐 User Authentication Flow

```
START
  │
  ├─ Read from AsyncStorage
  │        │
  │   ┌────┴────┐
  │   │          │
  │   YES        NO
  │   │          │
  │   ▼          ▼
  │ Hydrate   CheckUser = null
  │ UserContext
  │   │
  │   └────┬─────────┘
  │        │
  │        ├─ Logged In? (user !== null)
  │        │        │
  │        │   ┌────┴────┐
  │        │   │          │
  │        │   YES        NO
  │        │   │          │
  │        │   ▼          ▼
  │        │AppNavigator  AuthNavigator
  │        │(Drawer)      (Login/Register)
  │        │   │          │
  │        │   │     ┌────┘
  │        │   │     │
  │        │   └─────┴─ On Success:
  │        │               Save to AsyncStorage
  │        │               Update UserContext
  │        │               Navigate to AppNavigator
  │        │
  │        └─ Logout:
  │             Clear AsyncStorage
  │             Reset UserContext
```

---

## 🌊 Data Flow: User Context

```
Component Request
      │
      ▼
Get User Context
      │
      ├─ Read (user object)
      │        │
      │        ├─ name
      │        ├─ email
      │        ├─ phone
      │        └─ isAnonymous
      │
      └─ Write (setUser)
               │
               ├─ Update user object
               │
               └─ Trigger Re-render
                  (All consuming components)
```

---

## 🎪 Gesture Handling

```
User Interaction
│
├─ SWIPE FROM LEFT EDGE
│  │
│  ├─ GestureHandler detects swipe
│  │
│  ├─ Drawer.Navigator receives gesture
│  │
│  ├─ Drawer slides in from left
│  │
│  └─ Content becomes interactive
│
├─ TAP MENU ICON
│  │
│  ├─ Component calls navigation.openDrawer()
│  │
│  └─ Drawer animates open
│
├─ TAP DRAWER ITEM
│  │
│  ├─ Item highlighted in blue
│  │
│  ├─ Navigation triggered
│  │
│  ├─ Drawer auto-closes
│  │
│  └─ New screen displays
│
└─ TAP OUTSIDE DRAWER (on content)
   │
   ├─ Drawer listener activated
   │
   └─ Drawer animates closed
```

---

## 📊 Screen Sizes & Responsive Layout

```
Modal Drawer (Standard)
┌───────────────────────────────────────┐
│ Drawer │    Screen Content            │
│ 280px  │         Remaining Space      │
│        │                              │
└───────────────────────────────────────┘

Tablet View
┌───────────────────────────────────────┐
│ Drawer │    Screen Content            │
│ 360px  │         Remaining Space      │
│        │                              │
└───────────────────────────────────────┘

Web Fallback
┌───────────────────────────────────────┐
│            Main Stack Navigator       │
│         (No Drawer on Web)            │
│                                       │
└───────────────────────────────────────┘
```

---

## 🚀 Performance Optimization

```
Optimization Strategies:

1. Lazy Loading
   Screens loaded only when accessed
   
2. Memory Management
   Drawer cached in memory
   Screens unmounted when not visible
   
3. Gesture Performance
   Reanimated 4.x for smooth animations
   Native gesture recognition
   
4. Re-render Prevention
   Context only updates on auth changes
   useCallback for event handlers
   useMemo for expensive computations
   
5. Bundle Size
   Code splitting per navigator
   Tree shaking unused code
```

---

## 🔗 State Sync Flow

```
User Action
    │
    ├─ Logout
    │   │
    │   ├─ clearUser() [AsyncStorage]
    │   ├─ setUser(null) [Context]
    │   ├─ Drawer closes automatically
    │   └─ Navigate to AuthNavigator
    │
    ├─ Login
    │   │
    │   ├─ Save credentials [AsyncStorage]
    │   ├─ setUser(userData) [Context]
    │   ├─ Drawer header updates
    │   └─ Navigate to AppNavigator
    │
    └─ Update Profile
        │
        ├─ Update in AsyncStorage
        ├─ setUser(newData) [Context]
        ├─ Drawer header refreshes
        └─ All screens see new data
```

---

## 📈 Navigation Statistics

```
Total Menu Items:     13
Stack Navigators:     8+
Tab Navigators:       1
Drawer Screens:       13
Auth Screens:         3
Total Screens:        20+
```

---

## ✅ Checklist for Integration

- [x] DrawerNavigator configured
- [x] DrawerContent custom component
- [x] 13 drawer menu items
- [x] All stack navigators
- [x] User context integration
- [x] Gesture handler setup
- [x] Logout functionality
- [x] Settings screen
- [x] Professional styling
- [x] Documentation

---

This architecture ensures:
✅ **Scalability** - Easy to add new screens
✅ **Performance** - Optimized rendering
✅ **Maintainability** - Clear structure
✅ **Usability** - Intuitive navigation
✅ **Accessibility** - Proper contrast & sizing
