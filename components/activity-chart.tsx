'use client'

interface ActivityChartProps {
  data: { month: string; posts: number }[]
}

export function ActivityChart({ data }: ActivityChartProps) {
  const maxValue = Math.max(...data.map(d => d.posts))
  
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {data.map((item, index) => {
          const width = (item.posts / maxValue) * 100
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">{item.month}</span>
                <span className="text-foreground font-semibold tabular-nums">{item.posts}</span>
              </div>
              <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
