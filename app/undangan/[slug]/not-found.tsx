import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-lavender-50 px-4">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Undangan Tidak Ditemukan</h2>
                    <p className="text-gray-600">
                        Maaf, link undangan yang Anda cari tidak ditemukan.
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-md mx-auto">
                    <p className="text-sm text-gray-600 mb-4">
                        Pastikan Anda menggunakan link yang benar dari penyelenggara acara.
                    </p>
                    <p className="text-xs text-gray-500">
                        Jika Anda merasa ini adalah kesalahan, silakan hubungi penyelenggara acara.
                    </p>
                </div>
            </div>
        </div>
    )
}
