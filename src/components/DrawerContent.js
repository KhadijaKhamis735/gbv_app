import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { colors, spacing, fontSize } from '../constants/colors';
import { UserContext } from '../context/UserContext';
import { clearUser } from '../services/storageService';

export function DrawerContent(props) {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    await clearUser();
    setUser(null);
    props.navigation.closeDrawer();
  };

  const displayName = user?.isAnonymous ? 'Anonymous User' : (user?.name || 'GBV User');
  const displayRole = user?.isAnonymous ? 'Guest' : 'Support Member';
  const userEmail = user?.email || 'Not shared';

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER SECTION */}
        <View style={styles.header}>
          {/* Avatar Circle */}
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons 
              name="account-circle" 
              size={72} 
              color={colors.white} 
            />
            {!user?.isAnonymous && (
              <View style={styles.statusIndicator} />
            )}
          </View>

          {/* User Info */}
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userRole}>{displayRole}</Text>
          <Text style={styles.userEmail}>
            {userEmail === 'Not shared' ? '' : userEmail}
          </Text>
        </View>

        {/* DIVIDER */}
        <View style={styles.divider} />

        {/* MENU ITEMS */}
        <View style={styles.menuContent}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* LOGOUT SECTION (STICKY BOTTOM) */}
      <View style={styles.logoutContainer}>
        <View style={styles.logoutDivider} />
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout} 
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons 
            name="logout" 
            size={24} 
            color={colors.danger} 
          />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  
  // HEADER STYLES
  header: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.success,
    borderWidth: 3,
    borderColor: colors.white,
  },
  userName: {
    fontSize: fontSize['3xl'],
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  userRole: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: '#E3F2FD',
    marginBottom: spacing.xs,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  userEmail: {
    fontSize: fontSize.sm,
    color: '#BBDEFB',
    textAlign: 'center',
  },
  
  // DIVIDERS
  divider: {
    height: 1,
    backgroundColor: '#E8EEF7',
    marginVertical: spacing.md,
  },
  logoutDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: spacing.md,
  },
  
  // MENU SECTION
  menuContent: {
    flex: 1,
  },
  
  // LOGOUT SECTION
  logoutContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: '#FEF0F1',
    borderWidth: 1.5,
    borderColor: '#FFCDD2',
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  logoutText: {
    color: colors.danger,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
});
