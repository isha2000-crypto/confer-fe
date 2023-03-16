export interface Timeline {
  totalCheckPoints: number
  currentCheckPoint?: number
  handlePointClick: (index: number) => void
}
