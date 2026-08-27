"use client"

import { MessageSquare } from "lucide-react"

interface Props {
  gameId: string
}

export function CommentSection({ gameId }: Props) {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold">댓글 (0)</h3>
      </div>
      
      {/* 껍데기 입력 폼 */}
      <div className="flex flex-col gap-3">
        <textarea 
          placeholder="로그인하고 댓글을 남겨보세요!" 
          className="w-full min-h-[100px] p-4 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary resize-none text-sm"
          disabled
        />
        <div className="flex justify-end">
          <button disabled className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium opacity-50">
            등록
          </button>
        </div>
      </div>

      {/* 빈 상태 */}
      <div className="py-10 text-center text-muted-foreground flex flex-col items-center justify-center gap-2">
        <MessageSquare className="w-8 h-8 opacity-20" />
        <p className="text-sm">아직 등록된 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</p>
      </div>
    </div>
  )
}
