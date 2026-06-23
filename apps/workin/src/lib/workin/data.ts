import type {
  AnnualQuarter,
  Idea,
  Partner,
  PlanningTask,
  RecentActivity,
  ResearchArea,
  RoadmapGroup,
  WeeklyPlanDay,
  MonthlyPlanWeek,
  WeeklyPriority,
  WorkTask,
} from "./types"

export const focusMap: Record<Partner, string[]> = {
  Martín: ["Landing", "marketing", "research"],
  Mateo: ["Research", "outreach", "finanzas"],
}

export const weeklyPriority: WeeklyPriority = {
  title: "Foco de la semana",
  progress: 48,
  items: [
    "Finalizar landing MYMS",
    "Publicar 3 primeros posteos",
    "Construir Research Engine",
    "Contactar primeros prospectos",
  ],
}

export const tasks: WorkTask[] = [
  {
    id: "task-martin-001",
    title: "Finalizar landing MYMS",
    detail: "Cerrar estructura, copy principal y llamadas a acción para presentar MYMS como sistema comercial.",
    owner: "Martín",
    status: "pending",
    area: "Landing",
    priority: "Alta",
    dueLabel: "Hoy",
  },
  {
    id: "task-martin-002",
    title: "Preparar primeros posteos de Instagram",
    detail: "Convertir los mensajes base de MYMS en piezas simples sobre confianza, landing y WhatsApp.",
    owner: "Martín",
    status: "pending",
    area: "Marketing",
    priority: "Alta",
    dueLabel: "Esta semana",
  },
  {
    id: "task-martin-003",
    title: "Definir estructura visual de Presencia Pro",
    detail: "Dejar lista la sección que explica confianza, servicios, testimonios y contacto.",
    owner: "Martín",
    status: "done",
    area: "Producto",
    priority: "Media",
    dueLabel: "Hecha",
  },
  {
    id: "task-mateo-001",
    title: "Construir Research Engine",
    detail: "Definir campos mínimos para detectar negocios con baja estructura digital y alto fit comercial.",
    owner: "Mateo",
    status: "pending",
    area: "Research",
    priority: "Alta",
    dueLabel: "Hoy",
  },
  {
    id: "task-mateo-002",
    title: "Contactar primeros prospectos",
    detail: "Preparar lista inicial real antes de cargar oportunidades en WorkIn.",
    owner: "Mateo",
    status: "pending",
    area: "Outreach",
    priority: "Alta",
    dueLabel: "Esta semana",
  },
  {
    id: "task-mateo-003",
    title: "Ordenar supuestos financieros iniciales",
    detail: "Separar costos, precio base y margen esperado para los primeros packs.",
    owner: "Mateo",
    status: "done",
    area: "Finanzas",
    priority: "Media",
    dueLabel: "Hecha",
  },
]

export const blockedTasks: WorkTask[] = []

export const ideas: Idea[] = [
  {
    id: "idea-001",
    title: "CRM para vendedores",
    description: "Pipeline simple para asignar consultas, registrar estado y medir conversión por vendedor.",
    status: "Nueva",
  },
  {
    id: "idea-002",
    title: "Template landing veterinarias",
    description: "Variante de Presencia Pro para negocios que necesitan confianza local, servicios y turnos.",
    status: "Analizar",
  },
  {
    id: "idea-003",
    title: "Outreach por industria",
    description: "Secuencias por vertical con dolor, oferta y prueba específica para cada segmento.",
    status: "Lista",
  },
  {
    id: "idea-004",
    title: "Dashboard financiero",
    description: "Vista interna para precio, costos, cobros pendientes y rentabilidad por pack.",
    status: "Analizar",
  },
]

export const researchAreas: ResearchArea[] = [
  {
    id: "research-local",
    title: "Negocios locales",
    description: "Búsqueda de negocios con demanda visible, baja estructura digital y fricción de contacto.",
    prospects: [],
  },
  {
    id: "research-profesionales",
    title: "Profesionales independientes",
    description: "Perfiles que dependen de reputación, agenda y respuestas manuales para convertir consultas.",
    prospects: [],
  },
]

export const recentActivity: RecentActivity[] = []

