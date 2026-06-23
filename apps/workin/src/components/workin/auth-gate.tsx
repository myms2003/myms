"use client"

import { useEffect, useSyncExternalStore } from "react"
import { usePathname, useRouter } from "next/navigation"

const SESSION_KEY = "workin.local.session"

function emitSessionChange() {
  window.dispatchEvent(new Event("workin-session-change"))
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener("workin-session-change", callback)

  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener("workin-session-change", callback)
  }
}

function getSessionSnapshot() {
  return Boolean(window.localStorage.getItem(SESSION_KEY))
}

export function setLocalSession(email: string) {
  window.localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email, createdAt: new Date().toISOString() })
  )
  emitSessionChange()
}

export function clearLocalSession() {
  window.localStorage.removeItem(SESSION_KEY)
  emitSessionChange()
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const hasSession = useSyncExternalStore(subscribe, getSessionSnapshot, () => false)

  useEffect(() => {
    if (!hasSession) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`)
    }
  }, [hasSession, pathname, router])

  if (!hasSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-sm text-slate-400">
        Verificando acceso a WorkIn...
      </div>
    )
  }

  return children
}
