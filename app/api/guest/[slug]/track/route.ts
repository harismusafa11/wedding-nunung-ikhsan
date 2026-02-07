import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params

        // Update openedAt if not already set
        await prisma.guest.updateMany({
            where: {
                slug,
                openedAt: null
            },
            data: {
                openedAt: new Date()
            }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error tracking guest opening:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
