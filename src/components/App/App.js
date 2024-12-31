import Game from '../Game';
import Header from '../Header';
import {createContext} from "react";
import GameStateProvider from "../GameStateProvider";
import ConsistentWords from "../ConsistentWords";


function App() {
  return (
    <GameStateProvider>  
      <div className="wrapper">
        <Header />

        <div className="game-wrapper">
          <Game />
          <ConsistentWords />
        </div>

      </div>
    </GameStateProvider>
  );
}

export default App;
