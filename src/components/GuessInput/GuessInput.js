import React, {useContext} from 'react';
import {NUM_OF_GUESSES_ALLOWED} from "../../constants";
import { v4 as uuidv4 } from 'uuid';
import {GameStateContext} from "../GameStateProvider";
import {WORD_LIST} from "../../word-list";

function GuessInput() {
    const {answer, guessList, setGuessList, setGameOver} = useContext(GameStateContext);
    const [guess, setGuess] = React.useState('');
    
    return (
        <form className="guess-input-wrapper" onSubmit={
            (event) => {
                event.preventDefault();

                const newGuessList = [...guessList, {guess, id: uuidv4()}];

                if (guessList.length >= NUM_OF_GUESSES_ALLOWED) {
                    setGameOver(true);
                    //alert('No more guess allowed :-(');
                    return;
                }
                
                if(!WORD_LIST.includes(guess)) {
                    alert("Your guess is not in the allowed word list");
                    return;
                }
                
                setGuessList(newGuessList);
                setGuess("");

                if (newGuessList[newGuessList.length - 1].guess === answer) {
                    setGameOver(true);
                }
            }
        }>
            <input
                type="text"
                id="guess-input"
                value={guess}
                pattern="[A-Z]{5}"
                required={true}
                maxLength="5"
                autoFocus={true}
                autoComplete="off"
                onChange={
                    (event) => {
                        if (guessList.length >= NUM_OF_GUESSES_ALLOWED ) {
                            return;
                        }
                        if (guessList.length > 0 && guessList[guessList.length - 1].guess === answer) {
                            return;
                        }
                        setGuess(event.target.value.toUpperCase());
                    }
                }>

            </input>
            <div className="happy banner" hidden={!(guessList.length > 0 && guessList[guessList.length - 1].guess === answer)}>
                <p>
                    <strong>Congrautlations!</strong> Got it in
                    <strong>{` ${guessList.length} guesses`}</strong>
                </p>
            </div>
            <div className="sad banner" hidden={!(guessList.length === NUM_OF_GUESSES_ALLOWED && guessList[guessList.length - 1] !== answer)}>
                <p>
                    Sorry, the correct answer is <strong>{answer}</strong>.
                </p>
            </div>
        </form>);
}

export default GuessInput;