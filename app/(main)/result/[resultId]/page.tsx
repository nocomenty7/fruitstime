import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ResultClient } from "@/components/game/ResultClient"

export default async function ResultPage({ 
  params 
}: { 
  params: { resultId: string } 
}) {
  const { resultId } = params
  const supabase = await createClient()

  const { data: resultData, error } = await supabase
    .from('game_results')
    .select(`
      *,
      game_topics (
        title
      )
    `)
    .eq('id', resultId)
    .single()

  if (error || !resultData) {
    console.error("Result Fetch Error:", error, "resultId:", resultId)
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center p-6">
        <h2 className="text-2xl font-bold mb-4">결과를 불러올 수 없습니다.</h2>
        <p className="text-muted-foreground mb-4">
          데이터가 없거나 통신 오류가 발생했습니다.<br/>
          (에러 내용: {error?.message || '알 수 없는 오류'})
        </p>
        <a href="/" className="px-6 py-2 bg-orange-500 text-white rounded-xl inline-block mt-4">
          메인으로 돌아가기
        </a>
      </div>
    )
  }

  const topicTitle = resultData.game_topics?.title || "추억의 테스트"

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-background">
      <ResultClient 
        resultId={resultId}
        topicTitle={topicTitle}
        totalQuestions={resultData.total_questions}
        knownCount={resultData.known_count}
        predictedAgeGroup={resultData.predicted_age_group}
        dopamineTitle={resultData.dopamine_title}
      />
    </div>
  )
}
