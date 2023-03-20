export interface Task {
  _id: string
  type: string
  description: string
  duration: number
}

export interface Assessment {
  _id: string
  type: string
  title: string
  time: string
  responses: string
  tasks: Task[]
  author: string
}
