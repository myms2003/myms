import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  LineChart,
  RadioTower,
  Sparkles,
  Target,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAgentSteps, getAnalyzedIdeas, createTasksFromIdeas } from "@/lib/workin/agents"
import { focusMap, research, tasks } from "@/lib/workin/data"
import type { Partner, TaskStatus, WorkTask } from "@/lib/workin/types"

const priorityClass = {
  High: "border-blue-400/30 bg-blue-500/15 text-blue-200",
  Medium: "border-cyan-400/25 bg-cyan-500/10 text-cyan-200",
  Low: "border-slate-400/20 bg-slate-500/10 text-slate-300",
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="text-xs font-medium uppercase tracking-[0.24em] text-blue-300">
          {eyebrow}
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {title}
        </h2>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
    </div>
  )
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string
  value: string
  detail: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Card className="rounded-lg border-white/10 bg-white/[0.045] shadow-none">
      <CardContent className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</div>
          <p className="mt-2 text-sm text-slate-500">{detail}</p>
        </div>
        <div className="rounded-lg border border-blue-400/20 bg-blue-500/10 p-2 text-blue-300">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  )
}

function TaskCard({ task }: { task: WorkTask }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-4 transition hover:border-blue-400/35 hover:bg-blue-500/[0.06]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-medium leading-6 text-white">{task.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-400">{task.detail}</p>
        </div>
        <Badge variant="outline" className={priorityClass[task.priority]}>
          {task.priority}
        </Badge>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Badge variant="outline" className="border-white/10 bg-white/[0.04] text-slate-300">
          {task.area}
        </Badge>
        <span>{task.due}</span>
      </div>
    </div>
  )
}

