export const WORDS = ['QUIZZY', 'PUZZLES', 'GENIUS', 'COMPETE', 'WORDGAME', 'EXCITING', 'BALANCE', 'NETWORK', 'STRATEGY', 'VICTORY'];
export const PLAYER_1 = { name: 'Player One', image: 'https://randomuser.me/api/portraits/men/45.jpg' };
export const PLAYER_2 = { name: 'Player Two', image: 'https://randomuser.me/api/portraits/women/65.jpg' };
export const SELECT_DURATION = 60;
export const PRE_GAME_DURATION = 3;
export const ANSWER_REVEAL_DURATION = 3;

export enum GamePhase {
  WAITING = 0,
  PLAYER1 = 1,
  PLAYER2 = 2,
  FINISHED = 3
}