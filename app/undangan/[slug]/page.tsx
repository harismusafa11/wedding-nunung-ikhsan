import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import InvitationClient from './InvitationClient'

interface PageProps {
    params: {
        slug: string
    }
}

async function getGuest(slug: string) {
    try {
        const guest = await prisma.guest.findUnique({
            where: { slug }
        })
        return guest
    } catch (error) {
        console.error('Error fetching guest:', error)
        return null
    }
}

export default async function UndanganPage({ params }: PageProps) {
    const { slug } = params
    const guest = await getGuest(slug)

    if (!guest) {
        notFound()
    }

    return <InvitationClient guestName={guest.name} slug={slug} />
}
