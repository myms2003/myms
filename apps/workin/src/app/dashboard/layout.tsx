import { AuthGate } from "@/components/workin/auth-gate"
import { DashboardShell } from "@/components/workin/dashboard-shell"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthGate>
      <DashboardShell>{children}</DashboardShell>
    </AuthGate>
  )
}
