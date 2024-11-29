import React from 'react';
import {NUM_OF_GUESSES_ALLOWED} from "../../constants";

function GuessInput({guessList, setGuessList, answer}) {
    const [guess, setGuess] = React.useState('');
    
    const [gameOver, setGameOver] = React.useState(false);
    
    return (
        <form className="guess-input-wrapper" onSubmit={
            (event) => {
                event.preventDefault();

                const newGuessList = [...guessList, {guess, id: crypto.randomUUID()}];

                if (guessList.length >= NUM_OF_GUESSES_ALLOWED) {
                    setGameOver(true);
                    //alert('No more guess allowed :-(');
                    return;
                }

                console.log({guess});

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