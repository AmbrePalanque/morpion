import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import {demarrerLeJeu, clickCase, nextPlayer, ifWinner, refaireLeJeu, decrementTimer, resetTimer, incrementePlayer} from "./reducers";
import styles from "./plateau.css";
import Case from "./Case";

class Plateau extends React.Component {

    componentWillReceiveProps(nextProps){
      if(nextProps.cases !== this.props.cases){
        this.props.dispatch(ifWinner());
        this.props.dispatch(nextPlayer());
      }
      if (nextProps.timer !== this.props.timer) {
          if (nextProps.timer === 0 && nextProps.winStatus === false) {
            this.props.dispatch(incrementePlayer());
          } else if(nextProps.winStatus === false && nextProps.cases.indexOf('') === -1 ){
            clearInterval(this.state.intervalId)
          }
      }
      if(nextProps.scorePlayerX !== this.props.scorePlayerX || nextProps.scorePlayerO !== this.props.scorePlayerO){
        clearInterval(this.state.intervalId)
      }
    }

    onCaseClick(id) {
      this.props.dispatch(clickCase(id)); //dispatch appel des fonction qui sont dans le reducers.js
      this.props.dispatch(resetTimer());
    }

    resetGame() {
      this.props.dispatch(refaireLeJeu());
      let intervalId = setInterval(() => this.props.dispatch(decrementTimer()), 1000);
      this.setState({ intervalId : intervalId });
    }

    startGame(){
      this.props.dispatch(demarrerLeJeu());
      let intervalId = setInterval(() => this.props.dispatch(decrementTimer()), 1000);

      this.setState({ intervalId : intervalId });

    }

    render() {

        let {cases, currentPlayer, winStatus, winPlayer, gameStart, scorePlayerX, scorePlayerO, timer} = this.props;
        if(!gameStart){

          return <div className="center">
            <h1>Le super jeu du morpion</h1>
            <button onClick={ () => this.startGame()}> Jouer </button>
          </div>

        } else {

          let classe;
          if(winPlayer === 'X'){
            classe = <span className="croix"> {winPlayer}</span>
          }else if (winPlayer === 'O'){
            classe = <span className="rond"> {winPlayer}</span>
          } else if (currentPlayer === 'X'){
              classe = <span className="croix"> {currentPlayer}</span>
          } else if (currentPlayer === 'O') {
            classe = <span className="rond"> {currentPlayer}</span>
          }

          if (winStatus){
              return <div className="center">
              <h1>Le super jeu du morpion</h1>

              <h2> Joueur {classe} a gagné</h2>

              <button onClick = {() => this.resetGame()}> Recommencer</button>
              <p> Score joueur <span className="croix">X</span> : {scorePlayerX}</p>
              <p> Score joueur <span className="rond">O</span>  : {scorePlayerO}</p>
              </div>
          } else if (winStatus === false && cases.indexOf('') === -1 ){
            return <div className="center">
            <h1>Le super jeu du morpion</h1>

            <h2> Tout le monde a perdu, vous êtes nul</h2>
            <p> Score joueur <span className="croix">X</span> : {scorePlayerX}</p>
            <p> Score joueur <span className="rond">O</span> : {scorePlayerO}</p>
            <button onClick = {() => this.resetGame()}> Recommencer</button>

            </div>
          } else if (timer === 0){
            return <div className="center">
            <h1>Le super jeu du morpion</h1>

            <h2> Le temps est dépassé joueur {classe} a perdu</h2>
            <p> Score joueur <span className="croix">X</span> : {scorePlayerX}</p>
            <p> Score joueur <span className="rond">O</span> : {scorePlayerO}</p>
            <button onClick = {() => this.resetGame()}> Recommencer</button>

            </div>
          }else{
            return <div className="center">
                <h1>Le super jeu du morpion</h1>

                <h2> Go joueur {classe} </h2>
                <p> Temps restant {timer}</p>

                <table className="plateau">
                    <tbody>
                    <tr>
                        <td>
                            <Case state={cases[0]} onClick={() => this.onCaseClick(0)}/>
                        </td>
                        <td>
                            <Case state={cases[1]} onClick={() => this.onCaseClick(1)}/>
                        </td>
                        <td>
                            <Case state={cases[2]} onClick={() => this.onCaseClick(2)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Case state={cases[3]} onClick={() => this.onCaseClick(3)}/>
                        </td>
                        <td>
                            <Case state={cases[4]} onClick={() => this.onCaseClick(4)}/>
                        </td>
                        <td>
                            <Case state={cases[5]} onClick={() => this.onCaseClick(5)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Case state={cases[6]} onClick={() => this.onCaseClick(6)}/>
                        </td>
                        <td>
                            <Case state={cases[7]} onClick={() => this.onCaseClick(7)}/>
                        </td>
                        <td>
                            <Case state={cases[8]} onClick={() => this.onCaseClick(8)}/>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <p> Score joueur <span className="croix">X</span> : {scorePlayerX}</p>
                <p> Score joueur <span className="rond">O</span> : {scorePlayerO}</p>
            </div>
          }
        }
    }
}

function mapStateToProps(storeState, props) {
    return {
      cases: storeState.cases,
      currentPlayer: storeState.currentPlayer,
      winStatus: storeState.winStatus,
      winPlayer: storeState.winPlayer,
      gameStart: storeState.gameStart,
      resetGame: storeState.resetGame,
      scorePlayerX: storeState.scorePlayerX,
      scorePlayerO: storeState.scorePlayerO,
      timer: storeState.timer,
      stopGame: storeState.stopGame
    };
};

export default connect(
    mapStateToProps
)(Plateau)
