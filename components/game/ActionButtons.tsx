import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ActionButtons({
  onRemove,
  onClear,
  canRemove,
  canClear,
  boldFont,
}: {
  onRemove: () => void;
  onClear: () => void;
  canRemove: boolean;
  canClear: boolean;
  boldFont?: boolean;
}) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[
          styles.actionBtn,
          { backgroundColor: canRemove ? '#DC2626' : '#E5E7EB' },
        ]}
        onPress={onRemove}
        activeOpacity={canRemove ? 0.8 : 1}
        disabled={!canRemove}
      >
        <Text style={{ color: canRemove ? '#FFFFFF' : '#9CA3AF', fontWeight: boldFont ? 'bold' : 'normal' }}>Remove</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.actionBtn,
          { backgroundColor: canClear ? '#DC2626' : '#E5E7EB' },
        ]}
        onPress={onClear}
        activeOpacity={canClear ? 0.8 : 1}
        disabled={!canClear}
      >
        <Text style={{ color: canClear ? '#FFFFFF' : '#9CA3AF', fontWeight: boldFont ? 'bold' : 'normal' }}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 18,
    width: '100%',
    justifyContent: 'space-between',
  },
  actionBtn: {
    width: '48%',
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
});