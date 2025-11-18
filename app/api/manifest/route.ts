import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    miniapp: {
      version: '1',
      name: 'Farcaster Stats',
      iconUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://v0-test-1deb.vercel.app'}/icon.jpg`,
      homeUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://v0-test-1deb.vercel.app',
      splashImageUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://v0-test-1deb.vercel.app'}/icon.jpg`,
      splashBackgroundColor: '#8B5CF6',
      subtitle: 'Статистика профиля',
      description: 'Просмотр статистики вашего профиля Farcaster: посты, подписчики, динамика роста и активность по месяцам.',
      primaryCategory: 'social',
      tags: ['statistics', 'analytics', 'profile', 'social', 'growth'],
      tagline: 'Отслеживайте рост вашего профиля',
    },
  }

  return NextResponse.json(manifest)
}
