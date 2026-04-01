import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize } from '../constants/colors';

export default function Dropdown({
  label,
  placeholder,
  value,
  onValueChange,
  items,
  error,
  style,
  containerStyle,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedItem = items.find(item => item.value === value);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.dropdown,
          {
            borderColor: error ? colors.danger : colors.mediumGray,
          },
          style,
        ]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[
          styles.text,
          { color: selectedItem ? colors.dark : colors.mediumGray },
        ]}>
          {selectedItem?.label || placeholder}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={24}
          color={colors.gray}
        />
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setIsOpen(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    selectedItem?.value === item.value && styles.selectedOption,
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setIsOpen(false);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    selectedItem?.value === item.value && styles.selectedOptionText,
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              scrollEnabled
              nestedScrollEnabled
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    height: 48,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: fontSize.base,
    flex: 1,
  },
  error: {
    fontSize: fontSize.xs,
    color: colors.danger,
    marginTop: spacing.xs,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '60%',
  },
  option: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  selectedOption: {
    backgroundColor: colors.light,
  },
  optionText: {
    fontSize: fontSize.base,
    color: colors.dark,
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
