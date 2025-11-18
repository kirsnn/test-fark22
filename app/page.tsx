'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FollowerChart } from '@/components/follower-chart'
import { ActivityChart } from '@/components/activity-chart'
import { StatCard } from '@/components/stat-card'
import { BarChart3, Users, MessageSquare, Shield, TrendingUp } from 'lucide-react'
import sdk from '@farcaster/frame-sdk'

interface ProfileStats {
  fid: number
  username: string
  displayName: string
  pfpUrl: string
  postsCount: number
  followersCount: number
  followingCount: number
  isSpam: boolean
  followerGrowth: { month: string; count: number }[]
  activityData: { month: string; posts: number }[]
}

export default function HomePage() {
  const [stats, setStats] = useState<ProfileStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)

  useEffect(() => {
    const initSDK = async () => {
      try {
        const context = await sdk.context
        console.log('[v0] Farcaster context:', context)
        
        if (context?.user?.fid) {
          // User is authenticated, load their stats
          await fetchProfileStats(context.user.fid)
        } else {
          // No authenticated user, show default profile (590993)
          await fetchProfileStats(590993)
        }
        
        setIsSDKLoaded(true)
        sdk.actions.ready()
      } catch (err) {
        console.log('[v0] SDK not available, loading default profile')
        // SDK not available (not in mini app), load default profile
        await fetchProfileStats(590993)
        setIsSDKLoaded(true)
      }
    }

    initSDK()
  }, [])

  const fetchProfileStats = async (fid: number) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/profile/${fid}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile data')
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      console.error('[v0] Error fetching profile:', err)
      setError('Не удалось загрузить данные профиля')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Загрузка статистики...</p>
        </div>
      </main>
    )
  }

  if (error || !stats) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Ошибка загрузки</h2>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <Button onClick={() => window.location.reload()}>
            Попробовать снова
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl p-4 py-8 space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <img 
              src={stats.pfpUrl || "/placeholder.svg"} 
              alt={stats.displayName}
              className="w-20 h-20 rounded-full border-2 border-primary/20"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-balance text-foreground">
                    {stats.displayName}
                  </h1>
                  <p className="text-muted-foreground">@{stats.username}</p>
                </div>
                {stats.isSpam ? (
                  <Badge variant="destructive" className="gap-1.5">
                    <Shield className="w-3 h-3" />
                    Спам
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1.5 bg-primary/10 text-primary border-primary/20">
                    <Shield className="w-3 h-3" />
                    Верифицирован
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Farcaster ID</p>
              <p className="text-3xl font-semibold tabular-nums text-foreground">{stats.fid}</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-primary" />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="Посты"
            value={stats.postsCount}
            icon={<MessageSquare className="w-5 h-5" />}
            className="bg-primary/5 border-primary/20"
          />
          <StatCard
            label="Подписчики"
            value={stats.followersCount}
            icon={<Users className="w-5 h-5" />}
            className="bg-primary/5 border-primary/20"
          />
        </div>

        <Card className="p-6 bg-primary/5 border-primary/20 space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">Динамика подписчиков</h2>
            <p className="text-sm text-muted-foreground">Рост за последние 6 месяцев</p>
          </div>
          <FollowerChart data={stats.followerGrowth} />
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Активность по месяцам</h2>
            </div>
            <p className="text-sm text-muted-foreground">Количество постов за период</p>
          </div>
          <ActivityChart data={stats.activityData} />
        </Card>

        {/* Footer */}
        <div className="pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Данные обновлены • Powered by Neynar
          </p>
        </div>
      </div>
    </main>
  )
}
