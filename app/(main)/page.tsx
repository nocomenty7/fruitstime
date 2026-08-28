import { createClient } from "@/lib/supabase/server"
import { BannerCarousel } from "@/components/sections/BannerCarousel"
import { GameRowSection, MockGameItem } from "@/components/sections/GameRowSection"
import { TopicListWrapper } from "@/components/game/TopicListWrapper"

export const dynamic = "force-dynamic"
export const revalidate = 0 // 메인 페이지는 최신 주제를 항상 불러오도록 캐시 비활성화

// 임시 모의 데이터 (가격 맞추기)
const MOCK_PRICE_GUESS = [
  { id: "p1", title: "강남 3구 30평대 아파트, 현재 가격은?", thumbnailUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop", plays: 154000, createdAt: "2024.12.02" },
  { id: "p2", title: "당근마켓 진상 레전드, 이 물건의 가격은?", thumbnailUrl: "https://images.unsplash.com/photo-1580828369019-2220b22fce0a?q=80&w=600&auto=format&fit=crop", plays: 82000, createdAt: "2024.11.20" },
  { id: "p3", title: "이 오마카세 1인당 얼마일까?", thumbnailUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop", plays: 34000, createdAt: "2024.10.15" },
  { id: "p4", title: "명품 백 vs 시장 백 가격 맞추기", thumbnailUrl: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop", plays: 120000, createdAt: "2024.09.05" },
  { id: "p5", title: "편의점 초콜릿, 가장 비싼 것은?", thumbnailUrl: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?q=80&w=600&auto=format&fit=crop", plays: 23000, createdAt: "2024.08.22" },
  { id: "p6", title: "슈퍼카 유지비 1년 비용 맞추기", thumbnailUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=600&auto=format&fit=crop", plays: 56000, createdAt: "2024.07.11" },
  { id: "p7", title: "이 PC방 라면 정식 세트 가격은?", thumbnailUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop", plays: 41000, createdAt: "2024.06.03" },
  { id: "p8", title: "다이소 꿀템 총합 얼마일까?", thumbnailUrl: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=600&auto=format&fit=crop", plays: 78000, createdAt: "2024.05.28" },
  { id: "p9", title: "전국구 웨이팅 맛집 2인 세트 가격", thumbnailUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop", plays: 15000, createdAt: "2024.04.14" },
  { id: "p10", title: "아이돌 굿즈 중 가장 비싼 것은?", thumbnailUrl: "https://images.unsplash.com/photo-1621360841013-c76831f1628f?q=80&w=600&auto=format&fit=crop", plays: 92000, createdAt: "2024.03.01" }
];

// 임시 모의 데이터 (한정예산 드래프트)
const MOCK_DRAFT = [
  { id: "d1", title: "100만원으로 걸그룹 라인업 짜기", thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3a2f308a074?q=80&w=600&auto=format&fit=crop", plays: 245000, createdAt: "2024.12.10" },
  { id: "d2", title: "50만원으로 방구석 여행 떠나기", thumbnailUrl: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=600&auto=format&fit=crop", plays: 82000, createdAt: "2024.11.20" },
  { id: "d3", title: "3만원으로 편의점 만수르 되기", thumbnailUrl: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?q=80&w=600&auto=format&fit=crop", plays: 154000, createdAt: "2024.10.05" },
  { id: "d4", title: "천만원으로 나만의 드림카 만들기", thumbnailUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=600&auto=format&fit=crop", plays: 98000, createdAt: "2024.09.15" },
  { id: "d5", title: "10만원으로 역대급 오마카세 메뉴 구성", thumbnailUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop", plays: 45000, createdAt: "2024.08.22" },
  { id: "d6", title: "100억으로 나만의 축구 구단 꾸리기", thumbnailUrl: "https://images.unsplash.com/photo-1518605368461-1e1e1fd51ed4?q=80&w=600&auto=format&fit=crop", plays: 310000, createdAt: "2024.07.10" },
  { id: "d7", title: "5만원으로 크리스마스 파티 준비", thumbnailUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=600&auto=format&fit=crop", plays: 76000, createdAt: "2024.06.01" },
  { id: "d8", title: "0원으로 주말 풀코스 보내기", thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop", plays: 123000, createdAt: "2024.05.15" },
  { id: "d9", title: "200만원으로 자취방 인테리어 끝장내기", thumbnailUrl: "https://images.unsplash.com/photo-1556020685-e631950d4d33?q=80&w=600&auto=format&fit=crop", plays: 54000, createdAt: "2024.04.11" },
  { id: "d10", title: "1만원으로 추억의 문방구 털기", thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop", plays: 88000, createdAt: "2024.03.01" }
];

// 임시 모의 데이터 (기로)
const MOCK_KIRO = [
  { id: "k1", title: "평생 치킨 안먹기 vs 평생 피자 안먹기", thumbnailUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop", plays: 450000, createdAt: "2024.12.05" },
  { id: "k2", title: "100억 받고 스마트폰 없이 살기 vs 그냥 살기", thumbnailUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop", plays: 890000, createdAt: "2024.11.22" },
  { id: "k3", title: "다시 태어나면 재벌집 막내딸 vs 천재 뮤지션", thumbnailUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop", plays: 230000, createdAt: "2024.10.15" },
  { id: "k4", title: "여름에 패딩 입기 vs 겨울에 반팔 입기", thumbnailUrl: "https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=600&auto=format&fit=crop", plays: 54000, createdAt: "2024.09.08" },
  { id: "k5", title: "평생 라면만 먹기 vs 평생 삼겹살만 먹기", thumbnailUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop", plays: 120000, createdAt: "2024.08.30" },
  { id: "k6", title: "혼자서 무인도에 1년 살기 vs 보기 싫은 사람과 평생 살기", thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop", plays: 78000, createdAt: "2024.07.12" },
  { id: "k7", title: "평생 양치 안하기 vs 평생 샤워 안하기", thumbnailUrl: "https://images.unsplash.com/photo-1550506161-125026e6de31?q=80&w=600&auto=format&fit=crop", plays: 240000, createdAt: "2024.06.25" },
  { id: "k8", title: "내가 사랑하는 사람 vs 나를 사랑하는 사람", thumbnailUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop", plays: 560000, createdAt: "2024.05.10" },
  { id: "k9", title: "매일 야근하고 1천만원 vs 칼퇴하고 300만원", thumbnailUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop", plays: 890000, createdAt: "2024.04.05" },
  { id: "k10", title: "과거로 돌아가기 vs 미래로 가기", thumbnailUrl: "https://images.unsplash.com/photo-1447015237013-0e80b2786dea?q=80&w=600&auto=format&fit=crop", plays: 340000, createdAt: "2024.03.11" }
];

// 임시 모의 데이터 (사용자 요청 20개 주제)
const MOCK_TOPICS_20 = [
  { id: "t1", title: "🍭 학교 앞 간식 & 분식", thumbnail_url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop", plays: 125000, created_at_display: "2024.12.01" },
  { id: "t2", title: "🏫 학교생활 & 교실 추억", thumbnail_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop", plays: 340000, created_at_display: "2024.11.28" },
  { id: "t3", title: "🪀 장난감 & 골목길 놀이", thumbnail_url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop", plays: 89000, created_at_display: "2024.11.15" },
  { id: "t4", title: "🎮 비디오 & PC 게임", thumbnail_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop", plays: 560000, created_at_display: "2024.11.10" },
  { id: "t5", title: "📺 TV 만화 & 애니메이션", thumbnail_url: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?q=80&w=600&auto=format&fit=crop", plays: 120000, created_at_display: "2024.10.05" },
  { id: "t6", title: "🎪 레전드 TV 예능 & 코미디", thumbnail_url: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=600&auto=format&fit=crop", plays: 67000, created_at_display: "2024.09.20" },
  { id: "t7", title: "🎬 그 시절 드라마 & 영화", thumbnail_url: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=600&auto=format&fit=crop", plays: 45000, created_at_display: "2024.08.12" },
  { id: "t8", title: "🎤 레전드 가요 & 아이돌 무대", thumbnail_url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600&auto=format&fit=crop", plays: 230000, created_at_display: "2024.07.30" },
  { id: "t9", title: "🎀 유행 캐릭터 & 팬시", thumbnail_url: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=600&auto=format&fit=crop", plays: 12000, created_at_display: "2024.06.18" },
  { id: "t10", title: "📱 전자기기 & 하드웨어", thumbnail_url: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=600&auto=format&fit=crop", plays: 98000, created_at_display: "2024.05.02" },
  { id: "t11", title: "🌐 인터넷 플랫폼 & 소통 문화", thumbnail_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop", plays: 34000, created_at_display: "2024.04.14" },
  { id: "t12", title: "👕 유행 패션 & 스타일", thumbnail_url: "https://images.unsplash.com/photo-1489987707023-afc6328ce788?q=80&w=600&auto=format&fit=crop", plays: 56000, created_at_display: "2024.03.22" },
  { id: "t13", title: "😎 인터넷 밈 & 유행어", thumbnail_url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600&auto=format&fit=crop", plays: 89000, created_at_display: "2024.02.11" },
  { id: "t14", title: "🍧 추억의 외식 & 아지트", thumbnail_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop", plays: 45000, created_at_display: "2024.01.05" },
  { id: "t15", title: "👻 그 시절 미신 & 학교 괴담", thumbnail_url: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop", plays: 12000, created_at_display: "2023.12.20" },
  { id: "t16", title: "🖍️ 다꾸 & 레전드 문구류", thumbnail_url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop", plays: 34000, created_at_display: "2023.11.15" },
  { id: "t17", title: "⚽ 레전드 스포츠 (오프라인)", thumbnail_url: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=600&auto=format&fit=crop", plays: 78000, created_at_display: "2023.10.10" },
  { id: "t18", title: "🖱️ 추억의 e스포츠", thumbnail_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop", plays: 156000, created_at_display: "2023.09.05" },
  { id: "t19", title: "📢 뇌리에 박힌 TV 광고 & CM송", thumbnail_url: "https://images.unsplash.com/photo-1601055903647-8f1ac8e379d8?q=80&w=600&auto=format&fit=crop", plays: 92000, created_at_display: "2023.08.20" },
  { id: "t20", title: "🚨 그 시절 사건사고 & 대란", thumbnail_url: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=600&auto=format&fit=crop", plays: 41000, created_at_display: "2023.07.12" }
];

// ... (기존 모의 데이터들은 변경 없음) ...

export default async function Home() {
  const supabase = await createClient()

  // game_topics 테이블에서 주제 목록 가져오기 (DB 데이터 무시하고 더미 데이터 20개 강제 주입)
  // (대표님 확인용도 뷰를 위해 DB 토픽 1개를 무시하고 임시로 20개의 더미배열을 모두 표출)
  const error: any = null;
  const mixedTopics = MOCK_TOPICS_20;

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
