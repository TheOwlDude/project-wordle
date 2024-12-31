import React from 'react';

import GuessInput from '../GuessInput';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessList from "../GuessList";
import {WORD_LIST} from "../../word-list";
import NewGameButton from "../NewGameButton";

function Game() {
  return (
      <>
        <GuessList/>
        <NewGameButton></NewGameButton>  
        <GuessInput/>
      </>
  );
}

export default Game;
