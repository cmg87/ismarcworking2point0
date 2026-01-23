
import { SocialLink } from './types';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'events',
    name: 'Events',
    url: 'https://curatedevents.com/charlotte/',
    icon: 'fa-solid fa-calendar-days',
    color: 'hover:text-amber-500'
  },
  {
    id: 'starboyz',
    name: 'StarBoyz',
    url: 'https://www.starboyz.us',
    icon: 'fa-solid fa-star',
    color: 'hover:text-yellow-400'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/Habb0uche/',
    icon: 'fa-brands fa-instagram',
    color: 'hover:text-pink-500'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/habboucher',
    icon: 'fa-brands fa-facebook-f',
    color: 'hover:text-blue-600'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mhabbouche',
    icon: 'fa-brands fa-linkedin-in',
    color: 'hover:text-blue-500'
  }
];

export const CONTACT_ACTIONS = [
  {
    id: 'phone',
    name: 'Call Me',
    url: 'tel:2164049099',
    icon: 'fa-solid fa-phone',
    color: 'hover:text-emerald-400'
  },
  {
    id: 'email',
    name: 'Work Email',
    url: 'mailto:Mhabbouche@curatedevents.com',
    icon: 'fa-regular fa-envelope',
    color: 'hover:text-blue-400'
  }
];

export const MARC_DETAILS = {
  name: 'Marc Habbouche',
  role: 'Charlotte, NC',
  bio: 'I was born at a very young age',
  avatar: './marc.jpg',
  phone: '216-404-9099',
  email: 'Mhabbouche@curatedevents.com',
  website: 'https://www.ismarcworking.com',
  vcardUrl: 'https://video.chrisgoerler.com/contact.vcf'
};
