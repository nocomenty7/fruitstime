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
  { id: "80s", label: "1980년대생" },
  { id: "90s", label: "1990년대생" },
  { id: "00s", label: "2000년대생" },
  { id: "10s", label: "2010년대생~" },
]

const QUESTION_COUNTS: { value: number | "unlimited"; label: string }[] = [
  { value: 10, label: "10문제" },
  { value: 20, label: "20문제" },
  { value: 30, label: "30문제" },
  { value: "unlimited", label: "모든 문제 풀기" },
]

export function GameSettingsModal({ isOpen, onClose, topicId, topicTitle }: GameSettingsModalProps) {
  const router = useRouter()
  
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
            <h2 className="text-xl font-extrabold tracking-tight">이거 알면 최소 ㅇㅇ년대생</h2>
            <p className="text-[15px] font-bold text-orange-500 mt-1.5">{topicTitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors self-start -mt-1"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-8">
          {/* 연령대 선택 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">타겟 연령대 (복수 선택 가능)</label>
              <p className="text-xs text-muted-foreground/90 font-medium">
                * 해당 연령대에 가장 핫했던 추억의 문제들이 제공됩니다.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DECADES.map(d => (
                <button
                  key={d.id}
                  onClick={() => toggleDecade(d.id)}
                  className={`py-2 text-[13px] font-semibold rounded-lg border transition-all ${
                    selectedDecades.includes(d.id)
                      ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:border-orange-500/50 hover:text-foreground"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* 문제 수 선택 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <label className="text-sm font-semibold text-foreground">문제 수</label>
                <span className="text-xs text-orange-500 font-bold">(총 150문제)</span>
              </div>
              <p className="text-[11.5px] text-muted-foreground/90 font-medium leading-relaxed break-keep">
                * 선택한 문제 수 내에서 무작위 출제되며, '모든 문제 풀기'의 경우, 문제가 소진되거나 중간에 종료 버튼을 누르면 종료됩니다. 로그인한 경우에 한하여 향후 이어서 진행 가능합니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {QUESTION_COUNTS.map(q => (
                <button
                  key={q.value}
                  onClick={() => setSelectedCount(q.value)}
                  className={`py-2.5 text-sm font-semibold rounded-lg border transition-all ${
                    selectedCount === q.value
                      ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:border-orange-500/50 hover:text-foreground"
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* 스트리머 모드 */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20 mt-2">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${streamerMode ? 'bg-orange-500/20 text-orange-500' : 'bg-muted text-muted-foreground'}`}>
                <MonitorPlay className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">치지직/숲 실시간 채팅 투표 연동 <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground ml-1">준비중</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">스트리머 전용 모드</p>
              </div>
            </div>
            
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
        <div className="p-5 pt-0 mt-2">
          <button 
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-orange-500 text-white font-bold text-base shadow-lg hover:bg-orange-600 transition-colors active:scale-[0.98]"
          >
            <Play className="w-5 h-5 fill-current" />
            게임 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}
