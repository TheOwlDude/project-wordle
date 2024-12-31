import React, {useContext} from 'react';
import {getConsistentWords, getExpectedGuessResults} from "../../game-helpers";
import {GameStateContext} from "../GameStateProvider";

function CheatMode() {
  const {answer, guessList} = useContext(GameStateContext);
  const [selectedCheatMode, setSelectedCheatMode] = React.useState('noCheat');

  const joinedConsistentWords = React.useMemo(
      () => getConsistentWords(guessList, answer).join('\n'),
      [guessList, selectedCheatMode]
  );

  const joinedBestGuess = React.useMemo(
        () => getExpectedGuessResults(guessList, answer).map((guess) => `${guess.guess}: ${guess.meanConsistentCodesAfterGuess}`).join('\n'),
        [guessList]
    );

  const handleCheatModeChanged = (event) => {
      setSelectedCheatMode(event.target.value);
  }
  
  return (
        <>
            <div>
                <h2>Select Cheat Mode</h2>
                <p>
                  <label>
                      <input type="radio"
                             name="cheatMode"
                             value="noCheat"
                             checked={selectedCheatMode === "noCheat"}
                             onChange={handleCheatModeChanged}
                      />
                      { " No Cheat"}
                  </label>
                </p>
                <p>
                  <label>
                      <input type="radio"
                             name="cheatMode"
                             value="consistentWords"
                             checked={selectedCheatMode === "consistentWords"}
                             onChange={handleCheatModeChanged}
                      />
                      { " Consistent Words" }
                  </label>
                </p>
                <p>
                  <label>
                      <input type="radio"
                             name="cheatMode"
                             value="bestGuess"
                             checked={selectedCheatMode === "bestGuess"}
                             onChange={handleCheatModeChanged}
                      />
                      { " Best Guess"}
                  </label>
                </p>
            </div>
            <div>
                {selectedCheatMode !== 'noCheat' && (
                    <textarea value={selectedCheatMode === 'consistentWords' ? joinedConsistentWords : joinedBestGuess} readOnly/>
                )}
            </div>
        </>
  );
}

export default CheatMode;
