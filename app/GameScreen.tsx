import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackgroundPattern from '../components/BackgroundPattern';
import ActionButtons from '../components/game/ActionButtons';
import { GamePhase, PLAYER_1, PLAYER_2 } from '../components/game/constants';
import GameAnswers from '../components/game/GameAnswers';
import GameHeader from '../components/game/GameHeader';
import GameInputArea from '../components/game/GameInputArea';
import { useGameRound } from '../components/game/helpers';

export default function GameScreen() {
  const {
    phase,
    setPhase,
    usedWords,
    setUsedWords,
    preTimeLeft,
    preTimerActive,
    stopPressed,
    timeLeft,
    timerActive,
    player1Done,
    player2Done,
    player1Answer,
    player2Answer,
    inputLetters,
    setInputLetters,
    correctWord,
    generatedWord,
    scrambledLetters,
    visibleLetters,
    setVisibleLetters,
    activePlayer,
    generating,
    loadingDots,
    handleAccept,
    handleStop,
    handleLetterPress,
    handleRemove,
    handleClear,
    handleDone,
    isPlayer1Correct,
    isPlayer2Correct,
    isCurrentPlayerDone,
    showActionButtons,
    showTopAnswers,
    playerInputBg,
    playerInputTextColor,
    oppInputBg,
    oppInputTextColor
  } = useGameRound();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <BackgroundPattern />
      <View style={styles.container}>
        {phase === GamePhase.WAITING && (
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleAccept}
            activeOpacity={0.9}
          >
            <Text style={styles.acceptText}>ACCEPT</Text>
          </TouchableOpacity>
        )}

        {(phase === GamePhase.PLAYER1 || phase === GamePhase.PLAYER2) && (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <GameHeader
              phase={phase}
              activePlayer={activePlayer}
              preTimeLeft={preTimeLeft}
              preTimerActive={preTimerActive}
              stopPressed={stopPressed}
              timeLeft={timeLeft}
              handleStop={handleStop}
              player1={PLAYER_1}
              player2={PLAYER_2}
              handleDone={handleDone}
              player1Done={player1Done}
              player2Done={player2Done}
              generating={generating}
              answersRevealed={false}
            />

            {/* Answers above input */}
            <GameAnswers
              phase={phase}
              player1Done={player1Done}
              player2Done={player2Done}
              showTopAnswers={showTopAnswers}
              player1Answer={player1Answer}
              player2Answer={player2Answer}
              correctWord={correctWord}
              isPlayer1Correct={isPlayer1Correct}
              isPlayer2Correct={isPlayer2Correct}
              oppInputBg={oppInputBg}
              oppInputTextColor={oppInputTextColor}
            />

            {/* Player input and letters */}
            <GameInputArea
              phase={phase}
              player1Done={player1Done}
              player2Done={player2Done}
              isCurrentPlayerDone={isCurrentPlayerDone}
              showTopAnswers={showTopAnswers}
              inputLetters={inputLetters}
              playerInputBg={playerInputBg}
              playerInputTextColor={playerInputTextColor}
              generating={generating}
              generatedWord={generatedWord}
              scrambledLetters={scrambledLetters}
              visibleLetters={visibleLetters}
              handleLetterPress={handleLetterPress}
              loadingDots={loadingDots}
            />

            {/* Remove and Clear Buttons */}
            {showActionButtons && (
              <ActionButtons
                onRemove={handleRemove}
                onClear={handleClear}
                canRemove={inputLetters.length > 0 && !isCurrentPlayerDone}
                canClear={inputLetters.length > 0 && !isCurrentPlayerDone}
                boldFont={true}
              />
            )}
          </View>
        )}

        {phase === GamePhase.FINISHED && (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: '#16A34A', fontSize: 22, fontWeight: 'bold', marginBottom: 18 }}>
              Game Over!
            </Text>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => {
                setPhase(GamePhase.WAITING);
                setUsedWords([]);
              }}
            >
              <Text style={styles.acceptText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  acceptButton: {
    width: 180,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16A34A',
    elevation: 2,
    marginTop: 120,
  },
  acceptText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 22,
  },
});