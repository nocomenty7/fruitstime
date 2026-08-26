import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ContentCard } from "@/components/cards/ContentCard";

export interface MockGameItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  plays: number;
  createdAt: string;
}

interface GameRowSectionProps {
  emoji: string;
  title: string;
  description: string;
  href: string;
  items: MockGameItem[];
}

export function GameRowSection({ emoji, title, description, href, items }: GameRowSectionProps) {
  // 데스크톱에서는 2줄(10개), 모바일 등에서는 줄여서 보여줌
  const displayItems = items.slice(0, 10);

  return (
    <section className="mb-10 w-full">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div className="flex items-end gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl leading-none">{emoji}</span>
            <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h2>
          </div>
          <p className="hidden sm:inline-block text-sm font-medium text-muted-foreground pb-0.5">
            {description}
          </p>
        </div>
        <Link 
          href={`${href}/popular`} 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          더보기
          <ChevronRight className="ml-0.5 h-4 w-4" />
        </Link>
      </div>
      
      {/* 모바일에서만 보이는 설명 텍스트 */}
      <p className="sm:hidden text-sm font-medium text-muted-foreground mb-4 pl-1">
        {description}
      </p>

      {/* 2줄 나열 그리드 */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        {displayItems.map((item) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            thumbnailUrl={item.thumbnailUrl}
            href={`${href}/play/${item.id}`}
            plays={item.plays}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </section>
  );
}
