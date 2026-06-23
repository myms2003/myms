"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  ClipboardList,
  ExternalLink,
  Home,
  Lightbulb,
  LogOut,
  Map,
  Search,
  Settings,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/workin/theme-toggle"
import { clearLocalSession } from "./auth-gate"

const nav = [
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/dashboard#martin", label: "Martín", icon: UserRound },
  { href: "/dashboard#mateo", label: "Mateo", icon: UserRound },
  { href: "/dashboard#ideas", label: "Ideas / Tareas", icon: Lightbulb },
  { href: "/dashboard#research", label: "Research", icon: Search },
  { href: "/dashboard#roadmap", label: "Roadmap", icon: Map },
  { href: "/dashboard#configuracion", label: "Configuración", icon: Settings },
]

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [hash, setHash] = useState("")

  useEffect(() => {
    function syncHash() {
      setHash(window.location.hash.replace("#", ""))
    }

    syncHash()
    window.addEventListener("hashchange", syncHash)

    return () => window.removeEventListener("hashchange", syncHash)
  }, [])

  function logout() {
    clearLocalSession()
    router.replace("/login")
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#050A12] dark:text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_42%,#eef2f7_100%)] dark:bg-[radial-gradient(circle_at_20%_0%,rgba(45,127,249,0.22),transparent_34%),radial-gradient(circle_at_82%_8%,rgba(122,184,255,0.13),transparent_28%),linear-gradient(180deg,#050A12_0%,#09111D_50%,#020409_100%)]" />

      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white/80 px-4 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-black/35 lg:block">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#2D7FF9] text-white shadow-[0_0_28px_rgba(45,127,249,0.35)]">
            <ClipboardList className="size-5" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-slate-950 dark:text-white">
              WorkIn
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-500">Operación MYMS</div>
          </div>
        </Link>

        <nav className="mt-9 grid gap-1">
          {nav.map((item) => {
            const Icon = item.icon
            const itemHash = item.href.includes("#") ? item.href.split("#")[1] : ""
            const active = pathname === "/dashboard" && hash === itemHash

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                  active
                    ? "bg-slate-950 text-white dark:bg-white/10"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-slate-100",
                ].join(" ")}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute inset-x-4 bottom-5 grid gap-3">
          <a
            href="https://www.instagram.com/MYMS.digital"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 transition hover:border-[#2D7FF9]/45 hover:text-[#2D7FF9] dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-200 dark:hover:border-blue-400/40 dark:hover:text-blue-200"
          >
            Ver Instagram de MYMS
            <ExternalLink className="size-4" />
          </a>

          <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/[0.035]">
            <div className="text-xs uppercase tracking-[0.22em] text-[#2D7FF9]">Privado</div>
            <p className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
              Dashboard interno para Martín y Mateo.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <ThemeToggle />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex-1 justify-start text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <LogOut className="size-4" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[#050A12]/80 lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <Link href="/dashboard" className="font-semibold text-slate-950 dark:text-white">
              WorkIn
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button type="button" variant="ghost" size="sm" onClick={logout} aria-label="Salir">
                <LogOut className="size-4" />
              </Button>
            </div>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://www.instagram.com/MYMS.digital"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
            >
              Instagram
            </a>
          </nav>
        </header>
        {children}
      </div>
    </div>
  )
}
