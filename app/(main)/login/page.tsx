import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LoginButtons } from '@/components/auth/LoginButtons'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">환영합니다!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            소셜 계정으로 빠르게 로그인하고 모든 콘텐츠를 즐겨보세요.
          </p>
        </div>
        <LoginButtons />
      </div>
    </div>
  )
}
