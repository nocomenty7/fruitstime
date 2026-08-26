import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { UserCircle } from 'lucide-react'

export default async function MyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col gap-8 pb-10 pt-4">
      <div className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight">마이페이지</h1>
        <p className="text-muted-foreground mt-2">내 계정 정보와 활동 내역을 관리하세요.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <UserCircle className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold line-clamp-1">{user.email || '소셜 계정 유저'}</h2>
              <p className="text-sm text-muted-foreground">ID: {user.id.substring(0, 8)}...</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm font-medium hover:bg-muted transition-colors">
              닉네임 변경 (준비 중)
            </button>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}
