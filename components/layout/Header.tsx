import Link from "next/link";
import Image from "next/image";
import { Search, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button className="sm:hidden text-foreground">
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Fruits Time Logo" 
              width={140} 
              height={40} 
              className="object-contain h-10 w-auto" 
              priority 
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6">
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

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="h-9 px-4 ml-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
