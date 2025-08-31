import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function GeneratingText({ loadingDots }: { loadingDots: number }) {
  return (
    <Text style={styles.generatingText}>
      Generating the word
      {'.'.repeat(loadingDots)}
      {' '.repeat(3 - loadingDots)}
    </Text>
  );
}

const styles = StyleSheet.create({
  generatingText: {
    color: '#111827',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
});