import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground transition-colors">
            이용약관
          </Link>
          <span className="text-border">|</span>
          <Link href="/privacy" className="hover:text-foreground font-semibold transition-colors">
            개인정보 처리방침
          </Link>
          <span className="text-border">|</span>
          <a href="mailto:auroranest.official@gmail.com" className="hover:text-foreground transition-colors">
            문의하기
          </a>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          Copyright © {currentYear} AuroraNest All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
