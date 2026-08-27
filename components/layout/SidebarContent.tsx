"use client"
import Link from "next/link";
import { Search, Trophy, Clock, Info, Bell, PlusSquare } from "lucide-react";

const FRUIT_GAMES = [
  {
    id: "know-or-not",
    label: "이거 알아?",
    emoji: "🍓",
    href: "/know-or-not"
  },
  {
    id: "price-guess",
    label: "가격 스캐너",
    emoji: "🍊",
    href: "/price-guess"
  },
  {
    id: "draft",
    label: "입맛대로 스쿼드",
    emoji: "🍉",
    href: "/draft"
  }
];

const EXTERNAL_GAMES = [
  {
    id: "kiro",
    label: "시참 밸런스게임 '기로'",
    emoji: "🍇",
    href: "https://playkiro.kr",
    badge: { text: "HOT", color: "bg-red-500" }
  }
];


export function SidebarContent({ onClickItem }: { onClickItem?: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto pt-6 pb-4 px-3 custom-scrollbar">
      <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        게임 목록
      </div>
      <ul className="space-y-6">
        {FRUIT_GAMES.map((game) => (
          <li key={game.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3">
              <span className="text-xl leading-none">{game.emoji}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-foreground">{game.label}</span>
              </div>
            </div>
            
            <ul className="ml-5 border-l-2 border-border/40 pl-3 space-y-1">
              <li>
                <Link onClick={onClickItem} href={`${game.href}/popular`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Trophy className="h-3.5 w-3.5" /> 인기순
                </Link>
              </li>
              <li>
                <Link onClick={onClickItem} href={`${game.href}/recent`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Clock className="h-3.5 w-3.5" /> 최신순
                </Link>
              </li>
              <li>
                <Link onClick={onClickItem} href={`${game.href}/search`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Search className="h-3.5 w-3.5" /> 검색
                </Link>
              </li>
              <li>
                <Link onClick={onClickItem} href={`${game.href}/create`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                  <PlusSquare className="h-3.5 w-3.5" /> 만들기
                </Link>
              </li>
            </ul>
          </li>
        ))}
      </ul>

      {/* 외부 링크 게임 목록 */}
      <ul className="space-y-6 mt-6">
        {EXTERNAL_GAMES.map((game) => (
          <li key={game.id}>
            <a 
              href={game.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
            >
              <span className="text-xl leading-none group-hover:scale-110 transition-transform">{game.emoji}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-foreground">{game.label}</span>
                {game.badge && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm text-white ${game.badge.color}`}>
                    {game.badge.text}
                  </span>
                )}
              </div>
            </a>
          </li>
        ))}
        {/* 지속 개발 중 안내 (클릭 방지) */}
        <li>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg opacity-60 cursor-not-allowed">
            <span className="text-xl leading-none">🍑</span>
            <span className="font-bold text-sm text-muted-foreground">새로운 게임 준비중...</span>
          </div>
        </li>
      </ul>
      
      <div className="my-8 border-t border-border"></div>
      
      <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        후르츠타임
      </div>
      <ul className="space-y-1">
        <li>
          <Link
            onClick={onClickItem}
            href="/about"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <Info className="h-5 w-5" />
            <span className="font-medium text-sm">소개</span>
          </Link>
        </li>
        <li>
          <Link
            onClick={onClickItem}
            href="/notices"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            <span className="font-medium text-sm">공지사항</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
