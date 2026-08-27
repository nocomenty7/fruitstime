export const dynamic = 'force-dynamic';

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col sm:pl-64">
          <div className="flex-1 w-full max-w-7xl mx-auto pt-4 pb-3 px-3 md:pb-4 md:px-4 lg:pb-5 lg:px-5">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
