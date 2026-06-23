"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Lightbulb,
  Plus,
  Search,
  Settings,
  UserRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  annualRoadmap,
  blockedTasks,
  dailyPlan,
  focusMap,
  ideas,
  monthlyPlan,
  recentActivity,
  researchAreas,
  roadmap,
  tasks,
  weeklyPlan,
  weeklyPriority,
} from "@/lib/workin/data"
import type { Idea, Partner, PlanningTask, WorkTask } from "@/lib/workin/types"

type DashboardView =
  | "inicio"
  | "martin"
  | "mateo"
  | "ideas"
  | "research"
  | "roadmap"
  | "configuracion"

const viewFromHash: Record<string, DashboardView> = {
  martin: "martin",
  mateo: "mateo",
  ideas: "ideas",
  research: "research",
  roadmap: "roadmap",
  configuracion: "configuracion",
}

const partnerIds: Record<Partner, "martin" | "mateo"> = {
  Martín: "martin",
  Mateo: "mateo",
}

const priorityRank = { Alta: 0, Media: 1, Baja: 2 }

const priorityClass = {
  Alta: "border-[#2D7FF9]/30 bg-[#2D7FF9]/10 text-[#1f6fe5] dark:text-blue-200",
  Media:
    "border-slate-300 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300",
  Baja: "border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400",
}

const ideaStatusClass = {
  Nueva: "border-[#2D7FF9]/30 bg-[#2D7FF9]/10 text-[#1f6fe5] dark:text-blue-200",
  Analizar:
    "border-slate-300 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300",
  Lista:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-500/10 dark:text-emerald-200",
}

function useDashboardView() {
  const [view, setView] = useState<DashboardView>("inicio")

  useEffect(() => {
    function syncView() {
      const hash = window.location.hash.replace("#", "")
      setView(viewFromHash[hash] ?? "inicio")
      window.scrollTo({ top: 0 })
    }

    syncView()
    window.addEventListener("hashchange", syncView)

    return () => window.removeEventListener("hashchange", syncView)
  }, [])

  return view
}

function DashboardCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card
      className={[
        "rounded-lg border-slate-200 bg-white shadow-none dark:border-white/10 dark:bg-white/[0.045]",
        className,
      ].join(" ")}
    >
      {children}
    </Card>
  )
}

function PageHeader({
  label,
  title,
  description,
  icon: Icon,
}: {
  label: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-[#2D7FF9]/20 bg-[#2D7FF9]/10 px-3 py-1 text-sm text-[#1f6fe5] dark:text-blue-200">
          <Icon className="size-4" />
          {label}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base sm:leading-7">
          {description}
        </p>
      </div>
    </div>
  )
}

function SectionHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
      ) : null}
    </div>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
      <div
        className="h-full rounded-full bg-[#2D7FF9]"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
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
  value: number
  detail: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <DashboardCard>
      <CardContent className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {value}
          </div>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">{detail}</p>
        </div>
        <div className="rounded-lg border border-[#2D7FF9]/20 bg-[#2D7FF9]/10 p-2 text-[#2D7FF9] dark:text-blue-300">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </DashboardCard>
  )
}

