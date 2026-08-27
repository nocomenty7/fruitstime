import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

interface ContentCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  href: string;
  plays?: number;
  createdAt?: string;
}

export function ContentCard({ id, title, thumbnailUrl, href, plays = 0, createdAt = "2024.01.01" }: ContentCardProps) {
  // 숫자를 K, M 등 축약형이나 천단위 콤마로 표기
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만';
    }
    return num.toLocaleString();
  };

  return (
    <Link href={href} className="group flex flex-col gap-2">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Play className="h-12 w-12 text-white/90" />
        </div>
      </div>
      <div className="flex flex-col px-1 gap-1">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center text-xs font-medium text-muted-foreground mt-0.5">
          <span className="flex items-center gap-1">
            <Play className="h-3 w-3 fill-current" />
            {formatNumber(plays)}회
          </span>
          <span className="mx-1.5">•</span>
          <span>{createdAt}</span>
        </div>
      </div>
    </Link>
  );
}
