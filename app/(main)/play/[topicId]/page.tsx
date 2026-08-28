import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { GamePlayClient } from "@/components/game/GamePlayClient"

// 서버 컴포넌트: 파라미터 파싱 및 DB 페칭
export default async function PlayPage({ 
  params,
  searchParams
}: { 
  params: { topicId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { topicId } = params
  
  // 파라미터 파싱
  const countParam = searchParams.count as string || "10"
  const targetCount = countParam === "unlimited" ? "unlimited" : parseInt(countParam, 10)
  
  const decadesParam = searchParams.decades as string || "90s,00s"
  const decades = decadesParam.split(",")

  const supabase = await createClient()

  // 1. Topic 정보 가져오기 (DB에 없으면 더미 타이틀 표출)
  let topicTitle = "추억의 학창시절 아이템"
  const { data: topicData } = await supabase
    .from('game_topics')
    .select('title')
    .eq('id', topicId)
    .single()
  
  if (topicData) {
    topicTitle = topicData.title
  } else {
    // 20개 더미 썸네일 중 하나를 클릭해서 들어온 경우 임의 텍스트
    topicTitle = "추억의 테스트" 
  }

  // 2. 문항 가져오기
  const { data: dbItems } = await supabase
    .from('game_items')
    .select('*')
    // 현재는 모든 topicId에 대해 공통된(1번 주제) 데이터를 뿌리거나 더미를 뿌려야 테스트가 수월함.
    // 만약 DB에 매칭되는 게 있다면 그걸 쓰고, 없다면 k1(첫번째 주제) 것을 끌어오자.
    .eq('topic_id', 'k1')
    .order('created_at', { ascending: false })

  let items = dbItems || []

  // 만약 DB에 아무것도 없다면 하드코딩 더미
  if (items.length === 0) {
    items = [
      {
        id: "m1",
        topic_id: topicId,
        title: "이 미니카, 골목길에서 어떻게 부르셨나요?",
        hint: "블랙모터 하나면 골목길 제패 가능했음",
        media_type: "image",
        media_url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop",
        target_decade: "90s",
        level: 1,
        created_at: new Date().toISOString()
      },
      {
        id: "m2",
        topic_id: topicId,
        title: "이 오프닝 노래, 어느 애니메이션일까요?",
        hint: null,
        media_type: "youtube",
        media_url: "https://www.youtube.com/watch?v=R97jEoh4n2g",
        target_decade: "90s",
        level: 2,
        created_at: new Date().toISOString()
      }
    ]
  }

  // 3. 문제 셔플 및 count 만큼 자르기
  // 실제 서비스라면 DB 쿼리(rpc 랜덤) 또는 서버단 배열 랜덤화 후 자름.
  const shuffled = [...items].sort(() => 0.5 - Math.random())
  const finalItems = targetCount === "unlimited" ? shuffled : shuffled.slice(0, targetCount)

  return (
    <div className="dark bg-[#121212] min-h-[calc(100vh-64px)] w-full flex flex-col items-center">
      {/* 
        Tailwind 'dark' 클래스를 강제 주입하여 이 라우트 내부에서는 
        항상 다크 테마 느낌이 나도록 하거나 
        bg-[#121212] 와 text-white 로 직접 통제합니다.
      */}
      <GamePlayClient 
        topicId={topicId}
        topicTitle={topicTitle}
        items={finalItems}
        targetCount={targetCount}
        decades={decades}
      />
    </div>
  )
}
