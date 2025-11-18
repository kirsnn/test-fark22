'use client'

interface FollowerChartProps {
  data: { month: string; count: number }[]
}

export function FollowerChart({ data }: FollowerChartProps) {
  const maxValue = Math.max(...data.map(d => d.count))
  
  return (
    <div className="space-y-4">
      <div className="h-48 flex items-end justify-between gap-2">
        {data.map((item, index) => {
          const height = (item.count / maxValue) * 100
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative group">
                <div 
                  className="w-full bg-primary/30 rounded-t-md transition-all duration-300 hover:bg-primary/50"
                  style={{ height: `${height}%`, minHeight: '8px' }}
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-lg">
                  {item.count.toLocaleString()}
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-medium">{item.month}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
