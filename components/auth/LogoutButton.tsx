"use client"
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
    >
      <LogOut className="h-4 w-4" />
      로그아웃
    </button>
  )
}
