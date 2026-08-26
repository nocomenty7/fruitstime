import Link from "next/link";
import { Home, Gamepad2, Coins, CircleDollarSign, Compass, PlusSquare, UserCircle } from "lucide-react";

const NAV_ITEMS = [
  { href: "/know-or-not", label: "안다 vs 모른다", icon: Gamepad2 },
  { href: "/price-guess", label: "가격 맞추기", icon: Coins },
  { href: "/budget-draft", label: "한정예산 드래프트", icon: CircleDollarSign },
  { href: "/giro", label: "기로 (Giro)", icon: Compass },
];

const USER_ITEMS = [
  { href: "/create", label: "만들기", icon: PlusSquare },
  { href: "/mypage", label: "마이페이지", icon: UserCircle },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-64 flex-col border-r border-border bg-background sm:flex">
      <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="my-4 border-t border-border"></div>
        
        <ul className="space-y-1">
          {USER_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
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
    </aside>
  );
}
