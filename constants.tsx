
import React from 'react';

export const COLORS = {
  primary: '#967BB6', // Romantic Lavender
  secondary: '#5D3954', // Deep Plum
  background: '#F9F7FD', // Lavender Mist White
  accent: '#DCD0FF', // Pale Lavender
  textDark: '#4B3F52', 
  textLight: '#8E7F96',
};

// Gambar latar belakang lavender spesifik dari demo
export const GLOBAL_BACKGROUND = 'https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:e391cbafd7785bc8e124e5239e57ed26/directUpload/image-4.jpg';

export const BRIDE = {
  name: 'Nunung Setiani',
  nickname: 'Nunung',
  fullName: 'Nunung Setiani',
  father: 'Bpk. Wahyono',
  mother: 'Ibu Sriyatun',
  instagram: '@_.nnungs10',
  image: 'https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:fb198157ef08b469928b379ecfb55c5a/directUpload/IMG-20260203-WA0018.jpg.jpeg'
};

export const GROOM = {
  name: 'Rohmat Nur Ikhsan',
  nickname: 'Ikhsan',
  fullName: 'Rohmat Nur Ikhsan',
  father: 'Bpk. Amat Slamet',
  mother: 'Ibu Rokhimi',
  instagram: '@rohmatnurikhsann',
  image: 'https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:30842ef973ebdfdee0d8dbf7047a03ac/directUpload/IMG-20260203-WA0015.jpg.jpeg'
};

export const COUPLE_PHOTO = 'https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:56ebba0f489b9b8043039bac010fe6bb/directUpload/w.jpeg';

export const HERO_PHOTO = 'https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:b46a3711caa46fd5c60eff310ac141d3/directUpload/ee.jpeg';

export const WEDDING_DATE = new Date('2026-03-26T08:00:00');

// Fix: Added STORY_TIMELINE export which was missing
export const STORY_TIMELINE = [
  {
    year: '2022',
    title: 'Awal Pertemuan',
    description: 'Tuhan mempertemukan kami dalam sebuah jalinan silaturahmi yang tidak terduga, membawa rasa nyaman sejak awal.',
    image: 'https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:01b7d63abd1b6ee898429393185e46b6/directUpload/IMG-20260117-WA0011.jpg.jpeg'
  },
  {
    year: '2024',
    title: 'Khitbah',
    description: 'Kami memutuskan untuk melangkah ke jenjang yang lebih serius dengan restu kedua orang tua, mengikat janji pertunangan.',
    image: 'https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:1eaff29bbfd296c85a0bc75124a42af5/directUpload/asli.jpeg'
  },
  {
    year: '2026',
    title: 'Pernikahan',
    description: 'InsyaAllah, hari ini kami akan mengikat janji suci seumur hidup dalam ikatan pernikahan yang barokah.',
    image: 'https://ml5dafx6yq9i.i.optimole.com/w:auto/h:auto/q:auto/id:56ebba0f489b9b8043039bac010fe6bb/directUpload/w.jpeg'
  }
];

export const EVENTS = [
  {
    type: 'Akad Nikah' as const,
    date: 'Kamis, 26 Maret 2026',
    time: '08:00 - Selesai WIB',
    location: 'Rumah Mempelai Wanita',
    address: 'jl. Masjid An-nur Rt.01 Rw.02 dk.Dokanjati',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=-6.863268532681651,109.5506296368519',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d495.1534880081348!2d109.5506296368519!3d-6.863268532681651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1770099197954!5m2!1sid!2sid'
  },
  {
    type: 'Resepsi' as const,
    date: 'Kamis, 26 Maret 2026',
    time: '09:00 - Selesai WIB',
    location: 'Rumah Mempelai Wanita',
    address: 'jl. Masjid An-nur Rt.01 Rw.02 dk.Dokanjati',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=-6.863268532681651,109.5506296368519',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d495.1534880081348!2d109.5506296368519!3d-6.863268532681651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1770099197954!5m2!1sid!2sid'
  }
];
