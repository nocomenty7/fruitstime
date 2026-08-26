import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

interface ContentCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  href: string;
}

export function ContentCard({ id, title, thumbnailUrl, href }: ContentCardProps) {
  return (
    <Link href={href} className="group flex flex-col gap-3">
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
      <div className="flex px-1">
        <h3 className="line-clamp-2 text-base font-medium leading-tight text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
}
