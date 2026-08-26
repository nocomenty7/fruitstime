import { GameRowSection, MockGameItem } from "@/components/sections/GameRowSection";
import { BannerCarousel } from "@/components/sections/BannerCarousel";

// 임시 모의 데이터 (안다 vs 모른다 - 10개)
const MOCK_KNOW_OR_NOT: MockGameItem[] = [
  { id: "k1", title: "2024년 신조어, 당신은 얼마나 알고 있나요?", thumbnailUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=600&auto=format&fit=crop", plays: 34500, createdAt: "2024.12.01" },
  { id: "k2", title: "이 브랜드 로고, 진짜일까 가짜일까?", thumbnailUrl: "https://images.unsplash.com/photo-1508704019882-f9cf40e475b4?q=80&w=600&auto=format&fit=crop", plays: 12500, createdAt: "2024.11.28" },
  { id: "k3", title: "90년대생만 아는 애니메이션 오프닝", thumbnailUrl: "https://images.unsplash.com/photo-1535016120720-40c746a6580c?q=80&w=600&auto=format&fit=crop", plays: 98000, createdAt: "2024.11.15" },
  { id: "k4", title: "이 영화 명대사, 어떤 영화일까?", thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop", plays: 4500, createdAt: "2024.11.10" },
  { id: "k5", title: "한국인 99%가 틀리는 맞춤법 테스트", thumbnailUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop", plays: 210000, createdAt: "2024.10.05" },
  { id: "k6", title: "이 노래 전주 1초 듣고 맞추기", thumbnailUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop", plays: 67000, createdAt: "2024.09.20" },
  { id: "k7", title: "눈만 보고 아이돌 멤버 맞추기", thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3a2f308a074?q=80&w=600&auto=format&fit=crop", plays: 89000, createdAt: "2024.08.12" },
  { id: "k8", title: "MZ세대 필수 상식 퀴즈", thumbnailUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop", plays: 12000, createdAt: "2024.07.30" },
  { id: "k9", title: "역사 속 위인 명언 퀴즈", thumbnailUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop", plays: 8500, createdAt: "2024.06.18" },
  { id: "k10", title: "10년 전 오늘, 인터넷 유행어", thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop", plays: 43000, createdAt: "2024.05.05" },
];

// 임시 모의 데이터 (가격 맞추기 - 10개)
const MOCK_PRICE_GUESS: MockGameItem[] = [
  { id: "p1", title: "강남 3구 30평대 아파트, 현재 가격은?", thumbnailUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop", plays: 154000, createdAt: "2024.12.02" },
  { id: "p2", title: "당근마켓 진상 레전드, 이 물건의 가격은?", thumbnailUrl: "https://images.unsplash.com/photo-1580828369019-2220b22fce0a?q=80&w=600&auto=format&fit=crop", plays: 82000, createdAt: "2024.11.20" },
  { id: "p3", title: "이 오마카세 1인당 얼마일까?", thumbnailUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop", plays: 34000, createdAt: "2024.10.15" },
  { id: "p4", title: "명품 백 vs 시장 백 가격 맞추기", thumbnailUrl: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop", plays: 120000, createdAt: "2024.09.05" },
  { id: "p5", title: "편의점 초콜릿, 가장 비싼 것은?", thumbnailUrl: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?q=80&w=600&auto=format&fit=crop", plays: 23000, createdAt: "2024.08.22" },
  { id: "p6", title: "슈퍼카 유지비 1년 비용 맞추기", thumbnailUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=600&auto=format&fit=crop", plays: 56000, createdAt: "2024.07.11" },
  { id: "p7", title: "이 PC방 라면 정식 세트 가격은?", thumbnailUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop", plays: 41000, createdAt: "2024.06.03" },
  { id: "p8", title: "다이소 꿀템 총합 얼마일까?", thumbnailUrl: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=600&auto=format&fit=crop", plays: 78000, createdAt: "2024.05.28" },
  { id: "p9", title: "전국구 웨이팅 맛집 2인 세트 가격", thumbnailUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop", plays: 15000, createdAt: "2024.04.14" },
  { id: "p10", title: "아이돌 굿즈 중 가장 비싼 것은?", thumbnailUrl: "https://images.unsplash.com/photo-1621360841013-c76831f1628f?q=80&w=600&auto=format&fit=crop", plays: 92000, createdAt: "2024.03.01" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-6 pb-6 pt-2">
      <BannerCarousel />

      <GameRowSection 
        emoji="🍓"
        title="안다 vs 모른다" 
        description="다양한 주제에 대한 내 지식을 테스트해보는 게임"
        href="/know-or-not" 
        items={MOCK_KNOW_OR_NOT} 
      />

      <div className="h-px bg-border my-2"></div>

      <GameRowSection 
        emoji="🍊"
        title="가격 맞추기" 
        description="이 물건의 진짜 가격은 얼마일까? 감각을 시험해보세요"
        href="/price-guess" 
        items={MOCK_PRICE_GUESS} 
      />
    </div>
  );
}
