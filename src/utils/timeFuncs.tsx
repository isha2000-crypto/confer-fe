export const convertToTime = (value: number) => {
  return Math.floor(value / 60) + ':' + ('0' + Math.floor(value % 60)).slice(-2)
}
