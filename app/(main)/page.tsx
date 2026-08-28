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

// 임시 모의 데이터 (이거 알면 최소 ㅇㅇ년대생 더미 9개 채우기 용도)
const MOCK_KNOW_OR_NOT = [
  { id: "k2", title: "원영적 사고(럭키비키), 이 밈을 알고 계신가요?", thumbnail_url: "https://images.unsplash.com/photo-1544607172-132d0f507b66?q=80&w=600&auto=format&fit=crop", plays: 12540, created_at_display: "2024.12.01" },
  { id: "k3", title: "이 브랜드 로고, 진짜일까 가짜일까?", thumbnail_url: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?q=80&w=600&auto=format&fit=crop", plays: 13000, created_at_display: "2024.11.28" },
  { id: "k4", title: "90년대생만 아는 애니메이션 오프닝", thumbnail_url: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=600&auto=format&fit=crop", plays: 98000, created_at_display: "2024.11.15" },
  { id: "k5", title: "이 영화 명대사, 어떤 영화일까?", thumbnail_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop", plays: 4500, created_at_display: "2024.11.10" },
  { id: "k6", title: "한국인 99%가 틀리는 맞춤법 테스트", thumbnail_url: "https://images.unsplash.com/photo-1580828369019-2220b22fce0a?q=80&w=600&auto=format&fit=crop", plays: 210000, created_at_display: "2024.10.05" },
  { id: "k7", title: "이 노래 전주 1초 듣고 맞추기", thumbnail_url: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop", plays: 67000, created_at_display: "2024.09.20" },
  { id: "k8", title: "눈만 보고 아이돌 멤버 맞추기", thumbnail_url: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop", plays: 89000, created_at_display: "2024.08.12" },
  { id: "k9", title: "MZ세대 필수 상식 퀴즈", thumbnail_url: "https://images.unsplash.com/photo-1556020685-e631950d4d33?q=80&w=600&auto=format&fit=crop", plays: 12000, created_at_display: "2024.07.30" },
  { id: "k10", title: "역사 속 위인 명언 퀴즈", thumbnail_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop", plays: 8500, created_at_display: "2024.06.18" }
];

// ... (기존 모의 데이터들은 변경 없음) ...

export default async function Home() {
  const supabase = await createClient()

  // game_topics 테이블에서 주제 목록 가져오기
  const { data: dbTopics, error } = await supabase
    .from('game_topics')
    .select('*')
    .order('created_at', { ascending: false })

  // DB 데이터 가공 (플레이 횟수/날짜 추가) 및 더미 9개와 병합하여 10개 맞춤
  let mixedTopics: any[] = [];
  if (dbTopics && dbTopics.length > 0) {
    const parsedDbTopics = dbTopics.map(t => ({
      ...t,
      plays: 87000, // 임의값
      created_at_display: "2026.08.28" // 임의값
    }));
    mixedTopics = [...parsedDbTopics, ...MOCK_KNOW_OR_NOT].slice(0, 10);
  } else {
    mixedTopics = MOCK_KNOW_OR_NOT.slice(0, 10);
  }

  return (
    <div className="flex flex-col gap-10 pb-16 pt-2">
      <BannerCarousel />

      <div className="flex flex-col gap-6 w-full">
        {error ? (
          <div className="p-10 border border-destructive rounded-2xl flex flex-col items-center justify-center text-destructive bg-destructive/10">
            <span className="font-bold">데이터를 불러오는 중 오류가 발생했습니다.</span>
            <span className="text-sm mt-2">{error.message}</span>
          </div>
        ) : (
          <TopicListWrapper topics={mixedTopics} />
        )}
      </div>

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
