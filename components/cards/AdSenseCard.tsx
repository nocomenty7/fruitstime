interface AdSenseCardProps {
  slotId?: string; // 추후 실제 애드센스 슬롯 ID 주입
}

export function AdSenseCard({ slotId }: AdSenseCardProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border border-dashed flex items-center justify-center">
        {/* 추후 이곳에 <ins className="adsbygoogle" /> 코드 배치 */}
        <div className="flex flex-col items-center justify-center text-muted-foreground">
          <span className="text-xs font-medium uppercase tracking-wider mb-1">Advertisement</span>
          <span className="text-sm opacity-50">Ad Slot {slotId || "Placeholder"}</span>
        </div>
      </div>
      <div className="flex px-1">
        <h3 className="text-sm font-medium leading-tight text-muted-foreground/70">
          스폰서
        </h3>
      </div>
    </div>
  );
}
