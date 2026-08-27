import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { KnowOrNotPlay } from '@/components/game/KnowOrNotPlay'
import { CommentSection } from '@/components/shared/CommentSection'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function KnowOrNotGamePage({ params }: PageProps) {
  // Promise로 전달되는 params는 Next.js 15 App Router 환경에서 await 해야 합니다.
  const { id } = await params
  
  const supabase = await createClient()

  // 1. 게임 기본 정보 가져오기
  const { data: game, error: gameError } = await supabase
    .from('games')
    .select('*')
    .eq('id', id)
    .single()

  if (gameError || !game) {
    notFound() // 데이터가 없으면 404 페이지로 이동
  }

  // 2. 게임 선택지 가져오기
  const { data: options } = await supabase
    .from('game_options')
    .select('*')
    .eq('game_id', id)
    .order('sort_order', { ascending: true })

  return (
    <div className="flex flex-col gap-8 pb-16 pt-4 max-w-3xl mx-auto w-full">
      {/* 썸네일 영역 */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted shadow-sm">
        <Image
          src={game.thumbnail_url}
          alt={game.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="inline-block px-2 py-1 mb-2 rounded-md bg-orange-500 text-xs font-bold tracking-wider">
            이거 알아?
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight drop-shadow-md">
            {game.title}
          </h1>
        </div>
      </div>

      {/* 게임 설명 */}
      {game.description && (
        <div className="text-muted-foreground text-base leading-relaxed px-2">
          {game.description}
        </div>
      )}

      {/* 게임 플레이 영역 (클라이언트 컴포넌트) */}
      <KnowOrNotPlay gameId={game.id} options={options || []} totalPlays={game.plays_count} />

      {/* 하단 구분선 */}
      <div className="h-px bg-border w-full my-4" />

      {/* 댓글 및 좋아요 영역 (뼈대) */}
      <CommentSection gameId={game.id} />
    </div>
  )
}
