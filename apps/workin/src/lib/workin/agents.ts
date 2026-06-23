import { CheckCircle2, GitBranch, ListTodo, Sparkles } from "lucide-react"

import { focusMap, ideas } from "./data"
import type { AgentStep, AnalyzedIdea, Idea, Partner, TaskArea, WorkTask } from "./types"

const martinAreas = new Set<TaskArea>(focusMap.Martin)

function analyzeIdea(idea: Idea): AnalyzedIdea {
  const score = idea.impact * 10 - idea.effort * 4
  const lane =
    idea.title.toLowerCase().includes("pricing") || idea.signal.toLowerCase().includes("pricing")
      ? "Commercial"
      : idea.industry === "Agencies"
        ? "Build"
        : "Research"

  return { ...idea, score, lane }
}

function taskAreaForIdea(idea: AnalyzedIdea): TaskArea {
  if (idea.lane === "Commercial") return "pricing"
  if (idea.title.toLowerCase().includes("landing")) return "landing pages"
  if (idea.lane === "Research") return "research"
  return "web building"
}

function ownerForArea(area: TaskArea): Partner {
  if (area === "research") return "Mateo"
  return martinAreas.has(area) ? "Martin" : "Mateo"
}

export function createTasksFromIdeas(sourceIdeas = ideas): WorkTask[] {
  return sourceIdeas.map((idea, index) => {
    const analyzed = analyzeIdea(idea)
    const area = taskAreaForIdea(analyzed)
    const owner = ownerForArea(area)

    return {
      id: `agent-task-${idea.id}`,
      title:
        owner === "Martin"
          ? `Prototype: ${idea.title}`
          : `Commercialize: ${idea.title}`,
      detail: `${analyzed.signal} Local agent score ${analyzed.score}; route through ${analyzed.lane.toLowerCase()} lane.`,
      owner,
      status: "due",
      area,
      priority: index === 0 ? "High" : "Medium",
      due: index === 0 ? "Next" : "Backlog",
    }
  })
}

export function getAnalyzedIdeas(sourceIdeas = ideas): AnalyzedIdea[] {
  return sourceIdeas.map(analyzeIdea).sort((a, b) => b.score - a.score)
}

export function getAgentSteps(): AgentStep[] {
  const analyzed = getAnalyzedIdeas()
  const generatedTasks = createTasksFromIdeas()
  const martinCount = generatedTasks.filter((task) => task.owner === "Martin").length
  const mateoCount = generatedTasks.filter((task) => task.owner === "Mateo").length

  return [
    {
      title: "Idea intake",
      description: "New MYMS operating ideas enter one queue with source, industry, effort, and expected impact.",
      output: `${ideas.length} active ideas queued`,
      icon: Sparkles,
    },
    {
      title: "Idea analysis",
      description: "Deterministic scoring ranks impact against effort and classifies each idea into build, research, or commercial lanes.",
      output: `${analyzed[0].title} is the top signal`,
      icon: CheckCircle2,
    },
    {
      title: "Task creation",
      description: "Each idea becomes one concrete execution task with priority, scope, owner-ready detail, and due state.",
      output: `${generatedTasks.length} due tasks generated`,
      icon: ListTodo,
    },
    {
      title: "Task distribution",
      description: "Routing uses partner focus areas: Martin gets build, landing, marketing, and demos; Mateo gets research, outreach, finance, pricing, and structure.",
      output: `${martinCount} Martin / ${mateoCount} Mateo`,
      icon: GitBranch,
    },
  ]
}
