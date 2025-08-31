import React from 'react';
import { View } from 'react-native';
import GameInput from './GameInput';

export default function GameAnswers({
  phase,
  player1Done,
  player2Done,
  showTopAnswers,
  player1Answer,
  player2Answer,
  correctWord,
  isPlayer1Correct,
  isPlayer2Correct,
  oppInputBg,
  oppInputTextColor
}: any) {
  if (!(player1Done && player2Done && showTopAnswers)) return null;
  return (
    <View style={{ width: '90%', alignItems: 'center', marginTop: 20 }}>
      {/* Opponent's answer */}
      <GameInput
        value={phase === 1 ? player2Answer ?? '' : player1Answer ?? ''}
        backgroundColor={oppInputBg}
        textColor={oppInputTextColor}
      />
      {/* App's correct answer */}
      <GameInput
        value={correctWord ?? ''}
        backgroundColor="#F59E0B"
        textColor="#111827"
        borderColor="#F59E0B"
      />
    </View>
  );
}