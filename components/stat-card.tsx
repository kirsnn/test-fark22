import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: number
  icon: React.ReactNode
  className?: string
}

export function StatCard({ label, value, icon, className }: StatCardProps) {
  return (
    <Card className={cn("p-4 border", className)}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{label}</span>
          <div className="text-primary">{icon}</div>
        </div>
        <p className="text-2xl font-semibold tabular-nums text-foreground">{value.toLocaleString()}</p>
      </div>
    </Card>
  )
}
