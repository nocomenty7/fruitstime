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
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        
        {/* Left Area */}
        <div className="flex flex-1 items-center gap-2 justify-start">
          <MobileNav />
          <Link href="/" className="flex items-center ml-2 sm:ml-4">
            <Image 
              src="/logo.png" 
              alt="Fruits Time Logo" 
              width={160} 
              height={46} 
              className="object-contain h-11 w-auto" 
              priority 
            />
          </Link>
        </div>

        {/* Center Area (Search) */}
        <div className="flex-[2] flex items-center justify-center px-2 sm:px-6">
          <div className="w-full max-w-lg relative hidden sm:flex items-center">
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
        <div className="flex flex-1 items-center gap-2 justify-end">
          <ThemeToggle />
          {user ? (
            <Link href="/mypage" className="h-9 px-4 ml-2 inline-flex items-center justify-center rounded-full bg-orange-500 text-white font-medium text-sm hover:bg-orange-600 transition-colors shadow-sm cursor-pointer">
              내정보
            </Link>
          ) : (
            <Link href="/login" className="h-9 px-4 ml-2 inline-flex items-center justify-center rounded-full bg-orange-500 text-white font-medium text-sm hover:bg-orange-600 transition-colors shadow-sm cursor-pointer">
              로그인
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
