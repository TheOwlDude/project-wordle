import React, {createContext} from 'react';
import {sample} from "../../utils";
import {WORD_LIST} from "../../word-list";

export const GameStateContext = createContext();

function GameStateProvider({ children}) {
  const [answer, setAnswer] = React.useState(sample(WORD_LIST));
  const [guessList, setGuessList] = React.useState([]);
  const [gameOver, setGameOver] = React.useState(false);


  return <GameStateContext.Provider value={{answer, setAnswer, guessList, setGuessList, gameOver, setGameOver}}>
    {children}
  </GameStateContext.Provider>;
}

export default GameStateProvider;
