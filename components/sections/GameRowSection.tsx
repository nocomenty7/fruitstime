import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ContentCard } from "@/components/cards/ContentCard";
import { AdSenseCard } from "@/components/cards/AdSenseCard";

// 임시 목업 데이터 타입
export interface MockGameItem {
  id: string;
  title: string;
  thumbnailUrl: string;
}

interface GameRowSectionProps {
  title: string;
  href: string;
  items: MockGameItem[];
  showAd?: boolean;
}

export function GameRowSection({ title, href, items, showAd = true }: GameRowSectionProps) {
  return (
    <section className="mb-10 w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        <Link 
          href={href} 
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          더보기
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        {items.slice(0, showAd ? 4 : 5).map((item) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            thumbnailUrl={item.thumbnailUrl}
            href={`${href}/play/${item.id}`}
          />
        ))}
        {showAd && <AdSenseCard />}
      </div>
    </section>
  );
}
