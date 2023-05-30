export const minutesToSeconds = (minutes: number): number => {
  const seconds = parseInt(`${minutes * 60}`)

  return !isNaN(seconds) ? seconds : 0
}
export const secondsToMinutes = (seconds: number): number => {
  const minutes = parseInt(`${seconds / 60}`)

  return !isNaN(minutes) ? minutes : 0
}
