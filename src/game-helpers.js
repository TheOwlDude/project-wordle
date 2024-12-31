/**
 * Thanks to Github user dylano for supplying a more-accurate
 * solving algorithm!
 */
import {WORD_LIST} from "./word-list";

export function checkGuess(guess, answer) {
  // This constant is a placeholder that indicates we've successfully
  // dealt with this character (it's correct, or misplaced).
  const SOLVED_CHAR = '✓';

  if (!guess) {
    return null;
  }

  const guessChars = guess.split('');
  const answerChars = answer.split('');

  const result = [];

  // Step 1: Look for correct letters.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        letter: guessChars[i],
        status: 'correct',
      };
      answerChars[i] = SOLVED_CHAR;
      guessChars[i] = SOLVED_CHAR;
    }
  }

  // Step 2: look for misplaced letters. If it's not misplaced,
  // it must be incorrect.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === SOLVED_CHAR) {
      continue;
    }

    let status = 'incorrect';
    const misplacedIndex = answerChars.findIndex(
      (char) => char === guessChars[i]
    );
    if (misplacedIndex >= 0) {
      status = 'misplaced';
      answerChars[misplacedIndex] = SOLVED_CHAR;
    }

    result[i] = {
      letter: guessChars[i],
      status,
    };
  }

  return result;
}

export function getConsistentWords(guessList, answer) {
  const guessResults = [];
  for(let i = 0; i < guessList.length; ++i) {
    guessResults.push(checkGuess(guessList[i].guess, answer));
  }

  const consistentWords = [];
  for(let i = 0; i < WORD_LIST.length; ++i) {
    let isMatch = true;
    for(let j = 0; j < guessResults.length; j++) {
      const testResult = checkGuess(guessList[j].guess, WORD_LIST[i]);
      for(let k = 0; k < guessResults[j].length; k++) {
        if (!(testResult) || testResult[k].status !== guessResults[j][k].status) {
          isMatch = false;
          break;
        }
      }
      if (!isMatch) {
        break;
      }
    }
    if (isMatch) {
      consistentWords.push(WORD_LIST[i]);
    }
  }

  return consistentWords;
}


export function getExpectedGuessResults(currentGuessList, answer) {
  const consistentWords = getConsistentWords(currentGuessList, answer);

  if (consistentWords.length > 100) {
    return [
      {
        guess: "There need to be <= 100 consistent words to calculate best guess",
        meanConsistentCodesAfterGuess: 9000000
      }
    ];
  }

  const guessResults= [];

  for(let i = 0; i < WORD_LIST.length; ++i) {
    let numerator = 0;
    let denominator = 0;
    for(let j = 0; j < consistentWords.length; j++) {
      ++denominator;
      const augmentedGuessList = [...currentGuessList, {guess: WORD_LIST[i]}];
      const augmentedConsistentCodes = getConsistentWords(augmentedGuessList, consistentWords[j]);
      if (augmentedConsistentCodes.length > 1 || augmentedConsistentCodes[0] !== WORD_LIST[i]) {
        numerator += augmentedConsistentCodes.length;
      }
    }
    guessResults.push({guess: WORD_LIST[i], meanConsistentCodesAfterGuess: numerator / denominator});
  }

  return guessResults.sort((a, b) => a.meanConsistentCodesAfterGuess - b.meanConsistentCodesAfterGuess);
}

