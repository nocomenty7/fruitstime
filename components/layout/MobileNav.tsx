"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Menu, X } from "lucide-react"
import { SidebarContent } from "./SidebarContent"
import Image from "next/image"
import Link from "next/link"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="sm:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -ml-2 text-foreground rounded-md hover:bg-muted"
      >
        <Menu className="h-6 w-6" />
      </button>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex">
          {/* 오버레이 */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          {/* 사이드바 모달 */}
          <div className="relative z-[101] w-72 bg-background h-full shadow-xl flex flex-col animate-in slide-in-from-left-full duration-200">
            <div className="flex h-16 items-center justify-between px-4 border-b border-border">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image 
                  src="/logo.png" 
                  alt="Fruits Time Logo" 
                  width={120} 
                  height={34} 
                  className="object-contain" 
                />
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <SidebarContent onClickItem={() => setIsOpen(false)} />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
