import React from 'react';
import { Platform, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';
import { DrawerContent } from '../components/DrawerContent';

// Screens
import HomeScreen from '../screens/app/HomeScreen';
import ReportIncidentScreen from '../screens/app/ReportIncidentScreen';
import PsychologicalSupportScreen from '../screens/app/PsychologicalSupportScreen';
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
import AboutUsScreen from '../screens/app/AboutUsScreen';
import PdfViewerScreen from '../screens/app/PdfViewerScreen';

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
  headerLeft: () => {
    if (navigation.canGoBack?.()) {
      return (
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color="#fff"
          style={{ marginLeft: 16 }}
          onPress={() => navigation.goBack()}
        />
      );
    }

    return (
      <MaterialCommunityIcons
        name="menu"
        size={24}
        color="#fff"
        style={{ marginLeft: 16 }}
        onPress={() => {
          const parent = navigation.getParent?.();
          const drawer = parent?.getParent?.() || parent;
          drawer?.openDrawer?.();
        }}
      />
    );
  },
});

function HomeStackNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={({ navigation }) => withDrawerHeader(navigation)}>
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
        options={{ title: t('drawer.reportNow') }}
      />
      <Stack.Screen
        name="LocalLaws"
        component={LocalLawsScreen}
        options={{ title: t('drawer.localLaws') }}
      />
      <Stack.Screen
        name="EmergencyContact"
        component={EmergencyContactScreen}
        options={{ title: t('drawer.emergency') }}
      />
    </Stack.Navigator>
  );
}

function SupportStackNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={({ navigation }) => withDrawerHeader(navigation)}>
      <Stack.Screen
        name="Support"
        component={PsychologicalSupportScreen}
        options={{ title: t('drawer.getHelp') }}
      />
    </Stack.Navigator>
  );
}

function LearnStackNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={({ navigation }) => withDrawerHeader(navigation)}>
      <Stack.Screen
        name="InternationalPolicies"
        component={InternationalPoliciesScreen}
        options={{ title: t('drawer.internationalPolicies') }}
      />
      <Stack.Screen
        name="HumanRights"
        component={HumanRightsScreen}
        options={{ title: t('drawer.humanRights') }}
      />
      <Stack.Screen
        name="PdfViewer"
        component={PdfViewerScreen}
        options={({ route }) => ({
          title: route.params?.title || 'PDF',
        })}
      />
    </Stack.Navigator>
  );
}

function ServicesStackNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={({ navigation }) => withDrawerHeader(navigation)}>
      <Stack.Screen
        name="SupportServices"
        component={SupportServicesScreen}
        options={{ title: t('drawer.supportServices') }}
      />
    </Stack.Navigator>
  );
}

function StoriesStackNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={({ navigation }) => withDrawerHeader(navigation)}>
      <Stack.Screen
        name="SafeVoice"
        component={SafeVoiceScreen}
        options={{ title: t('drawer.stories') }}
      />
      <Stack.Screen
        name="AddStory"
        component={AddStoryScreen}
        options={{ title: t('drawer.addStory') }}
      />
    </Stack.Navigator>
  );
}

function AboutUsStackNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={({ navigation }) => withDrawerHeader(navigation)}>
      <Stack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{ title: t('tabs.aboutUs') }}
      />
    </Stack.Navigator>
  );
}

function SettingsStackNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={({ navigation }) => withDrawerHeader(navigation)}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t('drawer.settings') }}
      />
    </Stack.Navigator>
  );
}

function TabsNavigator() {
  const { t } = useTranslation();

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
            iconName = focused ? 'chat-processing' : 'chat-processing-outline';
          } else if (route.name === 'AboutUsTab') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarLabel: ({ focused }) => {
          let label;
          if (route.name === 'HomeTab') label = t('tabs.home');
          else if (route.name === 'SupportTab') label = t('tabs.help');
          else if (route.name === 'LearnTab') label = t('tabs.learn');
          else if (route.name === 'ServicesTab') label = t('tabs.services');
          else if (route.name === 'StoriesTab') label = t('tabs.stories');
          else if (route.name === 'AboutUsTab') label = t('tabs.aboutUs');

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
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: t('tabs.home') }} />
      <Tab.Screen name="SupportTab" component={SupportStackNavigator} options={{ title: t('tabs.help') }} />
      <Tab.Screen name="LearnTab" component={LearnStackNavigator} options={{ title: t('tabs.learn') }} />
      <Tab.Screen name="ServicesTab" component={ServicesStackNavigator} options={{ title: t('tabs.services') }} />
      <Tab.Screen name="StoriesTab" component={StoriesStackNavigator} options={{ title: t('tabs.stories') }} />
      <Tab.Screen name="AboutUsTab" component={AboutUsStackNavigator} options={{ title: t('tabs.aboutUs') }} />
    </Tab.Navigator>
  );
}

