import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LoginButtons } from '@/components/auth/LoginButtons'
import Image from 'next/image'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[calc(100vh-13rem)] bg-background px-4 py-12">
      <div className="relative w-full max-w-[480px] space-y-8 rounded-2xl border border-border bg-card px-8 pb-10 pt-16 shadow-lg mt-16">
        
        {/* 배너 이미지 크롭 영역 (딸기와 오렌지 또는 복숭아 2명) */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-24 rounded-2xl overflow-hidden border-[6px] border-background bg-background shadow-md z-10 transition-transform hover:scale-105">
          <Image 
            src="/banner_260826.png" 
            alt="Fruits Time Characters" 
            fill 
            className="object-cover object-[40%_center]"
            priority
          />
        </div>

        <div className="text-center relative z-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-card-foreground">후르츠타임에 오신걸 환영합니다!</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground break-keep">
            소셜 계정으로 빠르게 회원가입, 로그인하고 모든 콘텐츠를 즐겨보세요.
          </p>
        </div>
        
        <div className="relative z-0">
          <LoginButtons />
        </div>
      </div>
    </div>
  )
}
