
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const BACKUP_GREETINGS = [
  "Terima kasih telah menjadi bagian dari kebahagiaan kami.",
  "Kehadiran Anda adalah doa restu yang paling indah bagi kami.",
  "Cinta tumbuh seiring berjalannya waktu, terima kasih telah hadir.",
  "Semoga kebahagiaan ini juga menyertai langkah Anda.",
  "Satu cinta, satu hati, satu tujuan. Terima kasih atas doa restunya."
];

export async function generateWeddingGreeting(guestName: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Tuliskan sebuah kata-kata mutiara pernikahan atau puisi pendek yang romantis untuk menyambut tamu bernama "${guestName}" di pernikahan Nunung dan Ikhsan. Gunakan bahasa Indonesia yang puitis dan hangat. Maksimal 3 kalimat.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });
    
    return response.text?.trim() || BACKUP_GREETINGS[0];
  } catch (error: any) {
    // Handle quota exceeded errors gracefully without spamming error console
    const isQuotaError = error?.code === 429 || error?.status === 429 || (error?.message && error.message.includes('429'));
    
    if (isQuotaError) {
       console.warn("Gemini API quota exceeded. Switching to offline backup greetings.");
    } else {
       console.error("Error generating greeting:", error);
    }
    
    // Return a random backup greeting
    const randomIndex = Math.floor(Math.random() * BACKUP_GREETINGS.length);
    return BACKUP_GREETINGS[randomIndex];
  }
}
