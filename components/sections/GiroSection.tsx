import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ContentCard } from "@/components/cards/ContentCard";

// 기로 임시 데이터
const GIRO_ITEMS = [
  { id: "g1", title: "당신의 연애 세포 생존율은?", thumbnailUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop" },
  { id: "g2", title: "최악의 직장동료 월드컵", thumbnailUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" },
  { id: "g3", title: "평생 하나만 먹어야 한다면?", thumbnailUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop" },
  { id: "g4", title: "나와 찰떡인 MBTI는?", thumbnailUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600&auto=format&fit=crop" },
  { id: "g5", title: "전생에 나는 어떤 왕이었을까?", thumbnailUrl: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=600&auto=format&fit=crop" },
];

export function GiroSection() {
  return (
    <section className="mb-10 w-full rounded-2xl bg-muted/30 p-6 border border-border/50">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            추천 밸런스게임: 기로 (Giro)
          </h2>
          <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
            AD
          </span>
        </div>
        <a 
          href="https://giro.link" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          기록 사이트로 이동
          <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {GIRO_ITEMS.map((item) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            thumbnailUrl={item.thumbnailUrl}
            href={`/giro/${item.id}`} // 추후 외부 링크로 수정 가능
          />
        ))}
      </div>
    </section>
  );
}
