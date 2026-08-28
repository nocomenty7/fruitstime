import Image from "next/image"

interface MediaRendererProps {
  type?: 'image' | 'youtube' | 'video' | 'null' | null
  url?: string | null
  alt?: string
}

export function MediaRenderer({ type, url, alt }: MediaRendererProps) {
  if (!type || type === 'null' || !url) {
    return (
      <div className="w-full h-full bg-muted/20 flex items-center justify-center rounded-2xl">
        <span className="text-muted-foreground/50 font-medium">이미지가 없습니다</span>
      </div>
    )
  }

  if (type === 'image') {
    return (
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm">
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
    let videoId = ""
    try {
      const urlObj = new URL(url)
      if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v') || ""
      } else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1)
      }
    } catch (e) {}

    if (!videoId) {
      return <div className="p-4 bg-destructive/20 text-destructive text-sm rounded-xl">유효하지 않은 유튜브 링크입니다.</div>
    }

    return (
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm bg-black">
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
    <div className="p-4 bg-muted text-muted-foreground text-sm rounded-xl flex justify-center items-center h-full">
      지원하지 않는 미디어 타입입니다.
    </div>
  )
}
