import {range} from "../../utils";
import {NUM_OF_GUESSES_ALLOWED} from "../../constants";
import {checkGuess} from "../../game-helpers";

function GuessList( {guessList, answer} ) {
    return (
        <div className="guess-results">
            {
                range(0, NUM_OF_GUESSES_ALLOWED, 1).map( i => {
                    if (i < guessList.length) {
                        const guessResult = checkGuess(guessList[i].guess, answer);
                        return (
                            <p className="guess" key={`display${guessList[i].id}`}>
                                <span className={`cell ${guessResult[0].status}`}>{guessList[i].guess[0]}</span>
                                <span className={`cell ${guessResult[1].status}`}>{guessList[i].guess[1]}</span>
                                <span className={`cell ${guessResult[2].status}`}>{guessList[i].guess[2]}</span>
                                <span className={`cell ${guessResult[3].status}`}>{guessList[i].guess[3]}</span>
                                <span className={`cell ${guessResult[4].status}`}>{guessList[i].guess[4]}</span>
                            </p>);
                    } else {
                        return (
                            <p className="guess" key={`display${i}`}>
                                <span className="cell"></span>
                                <span className="cell"></span>
                                <span className="cell"></span>
                                <span className="cell"></span>
                                <span className="cell"></span>
                            </p>);
                    }
                })
            }
        </div>
    );
}

export default GuessList;