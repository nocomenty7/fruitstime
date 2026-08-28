import Image from "next/image"

interface MediaRendererProps {
  type?: 'image' | 'youtube' | 'video' | 'null' | null
  url?: string | null
  alt?: string
}

export function MediaRenderer({ type, url, alt }: MediaRendererProps) {
  if (!type || type === 'null' || !url) {
    return (
      <div className="w-full aspect-video bg-muted/20 flex items-center justify-center rounded-2xl border border-border/10">
        <span className="text-muted-foreground/50 font-medium">이미지가 없습니다</span>
      </div>
    )
  }

  if (type === 'image') {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-border/10 bg-black/40">
        <Image
          src={url}
          alt={alt || 'Game Item Media'}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>
    )
  }

  if (type === 'youtube') {
    // 유튜브 URL에서 비디오 ID 추출 (예: https://www.youtube.com/watch?v=XXXX 또는 https://youtu.be/XXXX)
    let videoId = ""
    try {
      const urlObj = new URL(url)
      if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v') || ""
      } else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1)
      }
    } catch (e) {
      // 파싱 에러 시 fallback
    }

    if (!videoId) {
      return <div className="p-4 bg-destructive/20 text-destructive text-sm rounded-xl">유효하지 않은 유튜브 링크입니다.</div>
    }

    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-border/10 bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    )
  }

  return (
    <div className="p-4 bg-muted text-muted-foreground text-sm rounded-xl flex justify-center items-center aspect-video">
      지원하지 않는 미디어 타입입니다.
    </div>
  )
}
