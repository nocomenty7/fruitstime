"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, Check, Search, Flag } from "lucide-react"
import { MediaRenderer } from "./MediaRenderer"
import { createClient } from "@/lib/supabase/client"

interface GameItem {
  id: string
  title: string
  media_type: string
  media_url: string | null
  target_decades: string[]
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

  const [isProcessing, setIsProcessing] = useState(false)

  const processResult = async () => {
    setIsProcessing(true)
    
    // 1. 내가 '알아!' 라고 답변한 문항 필터링
    const knownItemIds = Object.keys(answers).filter(id => answers[id])
    const knownItems = items.filter(item => knownItemIds.includes(item.id))
    
    // 2. 연령 빈도수 계산
    const decadeCounts: Record<string, number> = {}
    knownItems.forEach(item => {
      const decadesArray = item.target_decades || []
      decadesArray.forEach(d => {
        decadeCounts[d] = (decadeCounts[d] || 0) + 1
      })
    })

    // 가장 높은 빈도수의 연령대 찾기
    let maxCount = -1
    let predictedDecade = "00s" // 기본값
    for (const [decade, count] of Object.entries(decadeCounts)) {
      if (count > maxCount) {
        maxCount = count
        predictedDecade = decade
      }
    }

    // 3. 예측 연령 맵핑 및 팩폭 멘트 생성
    const map: any = { "80s": "1980년대생", "90s": "1990년대생", "00s": "2000년대생", "10s": "2010년대생" }
    const predictedAgeGroup = map[predictedDecade] || "판별 불가"
    
    let dopamineTitle = "요즘 트렌드를 섭렵한 인싸"
    if (predictedDecade === "80s") dopamineTitle = "허리가 뻐근한 진성 레트로 마스터"
    if (predictedDecade === "90s") dopamineTitle = "밀레니엄 낭만파 고인물"
    if (predictedDecade === "00s") dopamineTitle = "디지털 네이티브 Z세대"

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      // topicId가 UUID 형식이 아니면 더미데이터 테스트 중이므로, FK 에러 방지를 위해 기본 시드 UUID 사용
      let validTopicId = topicId
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(validTopicId)) {
        validTopicId = '22222222-2222-2222-2222-222222222222'
      }

      const { data, error } = await supabase.from('game_results').insert({
        topic_id: validTopicId,
        user_id: user?.id || null,
        total_questions: currentIndex + 1 > items.length ? items.length : currentIndex + 1,
        known_count: knownItemIds.length,
        predicted_age_group: predictedAgeGroup,
        dopamine_title: dopamineTitle
      }).select('id').single()

      if (error) {
        console.error("Supabase Insert Error Object:", error)
        throw error
      }
      
      router.push(`/result/${data.id}`)
    } catch (error) {
      console.error("Result save error:", error)
      alert("결과 저장 중 오류가 발생했습니다. (자세한 내용은 콘솔 확인)")
      router.push('/')
    }
  }

  const handleEndGame = () => {
    if (window.confirm("게임을 종료하시겠습니까?\n종료 시 현재까지의 기록으로 결과를 확인합니다.")) {
      processResult()
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
        // 배열 끝에 도달 시 바로 결과 도출 시작
        processResult()
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
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full relative">
      
      {/* 로딩 오버레이 */}
      {isProcessing && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
          <h2 className="text-xl font-bold text-foreground">결과 분석 중...</h2>
          <p className="text-sm text-muted-foreground mt-2">당신의 연령대를 판별하고 있습니다!</p>
        </div>
      )}

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
