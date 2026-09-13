"use server"

import { createClient } from "@/lib/supabase/server"

interface GameResultPayload {
  topic_id: string
  total_questions: number
  known_count: number
  predicted_age_group: string
  dopamine_title: string
}

export async function saveGameResult(payload: GameResultPayload) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // UUID 검증 및 폴백
    let validTopicId = payload.topic_id
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(validTopicId)) {
      validTopicId = '22222222-2222-2222-2222-222222222222'
    }

    const { data, error } = await supabase.from('game_results').insert({
      topic_id: validTopicId,
      user_id: user?.id || null,
      total_questions: payload.total_questions,
      known_count: payload.known_count,
      predicted_age_group: payload.predicted_age_group,
      dopamine_title: payload.dopamine_title
    }).select()

    if (error) {
      console.error("Server Action Supabase Insert Error:", error)
      return { success: false, error: error.message }
    }

    const resultId = data && data.length > 0 ? data[0].id : null
    
    if (!resultId) {
      return { success: false, error: "결과는 저장되었으나 ID를 반환받지 못했습니다." }
    }

    return { success: true, resultId }
  } catch (error: any) {
    console.error("Server Action saveGameResult error:", error)
    return { success: false, error: error?.message || "알 수 없는 오류" }
  }
}
