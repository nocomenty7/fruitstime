import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 여기서 미로그인 유저의 접근을 막는 로직(예: /mypage, /create 등)을 추가할 수 있습니다.
  if (
    !user &&
    (request.nextUrl.pathname.startsWith('/mypage') ||
      request.nextUrl.pathname.startsWith('/create'))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    // 실제 서비스에서는 로그인 유도 모달용 쿼리 등을 넣을 수 있음
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
