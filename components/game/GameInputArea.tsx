import React from 'react';
import { View } from 'react-native';
import GameInput from './GameInput';
import GeneratingText from './GeneratingText';
import LetterSquare from './LetterSquare';

export default function GameInputArea({
  phase,
  player1Done,
  player2Done,
  isCurrentPlayerDone,
  showTopAnswers,
  inputLetters,
  playerInputBg,
  playerInputTextColor,
  generating,
  generatedWord,
  scrambledLetters,
  visibleLetters,
  handleLetterPress,
  loadingDots
}: any) {
  if (!phase) return null;
  return (
    <>
      {/* Player's input stays always in same position, correctness coloring handled by parent */}
      {(
        (!player1Done && phase === 1) ||
        (!player2Done && phase === 2) ||
        ((isCurrentPlayerDone && !(player1Done && player2Done)) && (phase === 1 || phase === 2)) ||
        (player1Done && player2Done && (phase === 1 || phase === 2))
      ) && (
        <View style={{ width: '90%', marginTop: 32 }}>
          <GameInput
            value={inputLetters.join('')}
            backgroundColor={playerInputBg}
            textColor={playerInputTextColor}
          />
        </View>
      )}
      {/* Letter squares or generating animation */}
      <View style={{ width: '90%', alignItems: 'center', marginTop: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {generating && !generatedWord && (
          <GeneratingText loadingDots={loadingDots} />
        )}
        {!generating && generatedWord &&
          ((!player1Done && phase === 1) || (!player2Done && phase === 2)) && (
          scrambledLetters.map((letter: string, idx: number) =>
            <View key={idx} style={{ width: 44, height: 44, margin: 4 }}>
              {visibleLetters[idx] ? (
                <LetterSquare
                  letter={letter}
                  disabled={false}
                  onPress={() => handleLetterPress(idx)}
                />
              ) : null}
            </View>
          )
        )}
      </View>
    </>
  );
}