function TaskLane({
  owner,
  status,
  title,
}: {
  owner: Partner
  status: TaskStatus
  title: string
}) {
  const ownerTasks = tasks.filter((task) => task.owner === owner && task.status === status)

  return (
    <Card className="rounded-lg border-white/10 bg-white/[0.04] shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          {title}
          <span className="text-sm text-slate-500">{ownerTasks.length}</span>
        </CardTitle>
        <CardDescription>
          {status === "due" ? "Active execution queue" : "Recently completed work"}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {ownerTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </CardContent>
    </Card>
  )
}

function PartnerSection({ owner }: { owner: Partner }) {
  return (
    <section id={owner.toLowerCase()} className="scroll-mt-8">
      <SectionHeader
        eyebrow={`${owner} section`}
        title={`${owner}'s operating lane`}
        description={`${owner} focuses on ${focusMap[owner].join(", ")}. Due and done lists stay split so ownership remains easy to scan.`}
      />
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <TaskLane owner={owner} status="due" title="Due" />
        <TaskLane owner={owner} status="done" title="Done" />
      </div>
    </section>
  )
}

function IdeasSection() {
  const analyzedIdeas = getAnalyzedIdeas()
  const generatedTasks = createTasksFromIdeas()

  return (
    <section id="ideas" className="scroll-mt-8">
      <SectionHeader
        eyebrow="Ideas / Tasks"
        title="From signal to assigned work"
        description="WorkIn keeps the backlog concrete: every idea has source context, deterministic analysis, and a task route."
      />
      <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-lg border-white/10 bg-white/[0.04] shadow-none">
          <CardHeader>
            <CardTitle className="text-white">Idea queue</CardTitle>
            <CardDescription>Real MYMS opportunities under review.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {analyzedIdeas.map((idea) => (
              <div key={idea.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-medium text-white">{idea.title}</h4>
                  <Badge className="bg-blue-500 text-white">Score {idea.score}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{idea.signal}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-white/10 text-slate-300">
                    {idea.source}
                  </Badge>
                  <Badge variant="outline" className="border-white/10 text-slate-300">
                    {idea.industry}
                  </Badge>
                  <Badge variant="outline" className="border-blue-400/30 bg-blue-500/10 text-blue-200">
                    {idea.lane}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg border-white/10 bg-white/[0.04] shadow-none">
          <CardHeader>
            <CardTitle className="text-white">Agent-created tasks</CardTitle>
            <CardDescription>Generated locally from deterministic TypeScript rules.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {generatedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function ResearchSection() {
  return (
    <section id="research" className="scroll-mt-8">
      <SectionHeader
        eyebrow="Research"
        title="Industry thesis and prospects"
        description="Research is grouped by industry so Martin can shape demos and Mateo can move commercial conversations."
      />
      <Tabs defaultValue={research[0].industry} className="mt-6">
        <TabsList className="border border-white/10 bg-white/[0.04]">
          {research.map((item) => (
            <TabsTrigger key={item.industry} value={item.industry} className="text-slate-300 data-active:text-white">
              {item.industry}
            </TabsTrigger>
          ))}
        </TabsList>
        {research.map((item) => (
          <TabsContent key={item.industry} value={item.industry} className="mt-4">
            <Card className="rounded-lg border-white/10 bg-white/[0.04] shadow-none">
              <CardHeader>
                <CardTitle className="text-white">{item.industry}</CardTitle>
                <CardDescription className="max-w-4xl leading-6">{item.thesis}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {item.prospects.map((prospect) => (
                  <div key={prospect.company} className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-medium text-white">{prospect.company}</h4>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{prospect.pain}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-blue-400/30 bg-blue-500/10 text-blue-200"
                      >
                        {prospect.fit}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-start gap-2 text-sm text-slate-300">
                      <ExternalLink className="mt-0.5 size-4 text-blue-300" />
                      {prospect.nextMove}
                    </div>
                    <div className="mt-4 text-xs text-slate-500">Owner: {prospect.owner}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

function AgentsSection() {
  const steps = getAgentSteps()

  return (
    <section id="agents" className="scroll-mt-8">
      <SectionHeader
        eyebrow="Agents"
        title="Deterministic local agent flow"
        description="No OpenAI API is used. The pipeline simulates agent behavior locally and can later call Supabase-backed services."
      />
      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon

          return (
            <Card key={step.title} className="rounded-lg border-white/10 bg-white/[0.04] shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="rounded-lg border border-blue-400/20 bg-blue-500/10 p-2 text-blue-300">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
                </div>
                <CardTitle className="text-white">{step.title}</CardTitle>
                <CardDescription className="leading-6">{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-slate-200">
                  {step.output}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

export function WorkInDashboard() {
  const dueTasks = tasks.filter((task) => task.status === "due")
  const doneTasks = tasks.filter((task) => task.status === "done")
  const generatedTasks = createTasksFromIdeas()

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section className="grid min-h-[420px] content-end gap-8 rounded-lg border border-white/10 bg-black/25 p-5 shadow-[0_30px_120px_rgba(15,23,42,0.65)] sm:p-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-200">
            <RadioTower className="size-4" />
            MYMS internal operations
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            WorkIn keeps Martin and Mateo moving from ideas to assigned execution.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
            A premium private dashboard for partner tasks, research, prospecting, commercial structure, and simulated local agents.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            label="Due partner tasks"
            value={String(dueTasks.length)}
            detail="Split by Martin and Mateo"
            icon={Clock3}
          />
          <MetricCard
            label="Completed tasks"
            value={String(doneTasks.length)}
            detail="Recent operating progress"
            icon={CheckCircle2}
          />
          <MetricCard
            label="Agent-generated"
            value={String(generatedTasks.length)}
            detail="Local deterministic assignments"
            icon={Bot}
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-lg border-white/10 bg-white/[0.04] shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="size-5 text-blue-300" />
              Current priority
            </CardTitle>
            <CardDescription>
              Turn the WorkIn dashboard into a demo-ready MYMS operating asset.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="rounded-lg border-white/10 bg-white/[0.04] shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <LineChart className="size-5 text-blue-300" />
              Commercial focus
            </CardTitle>
            <CardDescription>
              Package a clear pilot offer with pricing, proof, and a prospect-specific page.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="rounded-lg border-white/10 bg-white/[0.04] shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CircleDollarSign className="size-5 text-blue-300" />
              Revenue path
            </CardTitle>
            <CardDescription>
              Use agency and service prospects to validate an internal ops sprint.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <PartnerSection owner="Martin" />
      <PartnerSection owner="Mateo" />
      <IdeasSection />
      <ResearchSection />
      <AgentsSection />

      <section className="rounded-lg border border-blue-400/20 bg-blue-500/10 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-blue-200">
              <Sparkles className="size-4" />
              Next operating loop
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Add Supabase tables for ideas, tasks, research notes, prospects, and agent runs when auth is ready.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-100">
            Idea
            <ArrowRight className="size-4" />
            Analyze
            <ArrowRight className="size-4" />
            Assign
            <ArrowRight className="size-4" />
            Due
          </div>
        </div>
      </section>
    </main>
  )
}