function EmptyState({
  title,
  text,
  action,
}: {
  title: string
  text: string
  action?: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-white/15 dark:bg-black/20">
      <h3 className="font-medium text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
        {text}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}

function HomeView({ workTasks }: { workTasks: WorkTask[] }) {
  const pendingTasks = workTasks.filter((task) => task.status === "pending")
  const doneTasks = workTasks.filter((task) => task.status === "done")
  const researchProspects = researchAreas.flatMap((area) => area.prospects)

  return (
    <div className="grid gap-8">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <DashboardCard className="p-1">
          <CardContent className="grid gap-6 p-5 sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <PageHeader
                label="Inicio"
                title="Qué necesita MYMS para avanzar."
                description="Una vista rápida para decidir qué trabajar hoy, qué está bloqueado, dónde hay oportunidades y cuál es el foco semanal."
                icon={ClipboardList}
              />
              <Button asChild className="w-fit bg-[#2D7FF9] text-white hover:bg-[#1f6fe5]">
                <a href="https://www.instagram.com/MYMS.digital" target="_blank" rel="noreferrer">
                  Ver Instagram de MYMS
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                      {weeklyPriority.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Progreso estimado
                    </p>
                  </div>
                  <div className="text-3xl font-semibold text-[#2D7FF9]">
                    {weeklyPriority.progress}%
                  </div>
                </div>
                <div className="mt-5">
                  <ProgressBar value={weeklyPriority.progress} />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {weeklyPriority.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="size-4 text-[#2D7FF9]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-950 dark:text-white">
                  <AlertTriangle className="size-5 text-[#2D7FF9]" />
                  Bloqueado
                </h2>
                {blockedTasks.length === 0 ? (
                  <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    No hay bloqueos cargados todavía.
                  </p>
                ) : (
                  <div className="mt-4 grid gap-3">
                    {blockedTasks.map((task) => (
                      <TaskPreview key={task.id} task={task} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </DashboardCard>
      </motion.section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Tareas pendientes"
          value={pendingTasks.length}
          detail="Trabajo abierto"
          icon={ClipboardList}
        />
        <MetricCard
          label="Ideas cargadas"
          value={ideas.length}
          detail="Bandeja interna"
          icon={Lightbulb}
        />
        <MetricCard
          label="Negocios en research"
          value={researchProspects.length}
          detail="Oportunidades reales"
          icon={Search}
        />
        <MetricCard
          label="Hechas esta semana"
          value={doneTasks.length}
          detail="Datos locales"
          icon={CheckCircle2}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <PartnerSummary partner="Martín" workTasks={workTasks} />
        <PartnerSummary partner="Mateo" workTasks={workTasks} />
        <DashboardCard>
          <CardHeader>
            <CardTitle className="text-slate-950 dark:text-white">Oportunidades</CardTitle>
            <CardDescription>Negocios reales cargados desde Research.</CardDescription>
          </CardHeader>
          <CardContent>
            {researchProspects.length === 0 ? (
              <EmptyState
                title="No hay oportunidades cargadas todavía."
                text="Cuando Martín o Mateo agreguen negocios desde Research, acá aparecerán los mejores fits para MYMS."
              />
            ) : null}
          </CardContent>
        </DashboardCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardCard>
          <CardHeader>
            <CardTitle className="text-slate-950 dark:text-white">Actividad reciente</CardTitle>
            <CardDescription>Últimos cambios reales del sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <EmptyState
                title="Todavía no hay actividad reciente."
                text="Las acciones aparecerán acá cuando se creen tareas, ideas o cambios."
              />
            ) : null}
          </CardContent>
        </DashboardCard>

        <DashboardCard>
          <CardHeader>
            <CardTitle className="text-slate-950 dark:text-white">Roadmap</CardTitle>
            <CardDescription>Progreso estimado de los frentes abiertos.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {roadmap.flatMap((group) =>
              group.items.slice(0, 2).map((item) => (
                <div key={`${group.title}-${item.title}`}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">{group.title}: {item.title}</span>
                    <span className="text-slate-500 dark:text-slate-400">{item.status}</span>
                  </div>
                  <ProgressBar value={item.progress} />
                </div>
              ))
            )}
          </CardContent>
        </DashboardCard>
      </section>
    </div>
  )
}

function PartnerSummary({
  partner,
  workTasks,
}: {
  partner: Partner
  workTasks: WorkTask[]
}) {
  const partnerTasks = workTasks.filter((task) => task.owner === partner)
  const pending = partnerTasks.filter((task) => task.status === "pending")
  const done = partnerTasks.filter((task) => task.status === "done")

  return (
    <DashboardCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-950 dark:text-white">
          <UserRound className="size-5 text-[#2D7FF9]" />
          {partner}
        </CardTitle>
        <CardDescription>Foco: {focusMap[partner].join(", ")}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-black/20">
          <p className="text-sm text-slate-500 dark:text-slate-400">Pendientes</p>
          <div className="mt-2 text-2xl font-semibold">{pending.length}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-black/20">
          <p className="text-sm text-slate-500 dark:text-slate-400">Hechas</p>
          <div className="mt-2 text-2xl font-semibold">{done.length}</div>
        </div>
      </CardContent>
    </DashboardCard>
  )
}

function TaskPreview({ task }: { task: WorkTask }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium leading-6 text-slate-950 dark:text-white">{task.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {task.detail}
          </p>
        </div>
        <Badge variant="outline" className={priorityClass[task.priority]}>
          {task.priority}
        </Badge>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Badge variant="outline" className="border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
          {task.area}
        </Badge>
        <span>{task.dueLabel}</span>
      </div>
    </div>
  )
}

function PartnerTaskBoard({
  partner,
  workTasks,
  onAddTask,
  onCompleteTask,
}: {
  partner: Partner
  workTasks: WorkTask[]
  onAddTask: (partner: Partner, title: string) => void
  onCompleteTask: (taskId: string) => void
}) {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const partnerTasks = workTasks.filter((task) => task.owner === partner)
  const pending = partnerTasks
    .filter((task) => task.status === "pending")
    .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])
  const done = partnerTasks.filter((task) => task.status === "done")

  function submitTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newTaskTitle.trim()) return

    onAddTask(partner, newTaskTitle)
    setNewTaskTitle("")
  }

  return (
    <div className="grid gap-8">
      <PageHeader
        label={partner}
        title={`Tablero de ${partner}`}
        description={`Tareas locales de ${partner}. Al marcar una pendiente, pasa a Hechas en esta sesión.`}
        icon={UserRound}
      />

      <DashboardCard>
        <CardHeader>
          <CardTitle className="text-slate-950 dark:text-white">Agregar tarea</CardTitle>
          <CardDescription>Local por ahora. Lista para reemplazar por Supabase.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitTask} className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
              placeholder={`Nueva tarea para ${partner}`}
              className="h-10 bg-white dark:bg-white/[0.04]"
            />
            <Button type="submit" className="bg-[#2D7FF9] text-white hover:bg-[#1f6fe5]">
              <Plus className="size-4" />
              Agregar
            </Button>
          </form>
        </CardContent>
      </DashboardCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <TaskColumn title="Pendientes" count={pending.length}>
          {pending.length === 0 ? (
            <EmptyState title="No hay pendientes." text="Las nuevas tareas aparecerán acá." />
          ) : (
            pending.map((task) => (
              <div
                key={task.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20"
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    aria-label={`Marcar como hecha: ${task.title}`}
                    onCheckedChange={(checked) => {
                      if (checked) onCompleteTask(task.id)
                    }}
                    className="mt-1"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-slate-950 dark:text-white">{task.title}</h3>
                      <Badge variant="outline" className={priorityClass[task.priority]}>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {task.detail}
                    </p>
                    <div className="mt-3 text-xs text-slate-500">{task.dueLabel}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </TaskColumn>

        <TaskColumn title="Hechas" count={done.length}>
          {done.length === 0 ? (
            <EmptyState title="Todavía no hay tareas hechas." text="Las pendientes marcadas como hechas pasarán a esta columna." />
          ) : (
            done.map((task) => (
              <div
                key={task.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 text-[#2D7FF9]" />
                  <div>
                    <h3 className="font-medium text-slate-950 dark:text-white">{task.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {task.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </TaskColumn>
      </div>
    </div>
  )
}

function TaskColumn({
  title,
  count,
  children,
}: {
  title: string
  count: number
  children: React.ReactNode
}) {
  return (
    <DashboardCard>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3 text-slate-950 dark:text-white">
          {title}
          <span className="text-sm text-slate-500 dark:text-slate-400">{count}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">{children}</CardContent>
    </DashboardCard>
  )
}

function IdeasTasksView({ workTasks }: { workTasks: WorkTask[] }) {
  const ideasByStatus = useMemo(
    () => ({
      Nueva: ideas.filter((idea) => idea.status === "Nueva"),
      Analizar: ideas.filter((idea) => idea.status === "Analizar"),
      Lista: ideas.filter((idea) => idea.status === "Lista"),
    }),
    []
  )
  const suggestedTasks = ideasByStatus.Lista.map((idea) => ({
    id: `suggested-${idea.id}`,
    title: `Convertir en tarea: ${idea.title}`,
    description: idea.description,
  }))

  return (
    <div className="grid gap-8">
      <PageHeader
        label="Ideas / Tareas"
        title="Separar señales de ejecución."
        description="Las ideas viven por estado. Las tareas sugeridas muestran qué está listo para convertirse en trabajo concreto."
        icon={Lightbulb}
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <MetricCard label="Ideas nuevas" value={ideasByStatus.Nueva.length} detail="Señales recién cargadas" icon={Lightbulb} />
        <MetricCard label="En análisis" value={ideasByStatus.Analizar.length} detail="Necesitan criterio" icon={Search} />
        <MetricCard label="Tareas activas" value={workTasks.filter((task) => task.status === "pending").length} detail="Ejecución abierta" icon={ClipboardList} />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <IdeaBucket title="Ideas nuevas" ideas={ideasByStatus.Nueva} />
        <IdeaBucket title="En análisis" ideas={ideasByStatus.Analizar} />
        <IdeaBucket title="Listas para convertir en tareas" ideas={ideasByStatus.Lista} />
      </section>

      <DashboardCard>
        <CardHeader>
          <CardTitle className="text-slate-950 dark:text-white">Tareas sugeridas</CardTitle>
          <CardDescription>No se mezclan con las tareas activas hasta que Martín o Mateo las asignen.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {suggestedTasks.length === 0 ? (
            <EmptyState title="No hay tareas sugeridas." text="Cuando una idea esté lista, aparecerá en esta sección." />
          ) : (
            suggestedTasks.map((task) => (
              <div key={task.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20">
                <h3 className="font-medium text-slate-950 dark:text-white">{task.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {task.description}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </DashboardCard>
    </div>
  )
}

function IdeaBucket({ title, ideas }: { title: string; ideas: Idea[] }) {
  return (
    <DashboardCard>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3 text-slate-950 dark:text-white">
          {title}
          <span className="text-sm text-slate-500 dark:text-slate-400">{ideas.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {ideas.length === 0 ? (
          <EmptyState title="Sin ideas." text="No hay elementos en este estado." />
        ) : (
          ideas.map((idea) => (
            <div key={idea.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-medium text-slate-950 dark:text-white">{idea.title}</h3>
                <Badge variant="outline" className={ideaStatusClass[idea.status]}>
                  {idea.status}
                </Badge>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {idea.description}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </DashboardCard>
  )
}

function ResearchView() {
  const researchProspects = researchAreas.flatMap((area) => area.prospects)

  return (
    <div className="grid gap-8">
      <PageHeader
        label="Research"
        title="Oportunidades reales, no nombres inventados."
        description="Esta vista queda lista para cargar negocios desde research. Hasta que existan datos reales, muestra estado vacío."
        icon={Search}
      />

      <DashboardCard>
        <CardHeader>
          <CardTitle className="text-slate-950 dark:text-white">Oportunidades de Research</CardTitle>
          <CardDescription>Solo negocios reales cargados por Martín o Mateo.</CardDescription>
        </CardHeader>
        <CardContent>
          {researchProspects.length === 0 ? (
            <EmptyState
              title="No hay oportunidades cargadas todavía."
              text="Cuando Martín o Mateo agreguen negocios desde Research, acá aparecerán los mejores fits para MYMS."
            />
          ) : null}
        </CardContent>
      </DashboardCard>

      <section className="grid gap-4 lg:grid-cols-2">
        {researchAreas.map((area) => (
          <DashboardCard key={area.id}>
            <CardHeader>
              <CardTitle className="text-slate-950 dark:text-white">{area.title}</CardTitle>
              <CardDescription>{area.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{area.prospects.length} oportunidades</Badge>
            </CardContent>
          </DashboardCard>
        ))}
      </section>
    </div>
  )
}

function RoadmapView() {
  return (
    <div className="grid gap-8">
      <PageHeader
        label="Roadmap"
        title="Calendario operativo."
        description="Día, semana, mes y año separados para planificar el trabajo sin convertir el roadmap en una barra de progreso."
        icon={CalendarDays}
      />

      <Tabs defaultValue="dia" className="gap-5">
        <TabsList className="w-full justify-start overflow-x-auto bg-slate-100 dark:bg-white/[0.06] sm:w-fit">
          <TabsTrigger value="dia">Día</TabsTrigger>
          <TabsTrigger value="semana">Semana</TabsTrigger>
          <TabsTrigger value="mes">Mes</TabsTrigger>
          <TabsTrigger value="ano">Año</TabsTrigger>
        </TabsList>

        <TabsContent value="dia">
          <DashboardCard>
            <CardHeader>
              <CardTitle className="text-slate-950 dark:text-white">Día</CardTitle>
              <CardDescription>Tareas de hoy ordenadas por prioridad.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {dailyPlan
                .slice()
                .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])
                .map((task, index) => (
                  <PlanningTaskRow key={task.id} task={task} index={index + 1} />
                ))}
            </CardContent>
          </DashboardCard>
        </TabsContent>

        <TabsContent value="semana">
          <div className="grid gap-4 lg:grid-cols-5">
            {weeklyPlan.map((day) => (
              <DashboardCard key={day.day}>
                <CardHeader>
                  <CardTitle className="text-slate-950 dark:text-white">{day.day}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {day.tasks.map((task, index) => (
                    <PlanningTaskRow key={task.id} task={task} index={index + 1} compact />
                  ))}
                </CardContent>
              </DashboardCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mes">
          <div className="grid gap-4 lg:grid-cols-2">
            {monthlyPlan.map((week) => (
              <DashboardCard key={week.week}>
                <CardHeader>
                  <CardTitle className="text-slate-950 dark:text-white">{week.week}</CardTitle>
                  <CardDescription>{week.focus}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {week.tasks.map((task, index) => (
                    <PlanningTaskRow key={task.id} task={task} index={index + 1} />
                  ))}
                </CardContent>
              </DashboardCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ano">
          <div className="grid gap-4 lg:grid-cols-4">
            {annualRoadmap.map((quarter) => (
              <DashboardCard key={quarter.quarter}>
                <CardHeader>
                  <CardTitle className="text-slate-950 dark:text-white">{quarter.quarter}</CardTitle>
                  <CardDescription>{quarter.focus}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {quarter.milestones.map((milestone) => (
                      <div key={milestone} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-white/10 dark:bg-black/20">
                        {milestone}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </DashboardCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PlanningTaskRow({
  task,
  index,
  compact,
}: {
  task: PlanningTask
  index: number
  compact?: boolean
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-black/20">
      <div className="flex items-start gap-3">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-semibold text-slate-500 ring-1 ring-slate-200 dark:bg-white/[0.05] dark:text-slate-400 dark:ring-white/10">
          {index}
        </div>
        <div className="min-w-0 flex-1">
          <div className={compact ? "text-sm font-medium" : "font-medium"}>
            {task.title}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outline">{task.owner}</Badge>
            <Badge variant="outline" className={priorityClass[task.priority]}>
              {task.priority}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConfigView() {
  return (
    <div className="grid gap-8">
      <PageHeader
        label="Configuración"
        title="Base técnica de WorkIn."
        description="Ajustes operativos del dashboard. La persistencia queda preparada para Supabase sin agregar contraseñas al cliente."
        icon={Settings}
      />

      <DashboardCard>
        <CardHeader>
          <CardTitle className="text-slate-950 dark:text-white">Estado</CardTitle>
          <CardDescription>Configuración actual del tablero.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="outline">Tema claro / oscuro</Badge>
          <Badge variant="outline">Sesión local restringida</Badge>
          <Badge variant="outline">Listo para Supabase</Badge>
          <Badge variant="outline">Instalable en Safari móvil</Badge>
        </CardContent>
      </DashboardCard>
    </div>
  )
}

export function WorkInDashboard() {
  const view = useDashboardView()
  const [workTasks, setWorkTasks] = useState<WorkTask[]>(tasks)

  function addTask(partner: Partner, title: string) {
    setWorkTasks((currentTasks) => [
      {
        id: `task-local-${partnerIds[partner]}-${Date.now()}`,
        title: title.trim(),
        detail: "Tarea creada localmente. Se persistirá cuando Supabase esté conectado.",
        owner: partner,
        status: "pending",
        area: partner === "Martín" ? "Producto" : "Research",
        priority: "Media",
        dueLabel: "Nueva",
      },
      ...currentTasks,
    ])
  }

  function completeTask(taskId: string) {
    setWorkTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: "done", dueLabel: "Hecha" } : task
      )
    )
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {view === "inicio" ? <HomeView workTasks={workTasks} /> : null}
      {view === "martin" ? (
        <PartnerTaskBoard
          partner="Martín"
          workTasks={workTasks}
          onAddTask={addTask}
          onCompleteTask={completeTask}
        />
      ) : null}
      {view === "mateo" ? (
        <PartnerTaskBoard
          partner="Mateo"
          workTasks={workTasks}
          onAddTask={addTask}
          onCompleteTask={completeTask}
        />
      ) : null}
      {view === "ideas" ? <IdeasTasksView workTasks={workTasks} /> : null}
      {view === "research" ? <ResearchView /> : null}
      {view === "roadmap" ? <RoadmapView /> : null}
      {view === "configuracion" ? <ConfigView /> : null}
    </main>
  )
}
