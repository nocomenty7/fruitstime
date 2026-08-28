import { createClient } from "@/lib/supabase/server"
import { BannerCarousel } from "@/components/sections/BannerCarousel"
import { TopicListWrapper } from "@/components/game/TopicListWrapper"

export const revalidate = 0 // 메인 페이지는 최신 주제를 항상 불러오도록 캐시 비활성화

export default async function Home() {
  const supabase = await createClient()

  // game_topics 테이블에서 주제 목록 가져오기
  const { data: topics, error } = await supabase
    .from('game_topics')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col gap-10 pb-16 pt-2">
      {/* 상단 배너 */}
      <BannerCarousel />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span>🔥</span> 이거 알면 최소 ㅇㅇ년대생
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            원하는 주제를 선택하고 당신의 세대를 증명해보세요!
          </p>
        </div>

        {/* 클라이언트 컴포넌트로 데이터 넘기기 (모달 컨트롤용) */}
        {topics && topics.length > 0 ? (
          <TopicListWrapper topics={topics} />
        ) : (
          <div className="p-10 border border-dashed rounded-2xl flex items-center justify-center text-muted-foreground">
            아직 생성된 주제가 없습니다.
          </div>
        )}
      </section>
    </div>
  )
}
