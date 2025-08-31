import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function LetterSquare({
  letter,
  disabled,
  onPress,
}: {
  letter: string;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.letterSquare,
        { backgroundColor: disabled ? '#6B7280' : '#FFFFFF' },
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.letterSquareText}>{letter}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  letterSquare: {
    width: 40,
    height: 40,
    borderRadius: 7,
    margin: 5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  letterSquareText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#16A34A',
  },
});