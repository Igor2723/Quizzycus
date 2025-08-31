import { useEffect, useRef, useState } from 'react';
import { ANSWER_REVEAL_DURATION, GamePhase, PRE_GAME_DURATION, SELECT_DURATION, WORDS } from './constants';

// Custom hook for round/game logic
export function useGameRound() {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.WAITING);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [preTimeLeft, setPreTimeLeft] = useState<number>(PRE_GAME_DURATION);
  const [preTimerActive, setPreTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(SELECT_DURATION);
  const [timerActive, setTimerActive] = useState(false);
  const [stopPressed, setStopPressed] = useState(false);
  const [player1Done, setPlayer1Done] = useState(false);
  const [player2Done, setPlayer2Done] = useState(false);
  const [inputLetters, setInputLetters] = useState<string[]>([]);
  const [player1Answer, setPlayer1Answer] = useState<string | null>(null);
  const [player2Answer, setPlayer2Answer] = useState<string | null>(null);
  const [activePlayer, setActivePlayer] = useState<'left' | 'right'>('left');
  const [generatedWord, setGeneratedWord] = useState<string | null>(null);
  const [correctWord, setCorrectWord] = useState<string | null>(null);
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [visibleLetters, setVisibleLetters] = useState<boolean[]>([]);
  const [opponentSimulated, setOpponentSimulated] = useState(false);
  const [generating, setGenerating] = useState(true);
  const [loadingDots, setLoadingDots] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [answersRevealed, setAnswersRevealed] = useState(false);

  // Utility: correctness and input backgrounds
  const isPlayer1Correct = correctWord && player1Answer === correctWord;
  const isPlayer2Correct = correctWord && player2Answer === correctWord;

  const isCurrentPlayerDone =
    (phase === GamePhase.PLAYER1 && player1Done) ||
    (phase === GamePhase.PLAYER2 && player2Done);

  const showActionButtons = !((player1Done && player2Done) && (phase === GamePhase.PLAYER1 || phase === GamePhase.PLAYER2)) && !isCurrentPlayerDone;
  const showInputAfterDone = isCurrentPlayerDone && !(player1Done && player2Done);
  const showTopAnswers = player1Done && player2Done && (phase === GamePhase.PLAYER1 || phase === GamePhase.PLAYER2);

  // Input backgrounds (don't change until both answers are visible)
  let playerInputBg = "#F9FAFB";
  let playerInputTextColor = "#111827";
  if (showTopAnswers) {
    if (phase === GamePhase.PLAYER1) {
      playerInputBg = isPlayer1Correct ? "#16A34A" : "#DC2626";
      playerInputTextColor = "#FFFFFF";
    } else {
      playerInputBg = isPlayer2Correct ? "#16A34A" : "#DC2626";
      playerInputTextColor = "#FFFFFF";
    }
  }
  let oppInputBg = "#F9FAFB";
  let oppInputTextColor = "#111827";
  if (showTopAnswers) {
    if (phase === GamePhase.PLAYER1) {
      oppInputBg = isPlayer2Correct ? "#16A34A" : "#DC2626";
      oppInputTextColor = "#FFFFFF";
    } else {
      oppInputBg = isPlayer1Correct ? "#16A34A" : "#DC2626";
      oppInputTextColor = "#FFFFFF";
    }
  }

  // --- Reset round for next player ---
  function resetRound(player: 'left' | 'right') {
    setPreTimeLeft(PRE_GAME_DURATION);
    setPreTimerActive(true);
    setTimeLeft(SELECT_DURATION);
    setTimerActive(false);
    setStopPressed(false);
    setPlayer1Done(false);
    setPlayer2Done(false);
    setInputLetters([]);
    setPlayer1Answer(null);
    setPlayer2Answer(null);
    setGeneratedWord(null);
    setCorrectWord(null);
    setScrambledLetters([]);
    setVisibleLetters([]);
    setOpponentSimulated(false);
    setGenerating(true);
    setActivePlayer(player);
    setAnswersRevealed(false);
  }

  function handleAccept() {
    setPhase(GamePhase.PLAYER1);
    resetRound('left');
    setUsedWords([]);
  }

  function handleStop() {
    setStopPressed(true);
    setPreTimerActive(false);
    setTimeLeft(SELECT_DURATION);
    setTimerActive(false);
    setGenerating(true);
  }

  function handleLetterPress(idx: number) {
    if (!visibleLetters[idx]) return;
    setVisibleLetters(visibleLetters.map((v, i) => (i === idx ? false : v)));
    setInputLetters([...inputLetters, scrambledLetters[idx]]);
  }

  function handleRemove() {
    if (inputLetters.length === 0) return;
    const lastLetter = inputLetters[inputLetters.length - 1];
    let idx = -1;
    for (let i = scrambledLetters.length - 1; i >= 0; i--) {
      if (scrambledLetters[i] === lastLetter && !visibleLetters[i]) {
        idx = i;
        break;
      }
    }
    if (idx !== -1) {
      const newVisible = [...visibleLetters];
      newVisible[idx] = true;
      setVisibleLetters(newVisible);
    }
    setInputLetters(inputLetters.slice(0, -1));
  }

  function handleClear() {
    setVisibleLetters(Array(scrambledLetters.length).fill(true));
    setInputLetters([]);
  }

  function handleDone() {
    if (phase === GamePhase.PLAYER1 && !player1Done) {
      setPlayer1Done(true);
      setPlayer1Answer(inputLetters.join(''));
    } else if (phase === GamePhase.PLAYER2 && !player2Done) {
      setPlayer2Done(true);
      setPlayer2Answer(inputLetters.join(''));
    }
    setTimerActive(true);
  }

  // Effects
  useEffect(() => {
    if ((phase === GamePhase.PLAYER1 || phase === GamePhase.PLAYER2) && preTimerActive && preTimeLeft > 0 && !stopPressed) {
      const timer = setTimeout(() => setPreTimeLeft(preTimeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (preTimerActive && preTimeLeft === 0 && !stopPressed) {
      handleStop();
      setPreTimerActive(false);
    }
  }, [preTimeLeft, preTimerActive, stopPressed, phase]);

  useEffect(() => {
    if (timerActive && timeLeft > 0 && !(player1Done && player2Done)) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timerActive && timeLeft === 0) {
      if (phase === GamePhase.PLAYER1) {
        if (!player1Done) {
          setPlayer1Done(true);
          setPlayer1Answer(inputLetters.join(''));
        }
        if (!player2Done) {
          setPlayer2Done(true);
          setPlayer2Answer(generatedWord ? generatedWord.split('').reverse().join('') : '');
        }
      } else if (phase === GamePhase.PLAYER2) {
        if (!player2Done) {
          setPlayer2Done(true);
          setPlayer2Answer(inputLetters.join(''));
        }
        if (!player1Done) {
          setPlayer1Done(true);
          setPlayer1Answer(generatedWord ? generatedWord.split('').reverse().join('') : '');
        }
      }
      setTimerActive(false);
    }
  }, [timerActive, timeLeft, player1Done, player2Done, phase, inputLetters, generatedWord]);

  useEffect(() => {
    if (generating) {
      intervalRef.current = setInterval(() => {
        setLoadingDots((prev) => (prev + 1) % 4);
      }, 400);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [generating]);

  useEffect(() => {
    if (generating && stopPressed) {
      const availableWords = WORDS.filter(w => !usedWords.includes(w));
      const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      setGeneratedWord(randomWord);
      setCorrectWord(randomWord);

      setGenerating(false);
      const letters = randomWord.split('');
      const scrambled = letters.slice().sort(() => Math.random() - 0.5);
      setScrambledLetters(scrambled);
      setVisibleLetters(Array(letters.length).fill(true));
      setTimeLeft(SELECT_DURATION);
      setTimerActive(true);
      if (!usedWords.includes(randomWord)) {
        setUsedWords(prev => [...prev, randomWord]);
      }
    }
  }, [stopPressed, generating, usedWords]);

  useEffect(() => {
    if (!opponentSimulated && ((phase === GamePhase.PLAYER1 && player1Done && !player2Done) || (phase === GamePhase.PLAYER2 && player2Done && !player1Done))) {
      setOpponentSimulated(true);
      setTimeout(() => {
        if (phase === GamePhase.PLAYER1 && !player2Done) {
          setPlayer2Done(true);
          setPlayer2Answer(generatedWord ? generatedWord.split('').reverse().join('') : '');
        } else if (phase === GamePhase.PLAYER2 && !player1Done) {
          setPlayer1Done(true);
          setPlayer1Answer(generatedWord ? generatedWord.split('').reverse().join('') : '');
        }
      }, 3000);
    }
  }, [phase, player1Done, player2Done, opponentSimulated, generatedWord]);

  useEffect(() => {
    if (player1Done && player2Done && !answersRevealed && (phase === GamePhase.PLAYER1 || phase === GamePhase.PLAYER2)) {
      setAnswersRevealed(true);
      setTimerActive(false);
      setTimeout(() => {
        setAnswersRevealed(false);
        if (phase === GamePhase.PLAYER1) {
          setPhase(GamePhase.PLAYER2);
          resetRound('right');
        } else if (phase === GamePhase.PLAYER2) {
          setPhase(GamePhase.FINISHED);
        }
      }, ANSWER_REVEAL_DURATION * 1000);
    }
  }, [player1Done, player2Done, answersRevealed, phase]);

  return {
    phase, setPhase, usedWords, setUsedWords, preTimeLeft, preTimerActive, stopPressed, timeLeft, timerActive, player1Done, player2Done,
    player1Answer, player2Answer, inputLetters, setInputLetters, correctWord, generatedWord, scrambledLetters, visibleLetters, setVisibleLetters,
    activePlayer, generating, loadingDots, handleAccept, handleStop, handleLetterPress, handleRemove, handleClear, handleDone,
    isPlayer1Correct, isPlayer2Correct, isCurrentPlayerDone, showActionButtons, showTopAnswers, playerInputBg, playerInputTextColor, oppInputBg, oppInputTextColor
  };
}