import React from 'react';
import { Platform, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';
import { DrawerContent } from '../components/DrawerContent';

// Screens
import HomeScreen from '../screens/app/HomeScreen';
import ReportIncidentScreen from '../screens/app/ReportIncidentScreen';
import PsychologicalSupportScreen from '../screens/app/PsychologicalSupportScreen';
import InformationScreen from '../screens/app/InformationScreen';
import SupportServicesScreen from '../screens/app/SupportServicesScreen';
import SafeVoiceScreen from '../screens/app/SafeVoiceScreen';
import FeedbackScreen from '../screens/app/FeedbackScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import LocalLawsScreen from '../screens/app/LocalLawsScreen';
import EmergencyContactScreen from '../screens/app/EmergencyContactScreen';
import AddStoryScreen from '../screens/app/AddStoryScreen';
import InternationalPoliciesScreen from '../screens/app/InternationalPoliciesScreen';
import HumanRightsScreen from '../screens/app/HumanRightsScreen';
import SettingsScreen from '../screens/app/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const defaultHeaderOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: '600' },
};

const withDrawerHeader = (navigation) => ({
  ...defaultHeaderOptions,
  headerLeft: () => (
    <MaterialCommunityIcons
      name="menu"
      size={24}
      color="#fff"
      style={{ marginLeft: 16 }}
      onPress={() => navigation.getParent()?.openDrawer()}
    />
  ),
});

// Home Stack Navigation
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => withDrawerHeader(navigation)}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'ZYGA',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ReportIncident"
        component={ReportIncidentScreen}
        options={{ title: 'Report Incident' }}
      />
      <Stack.Screen
        name="LocalLaws"
        component={LocalLawsScreen}
        options={{ title: 'Local Laws' }}
      />
      <Stack.Screen
        name="EmergencyContact"
        component={EmergencyContactScreen}
        options={{ title: 'Emergency Contact' }}
      />
    </Stack.Navigator>
  );
}

// Support Stack Navigation
function SupportStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => withDrawerHeader(navigation)}
    >
      <Stack.Screen
        name="Support"
        component={PsychologicalSupportScreen}
        options={{ title: 'Psychological Support' }}
      />
    </Stack.Navigator>
  );
}

// Learn Stack Navigation
function LearnStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => withDrawerHeader(navigation)}
    >
      <Stack.Screen
        name="Learn"
        component={InformationScreen}
        options={{ title: 'Learn' }}
      />
      <Stack.Screen
        name="InternationalPolicies"
        component={InternationalPoliciesScreen}
        options={{ title: 'International Policies' }}
      />
      <Stack.Screen
        name="HumanRights"
        component={HumanRightsScreen}
        options={{ title: 'Human Rights' }}
      />
    </Stack.Navigator>
  );
}

// Services Stack Navigation
function ServicesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => withDrawerHeader(navigation)}
    >
      <Stack.Screen
        name="SupportServices"
        component={SupportServicesScreen}
        options={{ title: 'Support Services' }}
      />
    </Stack.Navigator>
  );
}

// Stories Stack Navigation
function StoriesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => withDrawerHeader(navigation)}
    >
      <Stack.Screen
        name="SafeVoice"
        component={SafeVoiceScreen}
        options={{ title: 'Safe Voice - Stories' }}
      />
      <Stack.Screen
        name="AddStory"
        component={AddStoryScreen}
        options={{ title: 'Add Your Story' }}
      />
    </Stack.Navigator>
  );
}

