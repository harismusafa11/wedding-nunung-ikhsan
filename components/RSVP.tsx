
import React, { useState, useEffect, useMemo } from 'react';
import ScrollReveal from './ScrollReveal';

interface Message {
  id: string;
  name: string;
  attendance: string;
  message: string;
  createdAt: string;
}

interface RSVPProps {
  guestName?: string;
}

const BotanicalCorner = ({ className = "" }: { className?: string }) => (
  <div className={`absolute w-20 h-20 pointer-events-none opacity-10 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" stroke="#5A4A42" strokeWidth="0.5" className="w-full h-full">
      <path d="M10,90 Q20,40 50,30 T90,10" />
      <path d="M15,85 Q25,50 45,40" />
      <circle cx="90" cy="10" r="1.5" fill="#5A4A42" />
    </svg>
  </div>
);

const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " tahun yang lalu";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " bulan yang lalu";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " hari yang lalu";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " jam yang lalu";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " menit yang lalu";

  return "Baru saja";
};

const RSVP: React.FC<RSVPProps> = ({ guestName }) => {
  const [form, setForm] = useState({ name: guestName || '', attendance: 'yes', message: '' });
  const [messages, setMessages] = useState<Message[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (guestName) {
      setForm(prev => ({ ...prev, name: guestName }));
    }
  }, [guestName]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const confirmedGuests = useMemo(() => {
    return messages.filter(m => m.attendance === 'yes').length;
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    setLoading(true);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        // Refresh messages
        await fetchMessages();
        setForm({ name: guestName || '', attendance: 'yes', message: '' });
        alert('Konfirmasi kehadiran dan doa Anda telah tersimpan. Terima kasih!');
      } else {
        alert('Gagal mengirim pesan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const showMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">


      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-10 -left-20 w-64 h-64 border-[1px] border-[#5A4A42] rounded-full"></div>
        <div className="absolute bottom-10 -right-20 w-80 h-80 border-[1px] border-[#5A4A42] rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block p-3 rounded-full bg-[#E6E2D6]/30 mb-2">
              <svg className="w-6 h-6 text-[#5A4A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
              </svg>
            </div>
            <h2 className="font-serif text-4xl text-[#5A4A42] tracking-tight">Presensi & Ucapan Doa</h2>
            <div className="w-12 h-[1px] bg-[#A89F91] mx-auto"></div>

            <div className="mt-4 inline-flex items-center gap-2 bg-white/60 border border-[#E6E2D6] px-4 py-2 rounded-full shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8F9E8B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8F9E8B]"></span>
              </span>
              <p className="text-[10px] font-sans font-bold text-[#5A4A42] uppercase tracking-wider">
                {confirmedGuests} Tamu Telah Konfirmasi Hadir
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <ScrollReveal animation="slide-right" delay={0.2} duration={1.5}>
              <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 relative overflow-hidden group paper-texture">
                <div className="inner-border-rsvp rounded-[2rem]"></div>
                <BotanicalCorner className="top-2 right-2 rotate-90" />
                <BotanicalCorner className="bottom-2 left-2 -rotate-90" />

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#A89F91] uppercase tracking-[0.2em] ml-1">Nama Lengkap</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white/50 border border-[#E6E2D6] rounded-2xl text-[#5A4A42] outline-none focus:ring-1 focus:ring-[#A89F91]/50 focus:border-[#A89F91] transition-all font-serif placeholder:text-[#A89F91]/50 shadow-sm"
                      placeholder="Contoh: Bpk. Ahmad"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#A89F91] uppercase tracking-[0.2em] ml-1">Konfirmasi Kehadiran</label>
                    <div className="relative">
                      <select
                        value={form.attendance}
                        onChange={e => setForm({ ...form, attendance: e.target.value })}
                        className="w-full px-5 py-3.5 bg-white/50 border border-[#E6E2D6] rounded-2xl text-[#5A4A42] outline-none appearance-none cursor-pointer focus:border-[#A89F91] transition-all font-serif shadow-sm"
                        disabled={loading}
                      >
                        <option value="yes">InsyaAllah Hadir</option>
                        <option value="no">Maaf, Berhalangan Hadir</option>
                        <option value="unsure">Masih Ragu-ragu</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#A89F91]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#A89F91] uppercase tracking-[0.2em] ml-1">Pesan & Doa Restu</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className="w-full px-5 py-3.5 bg-white/50 border border-[#E6E2D6] rounded-2xl text-[#5A4A42] outline-none focus:ring-1 focus:ring-[#A89F91]/50 focus:border-[#A89F91] resize-none font-serif placeholder:text-[#A89F91]/50 shadow-sm"
                      placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                      required
                      disabled={loading}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#5A4A42] hover:bg-[#3E332E] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.3em] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Mengirim...' : 'Kirim Pesan'}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <ScrollReveal animation="fade-up" delay={0.3}>
              <div className="flex items-center justify-between border-b border-[#E6E2D6] pb-4 mb-4">
                <h3 className="font-serif text-2xl text-[#5A4A42]">Ucapan Doa <span className="text-sm font-sans text-[#A89F91] ml-2">({messages.length})</span></h3>
              </div>
            </ScrollReveal>

            <div className="space-y-5">
              {fetching ? (
                <div className="text-center py-10 text-[#A89F91]">Mengambil data ucapan...</div>
              ) : messages.length === 0 ? (
                <div className="text-center py-10 bg-white/30 rounded-2xl border border-dashed border-[#A89F91]/30">
                  <p className="text-[#5A4A42] font-serif italic">Belum ada ucapan doa. Jadilah yang pertama!</p>
                </div>
              ) : (
                messages.slice(0, visibleCount).map((msg, idx) => (
                  <ScrollReveal key={msg.id || idx} animation="fade-up" delay={0.1} duration={0.8}>
                    <div className="group bg-white/50 hover:bg-white/70 backdrop-blur-sm border border-white/50 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-500 flex gap-5 items-start paper-texture relative overflow-hidden">
                      <div className="absolute inset-2 border border-[#A89F91]/5 rounded-[1.8rem] pointer-events-none"></div>
                      <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#E6E2D6] to-[#D1CBC1] flex items-center justify-center shadow-inner relative z-10 transition-transform group-hover:scale-110 duration-500">
                        <span className="text-[#5A4A42] font-serif font-bold text-lg">{msg.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 space-y-2 relative z-10">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-[#5A4A42] font-serif text-lg leading-none">{msg.name}</h4>
                            <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 
                                ${msg.attendance === 'yes' ? 'bg-[#8F9E8B]/20 text-[#6D7A69]' :
                                msg.attendance === 'no' ? 'bg-red-50 text-red-400' : 'bg-amber-50 text-amber-500'}`}>
                              <div className={`w-1 h-1 rounded-full 
                                  ${msg.attendance === 'yes' ? 'bg-[#8F9E8B]' :
                                  msg.attendance === 'no' ? 'bg-red-400' : 'bg-amber-400'}`}></div>
                              {msg.attendance === 'yes' ? 'Hadir' : msg.attendance === 'no' ? 'Berhalangan' : 'Masih Ragu'}
                            </div>
                          </div>
                          <span className="text-[9px] text-[#A89F91] font-sans uppercase tracking-widest opacity-60">{timeAgo(msg.createdAt)}</span>
                        </div>
                        <p className="text-[#6D6D6D] text-sm italic font-serif leading-relaxed">
                          "{msg.message}"
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))
              )}

              {visibleCount < messages.length && (
                <div className="text-center pt-4">
                  <button
                    onClick={showMore}
                    className="text-[10px] font-bold text-[#5A4A42] uppercase tracking-[0.3em] border-b border-[#5A4A42] pb-1 hover:opacity-60 transition-all active:scale-95"
                  >
                    Lihat Ucapan Lainnya
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
