import { GameRowSection, MockGameItem } from "@/components/sections/GameRowSection";
import { BannerCarousel } from "@/components/sections/BannerCarousel";

// 임시 모의 데이터
const MOCK_KNOW_OR_NOT: MockGameItem[] = [
  { id: "k1", title: "2024년 신조어, 당신은 얼마나 알고 있나요?", thumbnailUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=600&auto=format&fit=crop" },
  { id: "k2", title: "이 브랜드 로고, 진짜일까 가짜일까?", thumbnailUrl: "https://images.unsplash.com/photo-1508704019882-f9cf40e475b4?q=80&w=600&auto=format&fit=crop" },
  { id: "k3", title: "90년대생만 아는 애니메이션 오프닝", thumbnailUrl: "https://images.unsplash.com/photo-1535016120720-40c746a6580c?q=80&w=600&auto=format&fit=crop" },
  { id: "k4", title: "이 영화 명대사, 어떤 영화일까?", thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop" },
];

const MOCK_PRICE_GUESS: MockGameItem[] = [
  { id: "p1", title: "강남 3구 30평대 아파트, 현재 가격은?", thumbnailUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop" },
  { id: "p2", title: "당근마켓 진상 레전드, 이 물건의 가격은?", thumbnailUrl: "https://images.unsplash.com/photo-1580828369019-2220b22fce0a?q=80&w=600&auto=format&fit=crop" },
  { id: "p3", title: "이 오마카세 1인당 얼마일까?", thumbnailUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop" },
  { id: "p4", title: "명품 백 vs 시장 백 가격 맞추기", thumbnailUrl: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-10 pt-4">
      <BannerCarousel />

      <GameRowSection 
        title="안다 vs 모른다 - 인기순" 
        href="/know-or-not" 
        items={MOCK_KNOW_OR_NOT} 
        showAd={true}
      />
      
      <GameRowSection 
        title="안다 vs 모른다 - 최신순" 
        href="/know-or-not" 
        items={MOCK_KNOW_OR_NOT} 
        showAd={false}
      />

      <GameRowSection 
        title="가격 맞추기 - 인기순" 
        href="/price-guess" 
        items={MOCK_PRICE_GUESS} 
        showAd={true}
      />
      
      <GameRowSection 
        title="가격 맞추기 - 최신순" 
        href="/price-guess" 
        items={MOCK_PRICE_GUESS} 
        showAd={false}
      />
    </div>
  );
}
