import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GameInput({
  value,
  backgroundColor,
  textColor,
  borderColor = 'transparent'
}: {
  value: string;
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
}) {
  return (
    <View style={[
      styles.inputBox,
      { backgroundColor, borderColor, borderWidth: borderColor !== 'transparent' ? 2 : 0 }
    ]}>
      <Text style={{ color: textColor, fontSize: 18 }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    minHeight: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 2,
  },
});