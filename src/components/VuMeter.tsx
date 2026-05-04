'use client';

interface Props {
  volume: number; // 0-1
  active: boolean;
}

export default function VuMeter({ volume, active }: Props) {
  const bars = 12;
  const filledBars = active ? Math.round(volume * bars * 10) : 0;

  return (
    <div className="flex items-end gap-0.5 h-8" aria-label={`Niveau sonore: ${Math.round(volume * 100)}%`}>
      {Array.from({ length: bars }).map((_, i) => {
        const filled = i < filledBars;
        const isHigh = i >= bars * 0.75;
        const isMid = i >= bars * 0.5;
        let color = 'bg-emerald-400';
        if (isHigh) color = 'bg-red-400';
        else if (isMid) color = 'bg-yellow-400';
        const height = 30 + (i / bars) * 70;
        return (
          <div
            key={i}
            style={{ height: `${height}%` }}
            className={`w-1.5 rounded-sm transition-colors duration-75 ${
              filled ? color : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        );
      })}
    </div>
  );
}
