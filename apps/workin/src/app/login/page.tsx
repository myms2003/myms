import { Suspense } from "react"
import { Activity, Bot, Database, LockKeyhole } from "lucide-react"

import { LoginForm } from "@/components/workin/login-form"
import { isSupabaseConfigured } from "@/lib/workin/auth"

export default function LoginPage() {
  const supabaseConfigured = isSupabaseConfigured()

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.24),transparent_34%),radial-gradient(circle_at_78%_14%,rgba(14,165,233,0.18),transparent_30%),linear-gradient(180deg,#020617_0%,#050816_50%,#030712_100%)]" />
      <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-[1.05fr_0.95fr] md:px-8">
        <section>
          <div className="inline-flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-200">
            <LockKeyhole className="size-4" />
            Private MYMS dashboard
          </div>
          <h1 className="mt-6 max-w-2xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
            WorkIn
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
            One shared operating room for Martin and Mateo: tasks, research, pricing, outreach, demos, and deterministic local agents.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["Idea analysis", Bot],
              ["Task routing", Activity],
              ["Supabase-ready", Database],
            ].map(([label, Icon]) => {
              const DisplayIcon = Icon as typeof Bot

              return (
                <div key={label as string} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <DisplayIcon className="size-5 text-blue-300" />
                  <div className="mt-4 text-sm font-medium text-slate-200">{label as string}</div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-black/35 p-5 shadow-[0_30px_120px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:p-7">
          <div className="mb-7">
            <div className="text-sm uppercase tracking-[0.24em] text-blue-300">Access</div>
            <h2 className="mt-2 text-2xl font-semibold text-white">Sign in to WorkIn</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Use the local partner session until Supabase Auth is configured.
            </p>
          </div>
          <Suspense fallback={<div className="text-sm text-slate-400">Loading access...</div>}>
            <LoginForm supabaseConfigured={supabaseConfigured} />
          </Suspense>
        </section>
      </div>
    </main>
  )
}