function DrawerStackScreen({ component: Component, titleKey }) {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={({ navigation }) => withDrawerHeader(navigation)}>
      <Stack.Screen name={titleKey} component={Component} options={{ title: t(titleKey) }} />
    </Stack.Navigator>
  );
}

function ReportNowDrawerScreen() {
  return <DrawerStackScreen component={ReportIncidentScreen} titleKey="drawer.reportNow" />;
}

function GetHelpDrawerScreen() {
  return <DrawerStackScreen component={PsychologicalSupportScreen} titleKey="drawer.getHelp" />;
}

function LocalLawsDrawerScreen() {
  return <DrawerStackScreen component={LocalLawsScreen} titleKey="drawer.localLaws" />;
}

function EmergencyDrawerScreen() {
  return <DrawerStackScreen component={EmergencyContactScreen} titleKey="drawer.emergency" />;
}

function SupportServicesDrawerScreen() {
  return <DrawerStackScreen component={SupportServicesScreen} titleKey="drawer.supportServices" />;
}

function StoriesDrawerScreen() {
  return <StoriesStackNavigator />;
}

function AddStoryDrawerScreen() {
  return <DrawerStackScreen component={AddStoryScreen} titleKey="drawer.addStory" />;
}

function InternationalPoliciesDrawerScreen() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={({ navigation }) => withDrawerHeader(navigation)}>
      <Stack.Screen
        name="InternationalPolicies"
        component={InternationalPoliciesScreen}
        options={{ title: t('drawer.internationalPolicies') }}
      />
      <Stack.Screen
        name="PdfViewer"
        component={PdfViewerScreen}
        options={({ route }) => ({
          title: route.params?.title || 'PDF',
        })}
      />
    </Stack.Navigator>
  );
}

function HumanRightsDrawerScreen() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={({ navigation }) => withDrawerHeader(navigation)}>
      <Stack.Screen
        name="HumanRights"
        component={HumanRightsScreen}
        options={{ title: t('drawer.humanRights') }}
      />
      <Stack.Screen
        name="PdfViewer"
        component={PdfViewerScreen}
        options={({ route }) => ({
          title: route.params?.title || 'PDF',
        })}
      />
    </Stack.Navigator>
  );
}

function AboutUsDrawerScreen() {
  return <DrawerStackScreen component={AboutUsScreen} titleKey="tabs.aboutUs" />;
}

function ProfileDrawerScreen() {
  return <DrawerStackScreen component={ProfileScreen} titleKey="drawer.profile" />;
}

function SettingsDrawerScreen() {
  return <DrawerStackScreen component={SettingsScreen} titleKey="drawer.settings" />;
}

function FeedbackDrawerScreen() {
  return <DrawerStackScreen component={FeedbackScreen} titleKey="drawer.feedback" />;
}

export default function AppNavigator() {
  const { t } = useTranslation();

  if (Platform.OS === 'web') {
    return <TabsNavigator />;
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
          paddingHorizontal: 8,
          paddingVertical: 10,
        },
        drawerIconStyle: {
          marginRight: 8,
        },
        drawerLabelStyle: {
          fontWeight: '600',
          fontSize: 15,
          marginLeft: 0,
          paddingLeft: 4,
        },
        drawerType: 'slide',
        swipeEnabled: true,
        drawerHideStatusBarOnOpen: false,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabsNavigator}
        options={{
          title: t('drawer.dashboard'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Report Now"
        component={ReportNowDrawerScreen}
        options={{
          title: t('drawer.reportNow'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document-plus-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Get Help"
        component={GetHelpDrawerScreen}
        options={{
          title: t('drawer.getHelp'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Local Laws"
        component={LocalLawsDrawerScreen}
        options={{
          title: t('drawer.localLaws'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="scale-balance" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Emergency"
        component={EmergencyDrawerScreen}
        options={{
          title: t('drawer.emergency'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alert-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Support Services"
        component={SupportServicesDrawerScreen}
        options={{
          title: t('drawer.supportServices'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="phone-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Stories"
        component={StoriesDrawerScreen}
        options={{
          title: t('drawer.stories'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat-processing-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add Story"
        component={AddStoryDrawerScreen}
        options={{
          title: t('drawer.addStory'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="International Policies"
        component={InternationalPoliciesDrawerScreen}
        options={{
          title: t('drawer.internationalPolicies'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="earth" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Human Rights"
        component={HumanRightsDrawerScreen}
        options={{
          title: t('drawer.humanRights'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hand-heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUsDrawerScreen}
        options={{
          title: t('tabs.aboutUs'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileDrawerScreen}
        options={{
          title: t('drawer.profile'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsDrawerScreen}
        options={{
          title: t('drawer.settings'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Language"
        component={SettingsDrawerScreen}
        options={{
          title: t('drawer.language'),
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="translate" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackDrawerScreen}
        options={{
          title: t('drawer.feedback'),
          drawerItemStyle: { display: 'none' },
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="comment-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
