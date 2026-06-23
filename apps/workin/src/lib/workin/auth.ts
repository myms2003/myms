export type WorkInUser = {
  name: "Martin" | "Mateo"
  email: string
  mode: "local-mock" | "supabase-ready"
}

export const localUsers: WorkInUser[] = [
  { name: "Martin", email: "martin@myms.local", mode: "local-mock" },
  { name: "Mateo", email: "mateo@myms.local", mode: "local-mock" },
]

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
