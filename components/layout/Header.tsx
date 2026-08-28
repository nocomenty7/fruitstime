import Link from "next/link";
import Image from "next/image";
import { Search, UserCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { createClient } from "@/lib/supabase/server";
import { MobileNav } from "./MobileNav";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-3 md:px-6">
        
        {/* Left Area */}
        <div className="flex shrink-0 sm:flex-1 items-center gap-1 sm:gap-2 justify-start">
          <MobileNav />
          <Link href="/" className="flex items-center shrink-0 ml-1 sm:ml-4">
            <Image 
              src="/logo.png" 
              alt="Fruits Time Logo" 
              width={160} 
              height={46} 
              className="object-contain h-8 sm:h-11 w-auto shrink-0" 
              priority 
            />
          </Link>
        </div>

        {/* Center Area (Search) */}
        <div className="hidden sm:flex sm:flex-[2] items-center justify-center px-2 sm:px-6">
          <div className="w-full max-w-lg relative flex items-center">
            <input 
              type="search" 
              placeholder="콘텐츠 검색..." 
              className="w-full h-10 px-4 pr-10 rounded-full border border-border bg-muted/50 focus:outline-none focus:ring-1 focus:ring-primary text-sm transition-colors"
            />
            <button className="absolute right-3 text-muted-foreground hover:text-foreground">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Area (Buttons) */}
        <div className="flex shrink-0 sm:flex-1 items-center gap-1 sm:gap-2 justify-end ml-auto">
          <ThemeToggle />
          {user ? (
            <Link href="/mypage" className="whitespace-nowrap shrink-0 h-8 sm:h-9 px-3 sm:px-4 inline-flex items-center justify-center rounded-full bg-orange-500 text-white font-medium text-xs sm:text-sm hover:bg-orange-600 transition-colors shadow-sm cursor-pointer">
              내정보
            </Link>
          ) : (
            <Link href="/login" className="whitespace-nowrap shrink-0 h-8 sm:h-9 px-3 sm:px-4 inline-flex items-center justify-center rounded-full bg-orange-500 text-white font-medium text-xs sm:text-sm hover:bg-orange-600 transition-colors shadow-sm cursor-pointer">
              로그인
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
