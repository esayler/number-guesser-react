export function getRandomNum(range) {
  let { min, max } = range
  const maxInt = parseInt(max, 10);
  const minInt = parseInt(min, 10);

  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt
}

export const guessCheck = (guess, secret, range) => {
  let { min, max } = range
  console.log(guess)

  const guessInt = parseInt(guess, 10);
  const maxInt = parseInt(max, 10);
  const minInt = parseInt(min, 10);


  if (guessInt < minInt || guessInt > maxInt) {
    return {
      winstate: false,
      msg: `please enter a number between ${minInt} and ${maxInt}`,
    }
  } else {
    if (guessInt > secret) {
      return {
        winState: false,
        msg: `Sorry, that guess is too high. Try a lower number.`,
      }
    } else if (guessInt < secret) {
      return {
        winState: false,
        msg: `Sorry, that guess is too low. Try a higher number.`,
      }
    } else if (guessInt === secret) {
      return {
        winState: true,
        msg: `That is correct! You win!`
      }
    } else {
    return {
      winstate: false,
      msg: `please enter a number between ${minInt} and ${maxInt}`,
    }
    }
  }
}
