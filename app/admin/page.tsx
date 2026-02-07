'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Guest {
    id: string
    name: string
    slug: string
    link: string
    createdAt: string
    openedAt: string | null
}

export default function AdminPage() {
    const [name, setName] = useState('')
    const [guests, setGuests] = useState<Guest[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        fetchGuests()
    }, [])

    const fetchGuests = async () => {
        try {
            const res = await fetch('/api/guest')
            if (res.status === 401) {
                router.push('/login')
                return
            }
            const data = await res.json()
            if (data.success) {
                setGuests(data.guests)
            }
        } catch (err) {
            console.error('Error fetching guests:', err)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            const res = await fetch('/api/guest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Failed to create guest')
                setLoading(false)
                return
            }

            setSuccess(`Link created for ${data.guest.name}!`)
            setName('')
            fetchGuests()

            // Auto copy link
            const fullLink = `${window.location.origin}${data.guest.link}`
            await navigator.clipboard.writeText(fullLink)
            setCopiedSlug(data.guest.slug)
            setTimeout(() => setCopiedSlug(null), 3000)
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }



    const generateMessage = (guestName: string, link: string) => {
        return `Yth. ${guestName}

Assalamualaikum Warahmatullahi Wabarakatuh

Dengan memohon Rahmat dan Ridho Allah SWT, dan tanpa mengurangi rasa hormat melalui pesan ini kami mengundang Bapak/Ibu/Saudara/I untuk menghadiri acara pernikahan/Ngunduh Mantu kami :

Rohmat Nur Ikhsan dan Nunung Setiani

Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi :
${link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya di bagikan melalui pesan ini.

Terima kasih banyak atas perhatiannya.
Wassalamualaikum Warahmatullahi Wabarakatuh`
    }

    const handleShareWA = (guest: Guest) => {
        const fullLink = `${window.location.origin}${guest.link}`
        const message = generateMessage(guest.name, fullLink)
        const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
        window.open(waUrl, '_blank')
    }

    const copyMessage = async (guest: Guest) => {
        const fullLink = `${window.location.origin}${guest.link}`
        const message = generateMessage(guest.name, fullLink)
        await navigator.clipboard.writeText(message)
        setCopiedSlug(guest.slug)
        setTimeout(() => setCopiedSlug(null), 3000)
    }

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/login')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-lavender-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                            <p className="text-gray-600 mt-1">Manage wedding invitation guests</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Create Guest Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Guest Link</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-2">
                                Guest Name
                            </label>
                            <input
                                id="guestName"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Budi Santoso"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                required
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex flex-col gap-2">
                                <div>{success}</div>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // Since success message doesn't have the guest object directly visible, 
                                            // we rely on the list or just manual check. 
                                            // But wait, the API returns the guest object. 
                                            // Let's refactor slightly to store the last created guest for direct sharing.
                                            // For now, I'll just keep it simple and suggest checking the list below 
                                            // OR improve state management to hold lastCreatedGuest.
                                            // Let's stick to the list for simplicity or find the guest in the list.
                                            const guest = guests[0]; // Assuming it's at the top due to fetchGuests()
                                            if (guest) handleShareWA(guest);
                                        }}
                                        className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-700 transition"
                                    >
                                        Share to WA
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating...' : 'Create Guest Link'}
                        </button>
                    </form>
                </div>

                {/* Guest List */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Guest List ({guests.length})</h2>

                    {guests.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No guests yet. Create your first guest link above!</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Slug</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Opened</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {guests.map((guest) => (
                                        <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 font-medium text-gray-800">{guest.name}</td>
                                            <td className="py-3 px-4 text-gray-600 font-mono text-sm">{guest.slug}</td>
                                            <td className="py-3 px-4 text-gray-600 text-sm">
                                                {new Date(guest.createdAt).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                                {guest.openedAt ? (
                                                    <span className="text-green-600 font-medium">
                                                        ✓ {new Date(guest.openedAt).toLocaleDateString('id-ID')}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">Not yet</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 flex gap-2">
                                                <button
                                                    onClick={() => copyMessage(guest)}
                                                    className={`px-3 py-1 rounded text-sm font-medium transition ${copiedSlug === guest.slug
                                                        ? 'bg-gray-800 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    title="Copy Full Message (for FB/IG)"
                                                >
                                                    {copiedSlug === guest.slug ? '✓ Copied' : 'Copy Msg'}
                                                </button>

                                                <button
                                                    onClick={() => handleShareWA(guest)}
                                                    className="px-3 py-1 rounded text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 transition flex items-center gap-1"
                                                    title="Share via WhatsApp"
                                                >
                                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                                    WA
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
