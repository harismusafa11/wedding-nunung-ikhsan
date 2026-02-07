
export interface GuestInfo {
  name: string;
  status: string;
}

export interface RSVPData {
  name: string;
  attendance: 'yes' | 'no';
  guests: number;
  message: string;
}

export interface StoryEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface EventDetail {
  type: 'Akad Nikah' | 'Resepsi';
  date: string;
  time: string;
  location: string;
  address: string;
  mapUrl: string;
  mapEmbedUrl?: string;
}
