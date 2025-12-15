import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const proxy = async (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const authHeader = (await headers()).get('Authorization')

    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
