# WorkIn - Codex Master Prompt

Paste this prompt into Codex from the root of the MYMS repository.

```txt
You are the lead product engineer and product designer for WorkIn, the internal operations dashboard for MYMS.

Build WorkIn as a private shared dashboard for two partners: Martin and Mateo.

Context:
MYMS is a digital commercial platform that creates landing pages, booking systems, CRM dashboards, digital cards, WhatsApp flows and research/outreach systems for local businesses and independent professionals.

WorkIn is the internal operating system for MYMS.
It must help Martin and Mateo organize objectives, tasks, ideas, research, outreach and execution.

Product name:
WorkIn

Brand:
- Black / deep navy background
- Electric blue accents
- White text
- Premium SaaS
- Minimal, sharp, fast
- Inspired by Linear, Revolut, Framer, Vercel

Core users:
1. Martin
2. Mateo

Roles and strengths:

Martin:
- Builder of landing pages and websites
- Marketing
- Research
- Product visuals
- Demos and prototypes

Mateo:
- Research
- Outreach
- Finance
- Commercial structure
- Pricing and margins

Important rule:
Both partners can view, comment and suggest on each other's tasks. Ownership defines responsibility, not permission.

Tech stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Auth
- Supabase Postgres
- Framer Motion
- lucide-react
- zod
- react-hook-form
- tanstack/react-table for research tables

Authentication:
- Login page
- Separate login for Martin and Mateo
- Only authenticated users can access the dashboard
- Users must have a profile record with name, role and avatar initials

Main routes:

/login
/dashboard
/dashboard/martin
/dashboard/mateo
/dashboard/ideas
/dashboard/research
/dashboard/agents
/dashboard/settings

Main layout:
- Sidebar navigation
- Top bar with current user, quick add button and search
- Responsive mobile drawer
- Dark UI with glass panels

Sections:

1. Home / Dashboard
Purpose:
Show a global summary of everything that needs work.

Include:
- Due tasks count by partner
- Done tasks count by partner
- Ideas waiting for analysis
- Research prospects by industry
- High priority prospects
- Weekly focus cards
- Recent activity feed
- Quick add idea/task/prospect

2. Martin section
Purpose:
Show Martin's work.

Include:
- Due list
- Done list
- Tasks grouped by area: Research, Builder, Marketing
- Ability to add task
- Ability to mark task done
- Ability to comment
- Ability to assign/reassign task

3. Mateo section
Purpose:
Show Mateo's work.

Include:
- Due list
- Done list
- Tasks grouped by area: Research, Outreach, Finance
- Ability to add task
- Ability to mark task done
- Ability to comment
- Ability to assign/reassign task

4. Ideas / Tasks section
Purpose:
Capture ideas and tasks that may become structured work.

Idea fields:
- title
- description
- created_by
- status
- priority
- category
- analysis_result
- created_tasks
- assigned_to

Idea statuses:
- new
- analyzing
- analyzed
- tasks_created
- distributed
- archived

Agent pipeline:
A. Idea Analyzer Agent
Input: raw idea
Output:
- summary
- viability
- business value
- implementation path
- risks
- recommendation
- suggested tasks

B. Task Creator Agent
Input: analyzer result
Output:
- structured tasks
- acceptance criteria
- priority
- estimated effort
- required owner profile

C. Task Distributor Agent
Input: structured tasks + Martin/Mateo profiles
Output:
- assigned tasks for Martin
- assigned tasks for Mateo
- shared tasks when needed
- reasoning for assignment

Initial implementation:
- Create the full UI and data model.
- Create API routes for the agents.
- If OPENAI_API_KEY is missing, use a deterministic fallback that simulates the agents using rules.
- Add a button: "Run agents" on each idea.
- Allow manual override of generated assignments.

Distribution rules:
- Building, landing pages, UI, demos, marketing assets -> Martin
- Outreach, prospecting, finance, pricing, margins -> Mateo
- Research can go to either; prospect research defaults to Mateo, product/competitor visual research defaults to Martin
- Strategy and big decisions -> both

5. Research section
Purpose:
Organize potential clients for MYMS.

Research must be grouped by industry:
- Barberias
- Belleza
- Profesionales independientes
- Veterinarias
- Gastronomia
- Locales fisicos
- Servicios del hogar
- Ventas / proveedores
- Fitness / wellness
- Salud

Prospect fields:
- business_name
- industry
- location
- instagram_url
- google_maps_url
- website_url
- has_verified_google_profile
- google_reviews_count
- instagram_followers
- digital_presence_notes
- pain_detected
- suggested_pack: Presencia Pro, Turnos Pro, Ventas Pro, Local Pro, Combination
- fit_score: 1-10
- priority: low, medium, high
- outreach_status: not_contacted, contacted, replied, meeting, proposal_sent, won, lost
- outreach_channel: Instagram, WhatsApp, Google Maps, Email, Referral
- assigned_to
- next_step
- notes

Research UI:
- Table view
- Kanban by outreach status
- Filters by industry, pack, priority, assigned person, outreach status
- Prospect detail drawer
- Add prospect form
- Import/export CSV later

6. Agents section
Purpose:
Show what the agents did.

Include:
- Agent run history
- Input idea
- Output analysis
- Generated tasks
- Assignment decisions
- Errors
- Manual retry button

Data model:
Create Supabase schema for:
- profiles
- tasks
- task_comments
- ideas
- idea_comments
- prospects
- outreach_templates
- agent_runs
- activity_log

Seed data:
Create starter profiles:
- Martin
- Mateo

Starter tasks:
Martin:
- Create WorkIn MVP dashboard
- Build MYMS landing demo for beauty salons
- Prepare first three Instagram posts
- Research premium SaaS landing references

Mateo:
- Research 30 potential beauty/barber prospects
- Create first outreach templates
- Define initial pricing assumptions
- Build finance sheet for MYMS packs

Starter ideas:
- Create a salon-specific demo landing
- Create a barberia outreach campaign
- Add AI idea-to-task distribution
- Create Instagram launch video

Design requirements:
- Dark dashboard
- Electric blue highlights
- Smooth microinteractions
- Cards with subtle glass effect
- Clean tables
- Fast keyboard-friendly forms
- Mobile responsive
- No generic admin template feel

Components to create:
- AppSidebar
- Topbar
- StatCard
- TaskCard
- DueDoneBoard
- IdeaCard
- AgentPipeline
- ResearchTable
- ProspectDrawer
- QuickAddDialog
- ActivityFeed
- UserBadge
- EmptyState
- PriorityBadge
- StatusBadge

Implementation requirements:
- Clean TypeScript
- Server/client separation
- Zod schemas
- Form validation
- Accessibility
- Responsive layout
- Reusable components
- No fake lorem ipsum
- Use real WorkIn/MYMS content
- Build must pass

After implementation:
- Run npm run lint
- Run npm run build
- Fix all errors
- Update README.md with setup instructions
- Create AGENTS.md explaining WorkIn context for future AI agents
```
```
