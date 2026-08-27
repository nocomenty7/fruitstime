import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-4 py-16">
      <div className="relative w-full max-w-[480px] space-y-6 rounded-2xl border border-border bg-card px-8 pb-10 pt-10 shadow-lg mt-8 text-center">
        <div className="flex justify-center mb-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold tracking-tight text-card-foreground">로그인 에러 발생</h2>
        <p className="text-sm leading-relaxed text-muted-foreground break-keep">
          로그인 처리 중 문제가 발생했습니다. 소셜 로그인 시 제공되는 필수 정보(이메일 등) 제공에 동의하지 않았거나 일시적인 네트워크 오류일 수 있습니다.
        </p>
        
        <div className="pt-4">
          <Link href="/login" className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
