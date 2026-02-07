import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const messages = await prisma.message.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json({
            success: true,
            messages
        })
    } catch (error) {
        console.error('Error fetching messages:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, message, attendance } = body

        if (!name || !message || !attendance) {
            return NextResponse.json(
                { error: 'Name, message and attendance are required' },
                { status: 400 }
            )
        }

        const newMessage = await prisma.message.create({
            data: {
                name,
                message,
                attendance
            }
        })

        return NextResponse.json({
            success: true,
            message: newMessage
        })
    } catch (error) {
        console.error('Error creating message:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
