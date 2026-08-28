"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, Check, Search, Flag } from "lucide-react"
import { MediaRenderer } from "./MediaRenderer"

interface GameItem {
  id: string
  title: string
  hint: string | null
  media_type: string
  media_url: string | null
  target_decade: string
}

interface GamePlayClientProps {
  topicId: string
  topicTitle: string
  items: GameItem[]
  targetCount: number | "unlimited"
  decades: string[]
}

export function GamePlayClient({ topicId, topicTitle, items, targetCount, decades }: GamePlayClientProps) {
  const router = useRouter()
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, boolean>>({}) 
  const [isRevealing, setIsRevealing] = useState(false)
  const [revealType, setRevealType] = useState<'know' | 'dont_know' | null>(null)

  const totalQuestions = targetCount === "unlimited" ? items.length : targetCount
  const currentItem = items[currentIndex]

  const formatDecades = () => {
    const map: any = { "80s": "1980년대생", "90s": "1990년대생", "00s": "2000년대생", "10s": "2010년대생~" }
    return decades.map(d => map[d] || d).join(", ")
  }

  const handleEndGame = () => {
    if (window.confirm("게임을 종료하시겠습니까?\n종료 시 현재까지의 기록으로 결과를 확인합니다.")) {
      alert("게임이 종료되었습니다! (향후 결과 페이지로 이동)")
      router.push('/')
    }
  }

  const handleReport = () => {
    alert("현재 문제를 신고하시겠습니까? (향후 신고 모달 오픈)")
  }

  const handleAnswer = (knows: boolean) => {
    if (isRevealing || !currentItem) return

    setRevealType(knows ? 'know' : 'dont_know')
    setIsRevealing(true)

    setAnswers(prev => ({
      ...prev,
      [currentItem.id]: knows
    }))

    setTimeout(() => {
      setIsRevealing(false)
      setRevealType(null)
      
      if (currentIndex + 1 >= totalQuestions || currentIndex + 1 >= items.length) {
        handleEndGame()
      } else {
        setCurrentIndex(prev => prev + 1)
      }
    }, 2000)
  }

  if (!currentItem) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 h-full text-center p-6 text-foreground">
        <h2 className="text-xl font-bold mb-4">앗, 준비된 문제가 없습니다!</h2>
        <p className="text-muted-foreground mb-8">선택하신 옵션에 해당하는 문제가 다 떨어졌네요.</p>
        <button onClick={handleEndGame} className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
          결과 보기
        </button>
      </div>
    )
  }

  const progressPercentage = ((currentIndex) / totalQuestions) * 100

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
      
      {/* 상단 헤더 & 게이지 바 */}
      <div className="px-5 py-3 flex flex-col gap-3 shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground line-clamp-1">
              이거 알면 최소 ㅇㅇ년대생
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold text-muted-foreground">
              <span>{topicTitle}</span>
              <span>/</span>
              <span className="text-orange-500">{formatDecades()}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-1 shrink-0">
            <button onClick={handleReport} className="text-[13px] font-bold text-muted-foreground hover:text-foreground transition-colors">
              문제신고
            </button>
            <span className="text-muted-foreground/30 text-[10px]">|</span>
            <button onClick={handleEndGame} className="text-[13px] font-bold text-muted-foreground hover:text-foreground transition-colors">
              종료
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-sm font-bold text-foreground whitespace-nowrap min-w-[50px] text-right">
            {currentIndex + 1} <span className="text-muted-foreground">/ {totalQuestions}</span>
          </span>
        </div>
      </div>

      {/* 메인 콘텐츠 구역 (화면 가득 채우기) */}
      <div className="flex-1 flex flex-col px-5 pt-2 pb-4 gap-4 overflow-hidden relative">
        
        {/* 애니메이션 오버레이 (도장 효과) */}
        {isRevealing && revealType && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className={`
              animate-in zoom-in-50 fade-in duration-200 
              flex flex-col items-center justify-center
              w-64 h-64 sm:w-72 sm:h-72 rounded-full shadow-2xl backdrop-blur-sm border-8
              ${revealType === 'know' ? 'border-orange-500 bg-orange-500/20 text-orange-500' : 'border-gray-500 bg-gray-500/20 text-gray-500'}
            `}>
              <span className="text-5xl sm:text-6xl font-black -rotate-12 drop-shadow-lg">
                {revealType === 'know' ? '알아!' : '몰라'}
              </span>
            </div>
          </div>
        )}

        {/* 미디어 렌더러 (가능한 공간 최대로 확보) */}
        <div className="w-full flex-1 relative rounded-2xl overflow-hidden shadow-sm border border-border bg-black/5">
          <MediaRenderer 
            type={currentItem.media_type as any} 
            url={currentItem.media_url} 
            alt={currentItem.title}
          />
        </div>

        {/* 질문 & 힌트 */}
        <div className="flex flex-col items-center justify-center text-center gap-2 px-2 shrink-0 h-[80px]">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground break-keep leading-tight animate-in slide-in-from-bottom-2 fade-in duration-300">
            {currentItem.title}
          </h2>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="px-5 shrink-0 grid grid-cols-2 gap-3 sm:gap-4 pb-10 sm:pb-12">
        {/* 알아! 버튼 (왼쪽) */}
        <button 
          onClick={() => handleAnswer(true)}
          disabled={isRevealing}
          className="flex flex-col items-center justify-center gap-1.5 py-4 sm:py-5 rounded-2xl bg-orange-500 hover:bg-orange-600 border-2 border-transparent transition-all active:scale-95 disabled:opacity-50 shadow-md shadow-orange-500/20"
        >
          <Check className="w-8 h-8 text-white stroke-[3px]" />
          <span className="font-extrabold text-lg sm:text-xl text-white">알아!</span>
        </button>

        {/* 몰라 버튼 (오른쪽) */}
        <button 
          onClick={() => handleAnswer(false)}
          disabled={isRevealing}
          className="flex flex-col items-center justify-center gap-1.5 py-4 sm:py-5 rounded-2xl bg-muted hover:bg-muted/80 border-2 border-transparent hover:border-border transition-all active:scale-95 disabled:opacity-50 group shadow-sm"
        >
          <Search className="w-7 h-7 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="font-extrabold text-lg sm:text-xl text-muted-foreground group-hover:text-foreground transition-colors">몰라</span>
        </button>
      </div>

    </div>
  )
}
