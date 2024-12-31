import GuessList from "../GuessList";
import {useContext} from "react";
import {GameStateContext} from "../GameStateProvider";
import {sample} from "../../utils";
import {WORD_LIST} from "../../word-list";

function NewGameButton() {
    const {setAnswer, setGuessList, setGameOver} = useContext(GameStateContext);

    return (
        <button style={{border: "2px solid black"}} onClick={(event) =>{
            setAnswer(sample(WORD_LIST));
            setGameOver(false);
            setGuessList([]);
        }}>
            New Game
        </button>
    )
}

export default NewGameButton;