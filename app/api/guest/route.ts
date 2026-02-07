import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'
import { getSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await getSession()
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { name } = body

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            )
        }

        // Generate slug from name
        // 1. Lowercase
        // 2. Replace spaces with dashes
        // 3. Remove non-alphanumeric chars (except dashes)
        let baseSlug = name.trim().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

        // Ensure slug isn't empty (fallback to 'guest')
        if (!baseSlug) {
            baseSlug = 'guest'
        }

        let slug = baseSlug
        let isUnique = false

        while (!isUnique) {
            const existing = await prisma.guest.findUnique({
                where: { slug }
            })

            if (!existing) {
                isUnique = true
            } else {
                // If conflict, append 4 random chars
                const suffix = nanoid(4)
                slug = `${baseSlug}-${suffix}`
            }
        }

        // Create guest
        const guest = await prisma.guest.create({
            data: {
                name: name.trim(),
                slug
            }
        })

        return NextResponse.json({
            success: true,
            guest: {
                id: guest.id,
                name: guest.name,
                slug: guest.slug,
                link: `/undangan/${guest.slug}`
            }
        })
    } catch (error) {
        console.error('Error creating guest:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        // Check authentication
        const session = await getSession()
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const guests = await prisma.guest.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json({
            success: true,
            guests: guests.map(g => ({
                id: g.id,
                name: g.name,
                slug: g.slug,
                link: `/undangan/${g.slug}`,
                createdAt: g.createdAt,
                openedAt: g.openedAt
            }))
        })
    } catch (error) {
        console.error('Error fetching guests:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
