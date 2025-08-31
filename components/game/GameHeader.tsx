import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AvatarCircle from './AvatarCircle';
import TimerCircle from './TimerCircle';

export default function GameHeader({
  phase,
  activePlayer,
  preTimeLeft,
  stopPressed,
  timeLeft,
  handleStop,
  player1,
  player2,
  handleDone,
  player1Done,
  player2Done,
  generating,
  answersRevealed
}: any) {
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <AvatarCircle image={player1.image} name={player1.name} borderColor="#16A34A" />
        {!stopPressed ? (
          <TimerCircle timeLeft={preTimeLeft} totalTime={3} backgroundColor="#F59E0B" />
        ) : (
          <TimerCircle timeLeft={timeLeft} totalTime={60} />
        )}
        <AvatarCircle image={player2.image} name={player2.name} borderColor="#DC2626" />
      </View>
      {!stopPressed &&
        ((activePlayer === 'left' && phase === 1) ||
          (activePlayer === 'right' && phase === 2)) && (
          <TouchableOpacity
            style={{
              width: 140, height: 48, borderRadius: 24, justifyContent: 'center',
              alignItems: 'center', marginTop: 28, marginBottom: 6, elevation: 2,
              backgroundColor: '#DC2626', opacity: 1
            }}
            onPress={handleStop}
            activeOpacity={0.9}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 20 }}>
              STOP
            </Text>
          </TouchableOpacity>
        )}
      {stopPressed && !answersRevealed && (
        <>
          {(phase === 1 && !player1Done) && (
            <TouchableOpacity
              style={{
                width: 140, height: 48, borderRadius: 24, justifyContent: 'center',
                alignItems: 'center', marginTop: 28, marginBottom: 6, elevation: 2,
                backgroundColor: '#16A34A', opacity: 1
              }}
              onPress={handleDone}
              activeOpacity={0.9}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 20 }}>
                DONE
              </Text>
            </TouchableOpacity>
          )}
          {(phase === 2 && !player2Done) && (
            <TouchableOpacity
              style={{
                width: 140, height: 48, borderRadius: 24, justifyContent: 'center',
                alignItems: 'center', marginTop: 28, marginBottom: 6, elevation: 2,
                backgroundColor: '#16A34A', opacity: 1
              }}
              onPress={handleDone}
              activeOpacity={0.9}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 20 }}>
                DONE
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
}