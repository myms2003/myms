export type WorkInUser = {
  name: "Martín" | "Mateo"
  email: string
  mode: "local-mock" | "supabase-ready"
}

export const localUsers: WorkInUser[] = [
  { name: "Martín", email: "martin.us10@gmail.com", mode: "local-mock" },
  { name: "Mateo", email: "mateosilveri@gmail.com", mode: "local-mock" },
]

export function findLocalUser(email: string) {
  const normalizedEmail = email.trim().toLowerCase()

  return localUsers.find((user) => user.email.toLowerCase() === normalizedEmail)
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
