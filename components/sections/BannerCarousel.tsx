"use client"
import Image from "next/image"
import { useState } from "react"

// 현재는 1개만 올려두셨으므로 배열에 1개만 적용해 두었습니다.
// 추후 이미지가 추가되면 이 배열에 객체를 추가하기만 하면 자동으로 회색 동그라미(인디케이터)가 늘어나고 슬라이드가 적용됩니다.
const BANNERS = [
  { id: 1, src: "/banner_260826.png", alt: "메인 배너 1" }
]

export function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/50 shadow-sm mb-4 aspect-[21/9] md:aspect-[4/1] bg-muted/30">
      {/* 배너 이미지 래퍼 */}
      <div 
        className="flex h-full w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {BANNERS.map((banner) => (
          <div key={banner.id} className="relative min-w-full h-full">
            <Image 
              src={banner.src} 
              alt={banner.alt} 
              fill
              className="object-cover"
              priority={banner.id === 1}
            />
          </div>
        ))}
      </div>

      {/* 하단 인디케이터 (dot) */}
      {BANNERS.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {BANNERS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index 
                  ? "w-6 bg-black/50 dark:bg-white/50" 
                  : "w-2 bg-black/20 dark:bg-white/20 hover:bg-black/30 dark:hover:bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
