"use client"
import Link from "next/link";
import { PlusSquare, UserCircle, Search, Trophy, Clock } from "lucide-react";

const FRUIT_GAMES = [
  {
    id: "know-or-not",
    label: "안다 vs 모른다",
    emoji: "🍓",
    href: "/know-or-not"
  },
  {
    id: "price-guess",
    label: "가격 맞추기",
    emoji: "🍊",
    href: "/price-guess"
  },
  {
    id: "worldcup",
    label: "이상형 월드컵",
    emoji: "🍇",
    href: "/worldcup"
  }
];

const USER_ITEMS = [
  { href: "/create", label: "만들기", icon: PlusSquare },
  { href: "/mypage", label: "마이페이지", icon: UserCircle },
];

export function SidebarContent({ onClickItem }: { onClickItem?: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
      <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        게임 목록
      </div>
      <ul className="space-y-6">
        {FRUIT_GAMES.map((game) => (
          <li key={game.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3">
              <span className="text-xl leading-none">{game.emoji}</span>
              <span className="font-bold text-sm text-foreground">{game.label}</span>
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
      
      <div className="my-8 border-t border-border"></div>
      
      <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        내 활동
      </div>
      <ul className="space-y-1">
        {USER_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              onClick={onClickItem}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
