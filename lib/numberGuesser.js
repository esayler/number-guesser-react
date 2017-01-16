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
      return `Sorry, that guess is too high. Try a lower number.`
    } else if (guess < secret) {
      return `Sorry, that guess is too low. Try a higher number.`
    } else {
      return `That is correct! You win!`
    }
  }

}
