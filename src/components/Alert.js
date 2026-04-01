import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize } from '../constants/colors';

export default function Alert({
  type = 'info', // 'success', 'error', 'warning', 'info'
  title,
  message,
  duration = 3000,
  onClose,
  style,
}) {
  const typeStyles = {
    success: {
      backgroundColor: '#E8F5E9',
      borderLeftColor: colors.success,
      icon: 'check-circle',
      color: colors.success,
    },
    error: {
      backgroundColor: '#FFEBEE',
      borderLeftColor: colors.danger,
      icon: 'alert-circle',
      color: colors.danger,
    },
    warning: {
      backgroundColor: '#FFF3E0',
      borderLeftColor: colors.warning,
      icon: 'alert',
      color: colors.warning,
    },
    info: {
      backgroundColor: '#E3F2FD',
      borderLeftColor: colors.info,
      icon: 'information',
      color: colors.info,
    },
  };

  const alertStyle = typeStyles[type];

  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <View style={[
      styles.alert,
      {
        backgroundColor: alertStyle.backgroundColor,
        borderLeftColor: alertStyle.borderLeftColor,
      },
      style,
    ]}>
      <MaterialCommunityIcons
        name={alertStyle.icon}
        size={24}
        color={alertStyle.color}
        style={styles.icon}
      />
      <View style={styles.content}>
        {title && <Text style={[styles.title, { color: alertStyle.color }]}>{title}</Text>}
        {message && <Text style={[styles.message, { color: alertStyle.color }]}>{message}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderRadius: 8,
  },
  icon: {
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.base,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  message: {
    fontSize: fontSize.sm,
  },
});
