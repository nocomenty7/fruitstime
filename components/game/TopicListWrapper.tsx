"use client"

import { useState } from "react"
import Image from "next/image"
import { GameSettingsModal } from "./GameSettingsModal"

interface Topic {
  id: string
  title: string
  thumbnail_url: string
}

interface Props {
  topics: Topic[]
}

export function TopicListWrapper({ topics }: Props) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topics.map(topic => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className="group flex flex-col gap-2 text-left transition-transform duration-300 hover:scale-[1.02] active:scale-95"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border shadow-sm">
              <Image
                src={topic.thumbnail_url}
                alt={topic.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  설정하기
                </span>
              </div>
            </div>
            <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors px-1">
              {topic.title}
            </h3>
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
    </>
  )
}
