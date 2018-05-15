import Immutable from "seamless-immutable";


const DEMARRER_JEU = 'morpion/DEMARRER_JEU';
const REFAIRE_JEU = 'morpion/REFAIRE_JEU';
const CLICK_CASE = 'morpion/CLICK_CASE';
const NEXT_PLAYER = 'morpion/NEXT_PLAYER';
const IF_WINNER = 'morpion/IF_WINNER';
const DECREMENTE_TIMER = 'morpion/DECREMENTE_TIMER';
const RESET_TIMER = 'morpion/RESET_TIMER';
const INCREMENTE_PLAYER = 'morpion/INCREMENTE_PLAYER';
const initialState = {
  currentPlayer: 'X',
  scoreX: 0,
  scoreO: 0,
  winCombine: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  cases: Array(9).fill(''), //je crée mon tableau vide avec 9 index
  winStatus: false,
  gameStart: false,
  winPlayer: '',
  scorePlayerX: 0,
  scorePlayerO: 0,
  timer: 30,
  stopGame: true

};

export function monReducer(currentState = Immutable(initialState), action) {
    switch (action.type) {
        case DEMARRER_JEU: {
          return currentState.set('gameStart', true).set('stopGame', false);
        }
        case REFAIRE_JEU: {
          return currentState.set('cases', Array(9).fill('')).set('winStatus', false).set('timer', 30).set('stopGame', false);
        }
        case CLICK_CASE: {
           let id = action.payload.id;
           if(currentState.cases[id] === ''){
            let data = currentState.cases.map((element, index) => {
              if(index === id){
                return currentState.currentPlayer;
              } else {
                return element;
              }
           })
           let newState = currentState.set('cases', data);
           return newState;
         }else {
           return currentState;
         }

        }
        case NEXT_PLAYER: {
          if(currentState.currentPlayer === 'X'){
            return currentState.set('currentPlayer', 'O');
          } else {
            return currentState.set('currentPlayer', 'X');
          }
        }
        case IF_WINNER: {
          for (let i = 0; i < currentState.winCombine.length; i++) {
            let option1 = currentState.winCombine[i][0];
            let option2 = currentState.winCombine[i][1];
            let option3 = currentState.winCombine[i][2];

            if (
              currentState.cases[option1] &&
              currentState.cases[option1] === currentState.cases[option2] &&
              currentState.cases[option2] === currentState.cases[option3] && currentState.cases[option1] === currentState.currentPlayer
            ) {
              if(currentState.currentPlayer === 'X'){
                return currentState.set('winPlayer', currentState.currentPlayer).set('winStatus', true).set('scorePlayerX', currentState.scorePlayerX+1).set('stopGame', true);
              } else {
                return currentState.set('winPlayer', currentState.currentPlayer).set('winStatus', true).set('scorePlayerO', currentState.scorePlayerO+1).set('stopGame', true);
              }
            }
          }
      return currentState;
        }
        case DECREMENTE_TIMER: {
          return currentState.set('timer', currentState.timer-1);
        }
        case RESET_TIMER: {
          return currentState.set('timer', 30);
        }
        case INCREMENTE_PLAYER: {
          if(currentState.currentPlayer === 'X'){
            return currentState.set('scorePlayerO', currentState.scorePlayerO+1).set('stopGame', true).set('winPlayer', 'O');
          }else{
            return currentState.set('scorePlayerX', currentState.scorePlayerX+1).set('stopGame', true).set('winPlayer', 'X');
          }
        }
    }

    return currentState;
}

export function demarrerLeJeu() {
    return {
        type: DEMARRER_JEU
    };
}

export function refaireLeJeu() {
    return {
        type: REFAIRE_JEU
    };
}

export function clickCase(id) {
    return {
        type: CLICK_CASE,
        payload:{
          id: id
        }
    };
}

export function nextPlayer() {
    return {
        type: NEXT_PLAYER
    };
}

export function ifWinner() {
    return {
        type: IF_WINNER
    };
}

export function decrementTimer() {
    return {
        type: DECREMENTE_TIMER,
    };
}

export function resetTimer() {
    return {
        type: RESET_TIMER
    };
}

export function incrementePlayer() {
    return {
        type: INCREMENTE_PLAYER
    };
}