export const roadmap: RoadmapGroup[] = [
  {
    title: "MYMS",
    items: [
      { title: "Branding", progress: 70, status: "En curso" },
      { title: "Landing", progress: 55, status: "En curso" },
      { title: "Contenido", progress: 25, status: "Siguiente" },
    ],
  },
  {
    title: "WorkIn",
    items: [
      { title: "Dashboard", progress: 65, status: "En curso" },
      { title: "Research", progress: 35, status: "En curso" },
      { title: "Roadmap", progress: 30, status: "Siguiente" },
    ],
  },
]

export const dailyPlan: PlanningTask[] = [
  {
    id: "day-001",
    title: "Cerrar hero y CTA principal de la landing MYMS",
    owner: "Martín",
    priority: "Alta",
  },
  {
    id: "day-002",
    title: "Definir campos mínimos del Research Engine",
    owner: "Mateo",
    priority: "Alta",
  },
  {
    id: "day-003",
    title: "Revisar lista inicial antes de cargar oportunidades reales",
    owner: "Mateo",
    priority: "Media",
  },
]

export const weeklyPlan: WeeklyPlanDay[] = [
  {
    day: "Lunes",
    tasks: [
      { id: "week-mon-001", title: "Finalizar landing MYMS", owner: "Martín", priority: "Alta" },
      { id: "week-mon-002", title: "Ordenar criterio de fit para research", owner: "Mateo", priority: "Alta" },
    ],
  },
  {
    day: "Martes",
    tasks: [
      { id: "week-tue-001", title: "Publicar primer posteo", owner: "Martín", priority: "Alta" },
      { id: "week-tue-002", title: "Preparar primeras conversaciones comerciales", owner: "Mateo", priority: "Media" },
    ],
  },
  {
    day: "Miércoles",
    tasks: [
      { id: "week-wed-001", title: "Construir vista inicial de Research", owner: "Mateo", priority: "Alta" },
    ],
  },
  {
    day: "Jueves",
    tasks: [
      { id: "week-thu-001", title: "Publicar segundo posteo", owner: "Martín", priority: "Media" },
      { id: "week-thu-002", title: "Validar primer mensaje de outreach", owner: "Mateo", priority: "Media" },
    ],
  },
  {
    day: "Viernes",
    tasks: [
      { id: "week-fri-001", title: "Publicar tercer posteo", owner: "Martín", priority: "Media" },
      { id: "week-fri-002", title: "Revisar avances y próxima semana", owner: "Mateo", priority: "Media" },
    ],
  },
]

export const monthlyPlan: MonthlyPlanWeek[] = [
  {
    week: "Semana 1",
    focus: "Base comercial",
    tasks: [
      { id: "month-w1-001", title: "Landing MYMS lista para mostrar", owner: "Martín", priority: "Alta" },
      { id: "month-w1-002", title: "Criterios de research definidos", owner: "Mateo", priority: "Alta" },
    ],
  },
  {
    week: "Semana 2",
    focus: "Contenido y research",
    tasks: [
      { id: "month-w2-001", title: "Calendario de contenidos inicial", owner: "Martín", priority: "Media" },
      { id: "month-w2-002", title: "Primeros negocios reales cargados", owner: "Mateo", priority: "Alta" },
    ],
  },
  {
    week: "Semana 3",
    focus: "Outreach",
    tasks: [
      { id: "month-w3-001", title: "Contactar primeros prospectos", owner: "Mateo", priority: "Alta" },
    ],
  },
  {
    week: "Semana 4",
    focus: "Aprendizaje y ajuste",
    tasks: [
      { id: "month-w4-001", title: "Medir respuestas y ajustar oferta", owner: "Mateo", priority: "Media" },
      { id: "month-w4-002", title: "Pulir secciones de packs", owner: "Martín", priority: "Media" },
    ],
  },
]

export const annualRoadmap: AnnualQuarter[] = [
  {
    quarter: "Q1",
    focus: "Fundación MYMS",
    milestones: ["Branding", "Landing", "Primer sistema de research"],
  },
  {
    quarter: "Q2",
    focus: "Primeras ventas",
    milestones: ["Outreach por industria", "Primeros clientes", "Ajuste de packs"],
  },
  {
    quarter: "Q3",
    focus: "Operación repetible",
    milestones: ["Plantillas por vertical", "Proceso de entrega", "Métricas comerciales"],
  },
  {
    quarter: "Q4",
    focus: "Escala controlada",
    milestones: ["Mejoras de WorkIn", "Reportes", "Sistema financiero"],
  },
]
