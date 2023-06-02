/* eslint-disable no-plusplus */
/* eslint-disable no-undef */

import { CheckPasswordStrength } from 'renderer/scripts/strongPasswords';

// eslint-disable-next-line import/prefer-default-export
export function GeneratePassword(PassWordLength) {
  let i;
  const Symbols = new Array(40);
  const Numbers = new Array(10);
  const UpperCase = new Array(30);
  const LowerCase = new Array(30);

  let totalSymbols = 0;
  let totalLowerCase = 0;
  let totalUpperCase = 0;
  let totalNumbers = 0;

  for (i = 32; i < 127; i++) {
    const currChar = String.fromCharCode(i);
    if (currChar.match(/(.*[!,@,#,$,%,^,&,*,?,_,~,(,),{,},+,-])/)) {
      Symbols[totalSymbols++] = currChar;
    } else if (currChar.match(/[A-Z]/g)) {
      UpperCase[totalUpperCase++] = currChar;
    } else if (currChar.match(/[a-z]/g)) {
      LowerCase[totalLowerCase++] = currChar;
    } else if (currChar.match(/[0-9]/g)) {
      Numbers[totalNumbers++] = currChar;
    }
  }
  let GeneratedPassword = '';
  for (i = 0; i < PassWordLength; i++) {
    const RandInt = Math.floor(Math.random() * 101);
    if (i < Math.floor(PassWordLength / 4)) {
      GeneratedPassword += Symbols[RandInt % totalSymbols];
    } else if (
      i <
      Math.floor(PassWordLength / 4) + Math.floor((PassWordLength + 1) / 4)
    ) {
      GeneratedPassword += Numbers[RandInt % totalNumbers];
    } else if (
      i <
      Math.floor(PassWordLength / 4) +
        Math.floor((PassWordLength + 1) / 4) +
        Math.floor((PassWordLength + 2) / 4)
    ) {
      GeneratedPassword += UpperCase[RandInt % totalUpperCase];
    } else {
      GeneratedPassword += LowerCase[RandInt % totalLowerCase];
    }
  }

  for (i = 0; i < PassWordLength; i++) {
    const RandInt = Math.floor(Math.random() * (PassWordLength - i));
    if (RandInt !== 0) {
      GeneratedPassword =
        GeneratedPassword.substr(0, i) +
        GeneratedPassword.charAt(i + RandInt) +
        GeneratedPassword.substr(i + 1, RandInt - 1) +
        GeneratedPassword.charAt(i) +
        GeneratedPassword.substr(
          i + RandInt + 1,
          PassWordLength - i - RandInt - 1
        );
    }
  }

  const passwordStrength = CheckPasswordStrength(GeneratedPassword);

  return { meterValue: passwordStrength, generatedPassword: GeneratedPassword };
}
