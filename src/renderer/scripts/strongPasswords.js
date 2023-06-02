/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
export const CheckPasswordStrength = (password) => {
  const Symbols = 0;
  let UpperCaseLetters = 0;
  const LowerCaseLetters = 0;
  let Numbers = 0;
  let Score = 0;
  let i = 0;

  const onlyLowerCase = false;
  let onlyNumbers = false;

  let consecutiveNumbers = 0;
  let consecutiveSameCharacters = 0;

  const numberBonus = 4;
  const symbolBonus = 6;
  const upperCaseBonus = 3;
  const lengthBonus = 6;

  const consecutiveNumbersPenalty = 4;
  const consecutiveSameCharactersPenalty = 4;
  const noSymbolPenalty = 10;
  const noUpperCasePenalty = 10;
  const noNumberPenalty = 10;

  if (password.length >= 6) {
    Score += 20;
    for (i = 0; i < password.length; i++) {
      if (password[i].match(/[A-Z]/g)) {
        UpperCaseLetters++;
      }

      if (password[i].match(/[0-9]/g)) {
        Numbers++;
        if (i > 0) {
          if (password[i] == password[i - 1]) {
            consecutiveNumbers++;
          }
        }
      } else if (i > 0) {
        if (password[i] == password[i - 1]) {
          consecutiveSameCharacters++;
        }
      }
      if (password.match(/^[\s0-9]+$/)) {
        onlyNumbers = true;
      }
    }

    Score +=
      numberBonus * Numbers +
      symbolBonus * Symbols +
      upperCaseBonus * UpperCaseLetters +
      lengthBonus * (password.length - 6);
    Score -= consecutiveNumbers * consecutiveNumbersPenalty;
    Score -= consecutiveSameCharactersPenalty * consecutiveSameCharacters;

    if (!Numbers) {
      Score -= noNumberPenalty;
    }
    if (!Symbols) {
      Score -= noSymbolPenalty;
    }
    if (!UpperCaseLetters) {
      Score -= noUpperCasePenalty;
    }
  }

  return Score;
};
