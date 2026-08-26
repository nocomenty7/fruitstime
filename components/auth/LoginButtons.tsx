"use client"

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export function LoginButtons() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const supabase = createClient()

  // Supabase에 커스텀/OIDC를 통해 네이버 등 다른 프로바이더를 사용할 때,
  // Provider 타입이 'naver' 등으로 추가 확장되었거나, 커스텀 Provider일 수 있습니다.
  const handleLogin = async (provider: 'google' | 'naver' | 'github') => {
    try {
      setIsLoading(provider)
      await supabase.auth.signInWithOAuth({
        // 현재 @supabase/supabase-js 타입스크립트 버전에 따라 'naver' 지원 여부가 다를 수 있으나, 
        // 런타임에는 카카오(kakao)처럼 보통 동작합니다. (만약 타입 에러 시 as any 사용 가능)
        provider: provider as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="flex flex-col gap-3 mt-8">
      <button
        onClick={() => handleLogin('google')}
        disabled={isLoading !== null}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
          <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
          <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
          <path d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26537 14.29L1.27539 17.385C3.25539 21.31 7.3104 24 12.0004 24Z" fill="#34A853" />
        </svg>
        {isLoading === 'google' ? '연결 중...' : 'Google로 시작하기'}
      </button>
      
      <button
        onClick={() => handleLogin('naver')}
        disabled={isLoading !== null}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#03C75A] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#03C75A]/90 focus:outline-none focus:ring-2 focus:ring-[#03C75A] focus:ring-offset-2 disabled:opacity-50"
      >
        <span className="font-extrabold text-lg">N</span>
        {isLoading === 'naver' ? '연결 중...' : '네이버로 시작하기'}
      </button>
    </div>
  )
}
