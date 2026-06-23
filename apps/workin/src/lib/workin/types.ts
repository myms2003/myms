export type Partner = "Martín" | "Mateo"

export type TaskStatus = "pending" | "done" | "blocked"

export type TaskArea =
  | "Landing"
  | "Marketing"
  | "Research"
  | "Outreach"
  | "Finanzas"
  | "Contenido"
  | "Producto"

export type WorkTask = {
  id: string
  title: string
  detail: string
  owner: Partner
  status: TaskStatus
  area: TaskArea
  priority: "Alta" | "Media" | "Baja"
  dueLabel: string
}

export type IdeaStatus = "Nueva" | "Analizar" | "Lista"

export type Idea = {
  id: string
  title: string
  description: string
  status: IdeaStatus
}

export type Prospect = {
  id: string
  company: string
  industry: string
  fit: "Alto" | "Medio" | "Observar"
  pain: string
  nextMove: string
  owner: Partner
}

export type ResearchArea = {
  id: string
  title: string
  description: string
  prospects: Prospect[]
}

export type RoadmapItem = {
  title: string
  progress: number
  status: "En curso" | "Siguiente" | "Pendiente"
}

export type RoadmapGroup = {
  title: "MYMS" | "WorkIn"
  items: RoadmapItem[]
}

export type PlanningTask = {
  id: string
  title: string
  owner: Partner
  priority: "Alta" | "Media" | "Baja"
}

export type WeeklyPlanDay = {
  day: string
  tasks: PlanningTask[]
}

export type MonthlyPlanWeek = {
  week: string
  focus: string
  tasks: PlanningTask[]
}

export type AnnualQuarter = {
  quarter: "Q1" | "Q2" | "Q3" | "Q4"
  focus: string
  milestones: string[]
}

export type RecentActivity = {
  id: string
  title: string
  detail: string
  timeLabel: string
}

export type WeeklyPriority = {
  title: string
  progress: number
  items: string[]
}
