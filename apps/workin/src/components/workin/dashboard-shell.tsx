"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bot,
  ClipboardList,
  Home,
  Lightbulb,
  LogOut,
  Search,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { clearLocalSession } from "./auth-gate"

const nav = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard#martin", label: "Martin", icon: UserRound },
  { href: "/dashboard#mateo", label: "Mateo", icon: UserRound },
  { href: "/dashboard#ideas", label: "Ideas / Tasks", icon: Lightbulb },
  { href: "/dashboard#research", label: "Research", icon: Search },
  { href: "/dashboard#agents", label: "Agents", icon: Bot },
]

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  function logout() {
    clearLocalSession()
    router.replace("/login")
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.16),transparent_28%),linear-gradient(180deg,#020617_0%,#050816_42%,#030712_100%)]" />
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 bg-black/35 px-4 py-5 backdrop-blur-xl lg:block">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500 text-white shadow-[0_0_28px_rgba(59,130,246,0.45)]">
            <ClipboardList className="size-5" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-white">WorkIn</div>
            <div className="text-xs text-slate-500">MYMS operations</div>
          </div>
        </Link>

        <nav className="mt-9 grid gap-1">
          {nav.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-100",
                ].join(" ")}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute inset-x-4 bottom-5 rounded-lg border border-white/10 bg-white/[0.035] p-3">
          <div className="text-xs uppercase tracking-[0.22em] text-blue-300">Private</div>
          <p className="mt-2 text-sm leading-5 text-slate-400">
            Shared dashboard for Martin and Mateo. Local deterministic agents only.
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={logout}
            className="mt-3 w-full justify-start text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#020617]/80 px-4 py-3 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="font-semibold text-white">
              WorkIn
            </Link>
            <Button type="button" variant="ghost" size="sm" onClick={logout}>
              <LogOut className="size-4" />
            </Button>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        {children}
      </div>
    </div>
  )
}
