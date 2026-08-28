"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Play, MonitorPlay } from "lucide-react"

interface GameSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  topicId: string
  topicTitle: string
}

const DECADES = [
  { id: "80s", label: "80년대" },
  { id: "90s", label: "90년대" },
  { id: "00s", label: "00년대" },
  { id: "10s", label: "10년대" },
]

const QUESTION_COUNTS = [
  { value: 10, label: "10문제" },
  { value: 20, label: "20문제" },
  { value: 30, label: "30문제" },
  { value: "unlimited", label: "무제한 풀기" },
]

export function GameSettingsModal({ isOpen, onClose, topicId, topicTitle }: GameSettingsModalProps) {
  const router = useRouter()
  
  // 기본 선택값 세팅
  const [selectedDecades, setSelectedDecades] = useState<string[]>(["90s", "00s"])
  const [selectedCount, setSelectedCount] = useState<number | "unlimited">(10)
  const [streamerMode, setStreamerMode] = useState(false)

  if (!isOpen) return null

  const toggleDecade = (id: string) => {
    setSelectedDecades(prev => 
      prev.includes(id) 
        ? prev.filter(d => d !== id)
        : [...prev, id]
    )
  }

  const handleStart = () => {
    if (selectedDecades.length === 0) {
      alert("최소 하나의 연령대를 선택해주세요!")
      return
    }

    // 쿼리 파라미터로 설정값 넘기기
    const params = new URLSearchParams({
      decades: selectedDecades.join(","),
      count: selectedCount.toString(),
      streamer: streamerMode.toString()
    })

    router.push(`/play/${topicId}?${params.toString()}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-card w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-muted/30">
          <div>
            <h2 className="text-xl font-bold">{topicTitle}</h2>
            <p className="text-sm text-muted-foreground mt-1">게임 설정을 선택해주세요</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* 연령대 선택 */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">타겟 연령대 (복수 선택 가능)</label>
            <div className="grid grid-cols-4 gap-2">
              {DECADES.map(d => (
                <button
                  key={d.id}
                  onClick={() => toggleDecade(d.id)}
                  className={`py-2 text-sm font-medium rounded-lg border transition-all ${
                    selectedDecades.includes(d.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* 문제 수 선택 */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">문제 수</label>
            <div className="grid grid-cols-2 gap-2">
              {QUESTION_COUNTS.map(q => (
                <button
                  key={q.value}
                  onClick={() => setSelectedCount(q.value)}
                  className={`py-2.5 text-sm font-medium rounded-lg border transition-all ${
                    selectedCount === q.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* 스트리머 모드 */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${streamerMode ? 'bg-orange-500/20 text-orange-500' : 'bg-muted text-muted-foreground'}`}>
                <MonitorPlay className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">스트리머 모드 <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground ml-1">준비중</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">치지직/숲 실시간 채팅 투표 연동</p>
              </div>
            </div>
            
            {/* 토글 스위치 (현재는 비활성화 강제) */}
            <button 
              disabled
              onClick={() => setStreamerMode(!streamerMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors opacity-50 cursor-not-allowed ${
                streamerMode ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                streamerMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* 하단 시작 버튼 */}
        <div className="p-5 pt-2">
          <button 
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            <Play className="w-5 h-5 fill-current" />
            게임 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}
