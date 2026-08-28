"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Share2, RotateCcw, Copy, Check } from "lucide-react"

interface ResultClientProps {
  resultId: string
  topicTitle: string
  totalQuestions: number
  knownCount: number
  predictedAgeGroup: string
  dopamineTitle: string
}

export function ResultClient({ 
  resultId, 
  topicTitle, 
  totalQuestions, 
  knownCount, 
  predictedAgeGroup,
  dopamineTitle 
}: ResultClientProps) {
  const router = useRouter()
  const [isCopied, setIsCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const knowRatio = Math.round((knownCount / totalQuestions) * 100) || 0

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/result/${resultId}`
      await navigator.clipboard.writeText(url)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (e) {
      alert("링크 복사에 실패했습니다.")
    }
  }

  const handleShareKakao = () => {
    // 향후 카카오톡 SDK 연동 시 사용
    alert("카카오톡 공유하기 기능은 준비 중입니다! 링크 복사를 이용해주세요.")
  }

  const handleRetry = () => {
    router.push("/")
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col max-w-md mx-auto w-full min-h-[calc(100vh-64px)] p-6 bg-background">
      <div className="flex-1 flex flex-col items-center justify-center gap-8 py-10">
        
        {/* 타이틀 영역 */}
        <div className="text-center flex flex-col gap-2 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <p className="text-sm font-bold text-orange-500">{topicTitle}</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground break-keep">
            당신의 추정 연령대는...
          </h1>
        </div>

        {/* 결과 박스 */}
        <div className="w-full relative flex flex-col items-center justify-center gap-4 bg-muted/30 p-8 rounded-3xl border border-border shadow-lg animate-in zoom-in-95 fade-in duration-700 delay-150 fill-mode-both">
          <div className="absolute -top-6 bg-orange-500 text-white px-6 py-2 rounded-full font-black text-lg shadow-lg rotate-[-3deg]">
            분석 완료!
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mt-4 text-center break-keep">
            {predictedAgeGroup}
          </h2>
          
          <div className="mt-2 bg-background px-5 py-2.5 rounded-xl border border-border/50 text-center">
            <p className="font-bold text-muted-foreground text-sm sm:text-base">
              "{dopamineTitle}"
            </p>
          </div>
        </div>

        {/* 통계 요약 */}
        <div className="w-full flex flex-col gap-3 animate-in slide-in-from-bottom-4 fade-in duration-500 delay-300 fill-mode-both">
          <div className="flex justify-between items-end px-1">
            <span className="font-bold text-muted-foreground">정답률 (안다)</span>
            <span className="font-black text-2xl text-orange-500">{knowRatio}%</span>
          </div>
          <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${knowRatio}%` }}
            />
          </div>
          <p className="text-center text-sm font-medium text-muted-foreground mt-2">
            총 {totalQuestions}문제 중 <span className="text-foreground font-bold">{knownCount}개</span>를 안다고 답했어요!
          </p>
        </div>

      </div>

      {/* 하단 액션 버튼 */}
      <div className="w-full flex flex-col gap-3 shrink-0 pb-6 animate-in slide-in-from-bottom-8 fade-in duration-500 delay-500 fill-mode-both">
        <button 
          onClick={handleShareKakao}
          className="w-full py-4 rounded-2xl bg-[#FEE500] text-[#000000] font-extrabold text-base flex items-center justify-center gap-2 hover:bg-[#FEE500]/90 transition-colors shadow-md"
        >
          카카오톡으로 결과 공유
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-muted text-muted-foreground font-bold hover:bg-muted/80 transition-colors border border-border/50"
          >
            {isCopied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            {isCopied ? "복사완료!" : "링크 복사"}
          </button>
          
          <button 
            onClick={handleRetry}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
          >
            <RotateCcw className="w-5 h-5" />
            다시하기
          </button>
        </div>
      </div>
    </div>
  )
}
