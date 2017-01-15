export function getRandomNum(range) {
  let { min, max } = range
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const guessCheck = (guess, secret, range) => {
  let { min, max } = range
  if (guess < min || guess > max) {
    return `Please enter a number between ${min} and ${max}`
  } else {
    if (guess > secret) {
      return `That is too high!`
    } else if (guess < secret) {
      return `That is too low!`
    } else {
      return `That is correct! You win!`
    }
  }

}
