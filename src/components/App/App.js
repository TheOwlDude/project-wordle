import Game from '../Game';
import Header from '../Header';
import {createContext} from "react";
import GameStateProvider from "../GameStateProvider";
import CheatMode from "../CheatMode";


function App() {
  return (
    <GameStateProvider>  
      <div className="wrapper">
        <Header />

        <div className="game-wrapper">
          <Game />
          <CheatMode />
        </div>

      </div>
    </GameStateProvider>
  );
}

export default App;
