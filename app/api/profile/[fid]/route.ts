import { NextRequest, NextResponse } from 'next/server'

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY || 'NEYNAR_API_DOCS'

export async function GET(
  request: NextRequest,
  { params }: { params: { fid: string } }
) {
  const fid = params.fid

  try {
    // Fetch user data from Neynar API
    const userResponse = await fetch(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
      {
        headers: {
          'x-api-key': NEYNAR_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data')
    }

    const userData = await userResponse.json()
    const user = userData.users[0]

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Generate mock follower growth data (in production, you'd fetch historical data)
    const currentFollowers = user.follower_count
    const followerGrowth = [
      { month: 'Янв', count: Math.floor(currentFollowers * 0.65) },
      { month: 'Фев', count: Math.floor(currentFollowers * 0.72) },
      { month: 'Мар', count: Math.floor(currentFollowers * 0.80) },
      { month: 'Апр', count: Math.floor(currentFollowers * 0.88) },
      { month: 'Май', count: Math.floor(currentFollowers * 0.95) },
      { month: 'Июн', count: currentFollowers },
    ]

    // Generate mock activity data (in production, fetch actual cast counts)
    const activityData = [
      { month: 'Январь', posts: Math.floor(Math.random() * 50) + 20 },
      { month: 'Февраль', posts: Math.floor(Math.random() * 50) + 30 },
      { month: 'Март', posts: Math.floor(Math.random() * 50) + 25 },
      { month: 'Апрель', posts: Math.floor(Math.random() * 50) + 40 },
      { month: 'Май', posts: Math.floor(Math.random() * 50) + 35 },
      { month: 'Июнь', posts: Math.floor(Math.random() * 50) + 45 },
    ]

    const profileStats = {
      fid: user.fid,
      username: user.username,
      displayName: user.display_name,
      pfpUrl: user.pfp_url,
      postsCount: user.following_count, // Neynar doesn't provide post count directly
      followersCount: user.follower_count,
      followingCount: user.following_count,
      isSpam: user.power_badge === false && user.follower_count < 10, // Simple spam detection
      followerGrowth,
      activityData,
    }

    return NextResponse.json(profileStats)
  } catch (error) {
    console.error('Error fetching profile stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile stats' },
      { status: 500 }
    )
  }
}
