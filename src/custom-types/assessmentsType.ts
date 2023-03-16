export interface Task {
  id: string
  type: string
  description: string
  duration: number
}

export interface Assessment {
  id: string
  type: string
  title: string
  time: string
  responses: string
  tasks: Task[]
  author: string
}
