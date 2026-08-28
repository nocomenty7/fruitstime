"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, Check, Search, LogOut } from "lucide-react"
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
  const [answers, setAnswers] = useState<Record<string, boolean>>({}) // itemId -> 안다(true)/모른다(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [revealType, setRevealType] = useState<'know' | 'dont_know' | null>(null)

  const totalQuestions = targetCount === "unlimited" ? items.length : targetCount
  const currentItem = items[currentIndex]

  const handleEndGame = () => {
    // TODO: 결과 페이지로 이동하면서 상태(답변 기록) 넘기기
    // 현재는 임시 결과 라우팅
    alert("게임이 종료되었습니다! (향후 결과 페이지로 이동)")
    router.push('/')
  }

  const handleAnswer = (knows: boolean) => {
    if (isRevealing || !currentItem) return

    setRevealType(knows ? 'know' : 'dont_know')
    setIsRevealing(true)

    // 답변 저장
    setAnswers(prev => ({
      ...prev,
      [currentItem.id]: knows
    }))

    // 애니메이션 후 다음 문제로 넘어감
    setTimeout(() => {
      setIsRevealing(false)
      setRevealType(null)
      
      if (currentIndex + 1 >= totalQuestions || currentIndex + 1 >= items.length) {
        handleEndGame()
      } else {
        setCurrentIndex(prev => prev + 1)
      }
    }, 600)
  }

  if (!currentItem) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 h-full text-center p-6 text-white">
        <h2 className="text-xl font-bold mb-4">앗, 준비된 문제가 없습니다!</h2>
        <p className="text-muted-foreground mb-8">선택하신 옵션에 해당하는 문제가 다 떨어졌네요.</p>
        <button onClick={handleEndGame} className="px-6 py-3 bg-orange-500 rounded-xl font-bold hover:bg-orange-600">
          결과 보기
        </button>
      </div>
    )
  }

  const progressPercentage = ((currentIndex) / totalQuestions) * 100

  return (
    <div className="flex flex-col flex-1 h-full max-w-2xl mx-auto w-full pb-8">
      
      {/* 상단 헤더 & 게이지 바 */}
      <div className="px-5 py-4 flex flex-col gap-3 sticky top-0 bg-[#121212]/95 backdrop-blur z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-orange-500/20 text-orange-500 text-xs font-extrabold px-2 py-1 rounded-md">
              {topicTitle}
            </span>
          </div>
          <button onClick={handleEndGame} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
            <X className="w-5 h-5 text-white/70 group-hover:text-white" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-sm font-bold text-white whitespace-nowrap min-w-[50px] text-right">
            {currentIndex + 1} <span className="text-white/40">/ {totalQuestions}</span>
          </span>
        </div>
      </div>

      {/* 메인 콘텐츠 구역 */}
      <div className="flex-1 flex flex-col px-5 pt-2 pb-6 gap-6 justify-center relative">
        
        {/* 애니메이션 오버레이 (도장 효과) */}
        {isRevealing && revealType && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className={`
              animate-in zoom-in-50 fade-in duration-200 
              flex flex-col items-center justify-center gap-3
              w-40 h-40 rounded-full shadow-2xl backdrop-blur-md border-4
              ${revealType === 'know' ? 'border-green-500 bg-green-500/20 text-green-400' : 'border-red-500 bg-red-500/20 text-red-400'}
            `}>
              <span className="text-3xl font-black rotate-12">
                {revealType === 'know' ? '안다!' : '모른다..'}
              </span>
            </div>
          </div>
        )}

        {/* 미디어 렌더러 */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
          <MediaRenderer 
            type={currentItem.media_type as any} 
            url={currentItem.media_url} 
            alt={currentItem.title}
          />
        </div>

        {/* 질문 & 힌트 */}
        <div className="flex flex-col items-center text-center gap-3 px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white break-keep leading-tight animate-in slide-in-from-bottom-2 fade-in duration-300">
            {currentItem.title}
          </h2>
          {currentItem.hint && (
            <p className="text-sm sm:text-base text-white/60 bg-white/5 px-4 py-2 rounded-xl">
              💡 {currentItem.hint}
            </p>
          )}
        </div>

      </div>

      {/* 하단 버튼 영역 */}
      <div className="px-5 mt-auto grid grid-cols-2 gap-3 sm:gap-4 sticky bottom-6 z-10">
        <button 
          onClick={() => handleAnswer(false)}
          disabled={isRevealing}
          className="flex flex-col items-center justify-center gap-1.5 py-4 sm:py-5 rounded-2xl bg-[#2A2A2A] hover:bg-[#333333] border-2 border-transparent hover:border-white/10 transition-all active:scale-95 disabled:opacity-50 group shadow-lg"
        >
          <Search className="w-7 h-7 text-white/50 group-hover:text-white/80 transition-colors" />
          <span className="font-extrabold text-lg text-white/90">처음 봐요..</span>
        </button>

        <button 
          onClick={() => handleAnswer(true)}
          disabled={isRevealing}
          className="flex flex-col items-center justify-center gap-1.5 py-4 sm:py-5 rounded-2xl bg-orange-500 hover:bg-orange-600 border-2 border-transparent transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-orange-500/20"
        >
          <Check className="w-8 h-8 text-white stroke-[3px]" />
          <span className="font-extrabold text-lg text-white">이거 알아요!</span>
        </button>
      </div>

    </div>
  )
}
