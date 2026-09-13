import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
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
      console.error("API Route Supabase Insert Error:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    const resultId = data && data.length > 0 ? data[0].id : null
    
    if (!resultId) {
      return NextResponse.json({ success: false, error: "결과는 저장되었으나 ID를 반환받지 못했습니다." }, { status: 500 })
    }

    return NextResponse.json({ success: true, resultId })
  } catch (error: any) {
    console.error("API Route POST error:", error)
    return NextResponse.json({ success: false, error: error?.message || "알 수 없는 오류" }, { status: 500 })
  }
}