// Main Tabs Navigator
function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SupportTab') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'LearnTab') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'ServicesTab') {
            iconName = focused ? 'phone' : 'phone-outline';
          } else if (route.name === 'StoriesTab') {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarLabel: ({ focused }) => {
          let label;
          if (route.name === 'HomeTab') label = 'Home';
          else if (route.name === 'SupportTab') label = 'Help';
          else if (route.name === 'LearnTab') label = 'Learn';
          else if (route.name === 'ServicesTab') label = 'Services';
          else if (route.name === 'StoriesTab') label = 'Stories';

          return (
            <Text
              style={{
                fontSize: 12,
                fontWeight: focused ? '700' : '500',
                color: focused ? colors.primary : colors.gray,
              }}
            >
              {label}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="SupportTab"
        component={SupportStackNavigator}
        options={{ title: 'Help' }}
      />
      <Tab.Screen
        name="LearnTab"
        component={LearnStackNavigator}
        options={{ title: 'Learn' }}
      />
      <Tab.Screen
        name="ServicesTab"
        component={ServicesStackNavigator}
        options={{ title: 'Services' }}
      />
      <Tab.Screen
        name="StoriesTab"
        component={StoriesStackNavigator}
        options={{ title: 'Stories' }}
      />
    </Tab.Navigator>
  );
}

// Main App Stack Navigator (for drawer content)
function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => withDrawerHeader(navigation)}
    >
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          headerTitle: 'Send Feedback',
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerStackScreen({ component: Component, title }) {
  return (
    <Stack.Navigator screenOptions={({ navigation }) => withDrawerHeader(navigation)}>
      <Stack.Screen name={title} component={Component} options={{ title }} />
    </Stack.Navigator>
  );
}

function ReportNowDrawerScreen() {
  return <DrawerStackScreen component={ReportIncidentScreen} title="Report Now" />;
}

function GetHelpDrawerScreen() {
  return <DrawerStackScreen component={PsychologicalSupportScreen} title="Get Help" />;
}

function LocalLawsDrawerScreen() {
  return <DrawerStackScreen component={LocalLawsScreen} title="Local Laws" />;
}

function EmergencyDrawerScreen() {
  return <DrawerStackScreen component={EmergencyContactScreen} title="Emergency" />;
}

function SupportServicesDrawerScreen() {
  return <DrawerStackScreen component={SupportServicesScreen} title="Support Services" />;
}

function StoriesDrawerScreen() {
  return <DrawerStackScreen component={SafeVoiceScreen} title="Stories" />;
}

function InformationDrawerScreen() {
  return <DrawerStackScreen component={InformationScreen} title="Information" />;
}

function ProfileDrawerScreen() {
  return <DrawerStackScreen component={ProfileScreen} title="Profile" />;
}

function FeedbackDrawerScreen() {
  return <DrawerStackScreen component={FeedbackScreen} title="Feedback" />;
}

function SettingsDrawerScreen() {
  return <DrawerStackScreen component={SettingsScreen} title="Settings" />;
}

function AddStoryDrawerScreen() {
  return <DrawerStackScreen component={AddStoryScreen} title="Add Story" />;
}

function InternationalPoliciesDrawerScreen() {
  return <DrawerStackScreen component={InternationalPoliciesScreen} title="International Policies" />;
}

function HumanRightsDrawerScreen() {
  return <DrawerStackScreen component={HumanRightsScreen} title="Human Rights" />;
}

// Main App Navigator with Drawer Menu
export default function AppNavigator() {
  if (Platform.OS === 'web') {
    return <MainStackNavigator />;
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.primary,
        drawerActiveBackgroundColor: '#E3F2FD',
        drawerInactiveTintColor: '#757575',
        drawerItemStyle: {
          borderRadius: 12,
          marginVertical: 4,
          marginHorizontal: 12,
          paddingHorizontal: 12,
          paddingVertical: 10,
        },
        drawerLabelStyle: {
          fontWeight: '600',
          fontSize: 15,
          marginLeft: -16,
        },
        drawerType: 'slide',
        swipeEnabled: true,
        drawerHideStatusBarOnOpen: false,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Report Now"
        component={ReportNowDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document-plus-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Get Help"
        component={GetHelpDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Local Laws"
        component={LocalLawsDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="scale-balance" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Emergency"
        component={EmergencyDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alert-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Support Services"
        component={SupportServicesDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="phone-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Stories"
        component={StoriesDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chatbubble-ellipses-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add Story"
        component={AddStoryDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Information"
        component={InformationDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="International Policies"
        component={InternationalPoliciesDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="earth" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Human Rights"
        component={HumanRightsDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hand-heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsDrawerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackDrawerScreen}
        options={{
          drawerItemStyle: { display: 'none' },
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="comment-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
