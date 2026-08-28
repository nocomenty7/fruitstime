import { createClient } from "@/lib/supabase/server"
import { BannerCarousel } from "@/components/sections/BannerCarousel"
import { GameRowSection, MockGameItem } from "@/components/sections/GameRowSection"
import { TopicListWrapper } from "@/components/game/TopicListWrapper"

export const dynamic = "force-dynamic"
export const revalidate = 0 // 메인 페이지는 최신 주제를 항상 불러오도록 캐시 비활성화

// 임시 모의 데이터 (가격 맞추기)
const MOCK_PRICE_GUESS: MockGameItem[] = [
  { id: "p1", title: "강남 3구 30평대 아파트, 현재 가격은?", thumbnailUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop", plays: 154000, createdAt: "2024.12.02" },
  { id: "p2", title: "당근마켓 진상 레전드, 이 물건의 가격은?", thumbnailUrl: "https://images.unsplash.com/photo-1580828369019-2220b22fce0a?q=80&w=600&auto=format&fit=crop", plays: 82000, createdAt: "2024.11.20" },
  { id: "p3", title: "이 오마카세 1인당 얼마일까?", thumbnailUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop", plays: 34000, createdAt: "2024.10.15" },
];

// 임시 모의 데이터 (한정예산 드래프트)
const MOCK_DRAFT: MockGameItem[] = [
  { id: "d1", title: "100만원으로 걸그룹 라인업 짜기", thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3a2f308a074?q=80&w=600&auto=format&fit=crop", plays: 245000, createdAt: "2024.12.10" },
  { id: "d2", title: "50만원으로 방구석 여행 떠나기", thumbnailUrl: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=600&auto=format&fit=crop", plays: 82000, createdAt: "2024.11.20" },
  { id: "d3", title: "3만원으로 편의점 만수르 되기", thumbnailUrl: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?q=80&w=600&auto=format&fit=crop", plays: 154000, createdAt: "2024.10.05" },
];

// 임시 모의 데이터 (기로)
const MOCK_KIRO: MockGameItem[] = [
  { id: "k1", title: "평생 치킨 안먹기 vs 평생 피자 안먹기", thumbnailUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop", plays: 450000, createdAt: "2024.12.05" },
  { id: "k2", title: "100억 받고 스마트폰 없이 살기 vs 그냥 살기", thumbnailUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop", plays: 890000, createdAt: "2024.11.22" },
  { id: "k3", title: "다시 태어나면 재벌집 막내딸 vs 천재 뮤지션", thumbnailUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop", plays: 230000, createdAt: "2024.10.15" },
];

export default async function Home() {
  const supabase = await createClient()

  // game_topics 테이블에서 주제 목록 가져오기
  const { data: topics, error } = await supabase
    .from('game_topics')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col gap-10 pb-16 pt-2">
      <BannerCarousel />

      <section className="flex flex-col gap-6 w-full">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="flex items-end gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl leading-none">🍓</span>
              <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                이거 알면 최소 ㅇㅇ년대생
              </h2>
            </div>
            <p className="hidden sm:inline-block text-sm font-medium text-muted-foreground pb-0.5">
              원하는 주제를 선택하고 당신의 세대를 증명해보세요!
            </p>
          </div>
        </div>
        
        {/* 모바일에서만 보이는 설명 텍스트 */}
        <p className="sm:hidden text-sm font-medium text-muted-foreground mb-4 pl-1 -mt-4">
          원하는 주제를 선택하고 당신의 세대를 증명해보세요!
        </p>

        {error ? (
          <div className="p-10 border border-destructive rounded-2xl flex flex-col items-center justify-center text-destructive bg-destructive/10">
            <span className="font-bold">데이터를 불러오는 중 오류가 발생했습니다.</span>
            <span className="text-sm mt-2">{error.message}</span>
          </div>
        ) : topics && topics.length > 0 ? (
          <TopicListWrapper topics={topics} />
        ) : (
          <div className="p-10 border border-dashed rounded-2xl flex items-center justify-center text-muted-foreground">
            아직 생성된 주제가 없습니다.
          </div>
        )}
      </section>

      <div className="h-px bg-border w-full my-2"></div>

      <GameRowSection 
        emoji="🍊"
        title="가격 스캐너" 
        description="이 물건의 진짜 가격은 얼마일까? 감각을 시험해보세요"
        href="/price-guess" 
        items={MOCK_PRICE_GUESS} 
      />

      <div className="h-px bg-border"></div>

      <GameRowSection 
        emoji="🍉"
        title="입맛대로 스쿼드" 
        description="정해진 예산 안에서 최고의 라인업을 완성하세요"
        href="/draft" 
        items={MOCK_DRAFT} 
      />

      <div className="h-px bg-border"></div>

      <GameRowSection 
        emoji="🍇"
        title="시참 밸런스게임 '기로'" 
        description="두 가지 선택지 중 당신의 선택은? 극강의 밸런스 게임"
        href="/kiro" 
        items={MOCK_KIRO} 
      />
    </div>
  )
}
