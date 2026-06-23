"use client"

import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { localUsers } from "@/lib/workin/auth"
import { setLocalSession } from "./auth-gate"

export function LoginForm({ supabaseConfigured }: { supabaseConfigured: boolean }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState(localUsers[0].email)
  const next = searchParams.get("next") ?? "/dashboard"

  const currentUser = useMemo(
    () => localUsers.find((user) => user.email === email) ?? localUsers[0],
    [email]
  )

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLocalSession(currentUser.email)
    router.replace(next)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-200">
          Partner access
        </label>
        <Input
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 border-white/10 bg-white/[0.04] text-slate-100 placeholder:text-slate-500"
          list="workin-users"
        />
        <datalist id="workin-users">
          {localUsers.map((user) => (
            <option key={user.email} value={user.email}>
              {user.name}
            </option>
          ))}
        </datalist>
      </div>

      <div className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300">
        <div className="flex items-center gap-2 text-slate-100">
          <ShieldCheck className="size-4 text-blue-400" />
          {supabaseConfigured ? "Supabase environment detected" : "Local mock session"}
        </div>
        <p className="leading-6 text-slate-400">
          WorkIn is private to Martin and Mateo. The local fallback keeps the interface usable until Supabase Auth is connected.
        </p>
      </div>

      <Button className="h-11 bg-blue-500 text-white hover:bg-blue-400">
        <LockKeyhole className="size-4" />
        Enter as {currentUser.name}
        <ArrowRight className="size-4" />
      </Button>
    </form>
  )
}
