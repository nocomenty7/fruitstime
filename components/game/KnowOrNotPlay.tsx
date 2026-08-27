"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ThumbsUp, HelpCircle, AlertCircle } from "lucide-react"

interface Option {
  id: string
  content: string
  sort_order: number
}

interface Props {
  gameId: string
  options: Option[]
  totalPlays: number
}

export function KnowOrNotPlay({ gameId, options, totalPlays }: Props) {
  const [hasVoted, setHasVoted] = useState(false)
  const [isVoting, setIsVoting] = useState(false)
  
  // 시뮬레이션용 가짜 통계 데이터 (실제로는 DB에서 집계해서 가져와야 하지만 이번 페이즈에서는 애니메이션 연출 목적)
  const [stats, setStats] = useState({ know: 0, dontKnow: 0 })

  const handleVote = async (optionId: string, isKnow: boolean) => {
    if (isVoting || hasVoted) return
    setIsVoting(true)
    
    try {
      const supabase = createClient()
      
      // play_history에 비로그인/로그인 유저 관계없이 INSERT (RLS 허용됨)
      // 현재 유저 정보 가져오기 (비로그인이면 null)
      const { data: { user } } = await supabase.auth.getUser()

      await supabase.from('play_history').insert({
        user_id: user?.id || null,
        game_id: gameId,
        result_data: { option_id: optionId, choice: isKnow ? 'KNOW' : 'DONT_KNOW' }
      })

      // 조회수(plays_count) 1 증가 (실제로는 RPC 함수를 쓰는게 안전하나 임시 처리)
      // 이번 페이즈에서는 생략

      // 가짜 통계 랜덤 생성 (안다 비율 40~80% 사이)
      const randomKnowPercent = Math.floor(Math.random() * 40) + 40
      setStats({
        know: randomKnowPercent,
        dontKnow: 100 - randomKnowPercent
      })
      
      setHasVoted(true)
    } catch (error) {
      console.error('Vote error:', error)
      alert("투표 중 오류가 발생했습니다.")
    } finally {
      setIsVoting(false)
    }
  }

  // 선택지가 2개가 아닐 경우 방어 코드
  if (options.length < 2) {
    return (
      <div className="flex items-center gap-2 text-destructive p-4 bg-destructive/10 rounded-xl">
        <AlertCircle className="w-5 h-5" />
        <p>게임 선택지 데이터가 부족합니다.</p>
      </div>
    )
  }

  const optionKnow = options[0] // 첫번째 옵션 "당연히 안다"
  const optionDontKnow = options[1] // 두번째 옵션 "처음 듣는다"

  return (
    <div className="w-full mt-6">
      {!hasVoted ? (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleVote(optionKnow.id, true)}
            disabled={isVoting}
            className="flex flex-col items-center justify-center gap-4 py-10 rounded-2xl bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 transition-all active:scale-95 group disabled:opacity-50"
          >
            <ThumbsUp className="w-12 h-12 text-orange-500 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-orange-700">{optionKnow.content}</span>
          </button>
          
          <button
            onClick={() => handleVote(optionDontKnow.id, false)}
            disabled={isVoting}
            className="flex flex-col items-center justify-center gap-4 py-10 rounded-2xl bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 transition-all active:scale-95 group disabled:opacity-50"
          >
            <HelpCircle className="w-12 h-12 text-slate-500 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-slate-700">{optionDontKnow.content}</span>
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6 animate-in fade-in zoom-in duration-500 bg-card border border-border p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-center mb-2">🎉 투표 완료! 다른 사람들의 생각은?</h3>
          
          {/* 통계 프로그레스 바 */}
          <div className="flex flex-col gap-5">
            {/* 안다 영역 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span className="font-semibold text-orange-600">{optionKnow.content}</span>
                <span className="text-xl font-black text-orange-500">{stats.know}%</span>
              </div>
              <div className="w-full h-5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${stats.know}%` }}
                />
              </div>
            </div>

            {/* 모른다 영역 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span className="font-semibold text-slate-600">{optionDontKnow.content}</span>
                <span className="text-xl font-black text-slate-500">{stats.dontKnow}%</span>
              </div>
              <div className="w-full h-5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${stats.dontKnow}%` }}
                />
              </div>
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            총 {(totalPlays + 1).toLocaleString()}명이 이 퀴즈에 참여했습니다.
          </p>
        </div>
      )}
    </div>
  )
}
