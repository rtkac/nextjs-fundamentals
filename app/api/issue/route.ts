import { db } from '@/db'
import { issues } from '@/db/schema'
import { getCurrentUser } from '@/lib/dal'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const issues = await db.query.issues.findMany({})
    return NextResponse.json({ data: issues })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Failed to fetch issues.' },
      { status: 500 },
    )
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const user = await getCurrentUser()
    const newIssueData = await req.json()

    const [newIssue] = await db
      .insert(issues)
      .values({ userId: user?.id, ...newIssueData })
      .returning()
    return NextResponse.json({ data: newIssue })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Failed to create issue.' },
      { status: 500 },
    )
  }
}
