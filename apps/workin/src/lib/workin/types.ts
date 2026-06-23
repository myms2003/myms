import type { LucideIcon } from "lucide-react"

export type Partner = "Martin" | "Mateo"

export type TaskStatus = "due" | "done"

export type TaskArea =
  | "landing pages"
  | "web building"
  | "marketing"
  | "research"
  | "demos"
  | "outreach"
  | "finance"
  | "pricing"
  | "commercial structure"

export type WorkTask = {
  id: string
  title: string
  detail: string
  owner: Partner
  status: TaskStatus
  area: TaskArea
  priority: "High" | "Medium" | "Low"
  due: string
}

export type Idea = {
  id: string
  title: string
  source: string
  signal: string
  impact: number
  effort: number
  industry: string
}

export type Prospect = {
  company: string
  industry: string
  fit: "Strong" | "Medium" | "Watch"
  pain: string
  nextMove: string
  owner: Partner
}

export type IndustryResearch = {
  industry: string
  thesis: string
  prospects: Prospect[]
}

export type AgentStep = {
  title: string
  description: string
  output: string
  icon: LucideIcon
}

export type AnalyzedIdea = Idea & {
  score: number
  lane: "Build" | "Commercial" | "Research"
}
