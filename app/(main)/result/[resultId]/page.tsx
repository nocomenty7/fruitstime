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

  const { data: resultData } = await supabase
    .from('game_results')
    .select(`
      *,
      game_topics (
        title
      )
    `)
    .eq('id', resultId)
    .single()

  if (!resultData) {
    // 결과를 찾을 수 없음 (잘못된 접근)
    redirect("/")
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
