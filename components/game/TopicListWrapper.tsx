"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Play } from "lucide-react"
import { GameSettingsModal } from "./GameSettingsModal"

// 임시 확장 Topic 인터페이스 (플레이 횟수, 생성일자 더미 표현용)
export interface ExtendedTopic {
  id: string
  title: string
  thumbnail_url: string
  plays?: number
  created_at_display?: string
}

interface Props {
  topics: ExtendedTopic[]
}

export function TopicListWrapper({ topics }: Props) {
  const [selectedTopic, setSelectedTopic] = useState<ExtendedTopic | null>(null)
  
  const displayItems = topics.slice(0, 10);

  return (
    <section className="w-full">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div className="flex items-end gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl leading-none">🍓</span>
            <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
              이거 알면 최소 ㅇㅇ년대생
            </h2>
          </div>
          <p className="hidden sm:inline-block text-sm font-medium text-muted-foreground pb-0.5">
            다양한 주제에 대한 내 지식을 테스트해보는 게임
          </p>
        </div>
        <Link 
          href={`/know-or-not/popular`} 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          더보기
          <ChevronRight className="ml-0.5 h-4 w-4" />
        </Link>
      </div>
      
      {/* 모바일에서만 보이는 설명 텍스트 */}
      <p className="sm:hidden text-sm font-medium text-muted-foreground mb-4 pl-1">
        다양한 주제에 대한 내 지식을 테스트해보는 게임
      </p>

      {/* 2줄 나열 그리드 (GameRowSection과 100% 동일) */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        {displayItems.map(topic => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className="group flex flex-col gap-2 text-left transition-transform duration-300 hover:scale-[1.02] active:scale-95 w-full"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border shadow-sm">
              <Image
                src={topic.thumbnail_url}
                alt={topic.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  설정하기
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full px-1">
              <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {topic.title}
              </h3>
              {(topic.plays !== undefined || topic.created_at_display) && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  {topic.plays !== undefined && (
                    <div className="flex items-center gap-1">
                      <Play className="h-3 w-3 fill-current" />
                      <span>{topic.plays >= 10000 ? `${(topic.plays / 10000).toFixed(1)}만회` : `${topic.plays}회`}</span>
                    </div>
                  )}
                  {topic.plays !== undefined && topic.created_at_display && (
                    <span>•</span>
                  )}
                  {topic.created_at_display && (
                    <span>{topic.created_at_display}</span>
                  )}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* 모달 렌더링 */}
      {selectedTopic && (
        <GameSettingsModal
          isOpen={true}
          onClose={() => setSelectedTopic(null)}
          topicId={selectedTopic.id}
          topicTitle={selectedTopic.title}
        />
      )}
    </section>
  )
}
