import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function TimerCircle({
  timeLeft,
  totalTime,
  backgroundColor = '#F3F4F6', // default for in-game
}: {
  timeLeft: number;
  totalTime: number;
  backgroundColor?: string;
}) {
  const progress = (totalTime - timeLeft) / totalTime;
  const fillColor = timeLeft <= 9 ? '#DC2626' : '#F59E0B';

  return (
    <View style={styles.timerContainer}>
      <View style={[styles.timerCircle, { backgroundColor }]}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: 50,
              backgroundColor,
              opacity: 1,
            },
          ]}
        />
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: 50,
              backgroundColor: fillColor,
              opacity: 1,
              width: 100 * (1 - progress),
              height: 100 * (1 - progress),
              top: 50 * progress,
              left: 50 * progress,
            },
          ]}
        />
        <Text style={styles.timerText}>{timeLeft}s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    marginHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  timerText: {
    position: 'absolute',
    color: '#111827',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
});