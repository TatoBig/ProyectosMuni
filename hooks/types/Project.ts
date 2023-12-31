import { Timestamp } from 'firebase/firestore'

type Project = {
  id: string
  name: string
  description: string
  initialDate: Timestamp
  endDate: Timestamp
  expectedDate: Timestamp
  idState: string
  idDocument: string
  done: boolean
  doneTasks: number
  totalTasks: number
  startedTasks: number
  stoppedTasks: number
  notStartedTasks: number
  assignedUsers: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

interface ProjectList {
  [key: string]: Project
}

interface ProjectInput extends Omit<Project, 'id'> {}
type ProjectUpdate = Partial<ProjectInput>

export type { ProjectList, Project, ProjectInput, ProjectUpdate }
