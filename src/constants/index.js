import { BotMessageSquare, BatteryCharging, Fingerprint, ShieldHalf, PlugZap, GlobeLock } from 'lucide-react';

import user1 from '../../public/assets/images/man_folding_hands.jpeg';
import user2 from '../../public/assets/images/man_looking_at_you.jpg';
import user3 from '../../public/assets/images/pexels-italo-melo-881954-2379005.jpg';
import user4 from '../../public/assets/profile-pictures/user5.jpg';
import user5 from '../../public/assets/profile-pictures/user4.jpg';
import user6 from '../../public/assets/profile-pictures/user2.jpg';

export const navItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#feature-section' },
  { label: 'Testimonials', href: '#testimonial-section' },
  // { label: 'Contact', href: '#' },
];

export const testimonials = [
  {
    user: 'David Reynolds',
    company: 'Software Engineer',
    image: user1,
    text: 'Partnering with Billions Forex was one of the best financial decisions I’ve made. I started with a small investment and now see steady daily profits.',
  },
  {
    user: 'Frank Gomez',
    company: 'Marketing Consultant',
    image: user2,
    text: 'I’ve tried a few trading platforms before, but none compare to Billions Forex. The profits are consistent, and withdrawals are instant. It feels great to finally invest with confidence.',
  },
  {
    user: 'Samuel Osei',
    company: 'Small Business Owner',
    image: user3,
    text: 'As a business owner, I wanted to grow my extra funds passively. Billions Forex delivered exactly that. Within weeks, I was seeing returns daily. Highly recommend!',
  },
  {
    user: 'Ronee Brown',
    company: 'Logistics Manager',
    image: user4,
    text: 'As a finance professional, I can confidently say Billions Forex is the real deal. I started small and now earn daily profits with ease. Withdrawals are fast and reliable',
  },
  {
    user: 'Michael Wilson',
    company: 'Visionary Creations',
    image: user5,
    text: 'At first I was skeptical, but after just one month with Billions Forex, I saw solid profits. Their platform is safe, the team is professional, and results are real.',
  },
  {
    user: 'Emily Davis',
    company: 'Registered Nurse',
    image: user6,
    text: 'I don’t have time to study forex, but Billions Forex made it easy for me to invest and earn without stress. The daily profits have been a game changer for my savings goals.',
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: 'High Returns on Investments',
    description:
            'Maximize your earnings with our expertly managed forex trading strategies. Invest confidently and enjoy consistent daily profits with ease.',
  },
  {
    icon: <Fingerprint />,
    text: 'Trusted Brokerage Services',
    description:
            'Partner with a reliable forex platform backed by transparency and expertise. Our trusted brokerage ensures secure, seamless, and profitable trading experiences.',
  },
  {
    icon: <ShieldHalf />,
    text: 'Expert Advice on Crypto',
    description:
            'Stay ahead in the crypto market with insights from seasoned professionals. Our expert guidance helps you make informed, profitable investment decisions.',
  },
  {
    icon: <BatteryCharging />,
    text: 'Daily Profits',
    description:
            'Enjoy consistent returns with our optimized trading strategies. We deliver reliable daily profits to grow your investment steadily over time.',
  },
  {
    icon: <PlugZap />,
    text: 'Instant Withdrawals',
    description:
            'Access your funds anytime with our fast and hassle-free withdrawal system. Enjoy full control and liquidity over your earnings, 24/7.',
  },
  {
    icon: <GlobeLock />,
    text: 'Safest Platform Ever',
    description:
            'Trade and invest with confidence on a platform built for security and trust. Your funds and data are protected with top-tier encryption and safety protocols.',
  },
];

export const checklistItems = [
  {
    title: 'Test investment',
    description:
            '9% to 12% profit in 15 days profit available everyday for withdrawal minimum 10$',
  },
  {
    title: 'Trade PRO investment',
    description:
            '25% to 30% profit in 30 days profit available everyday for withdrawal minimum 50$',
  },
  {
    title: 'Trade PREMIUM Investment',
    description:
            'Earn 40% to 48% profit in 40 days profit available everyday for withdrawal minimum 50$',
  },
  {
    title: 'Experience You Can Trust',
    description:
            'BillionsForexTrade is a leading cryptocurrency investment platform with a proven track record',
  },
];

export const pricingOptions = [
  {
    title: 'Test package',
    price: '$100',

    features: [
      '0.8% daily profit',
      '$10 withdrawal minimum',
      '9%-12% profit in 15 days',
      'Forex Payments - Weekdays',
      'Crypto Payments - Weekends ',
    ],
  },
  {
    title: 'Pro Package',
    price: '$500',
    features: [
      '1% daily profit',
      '$50 withdrawal minimum',
      '25%-30% profit in 30 days',
      'Forex Payments - Weekdays',
      'Crypto Payments - Weekends ',
    ],
  },
  {
    title: 'Premium Package',
    price: '$1000',
    features: [
      '1.2% daily profit',
      '$100 withdrawal minimum',
      '40%-48% profit in 40 days',
      'Forex Payments - Weekdays',
      'Crypto Payments - Weekends ',
    ],
  },
];

export const resourcesLinks = [
  { href: '#', text: 'Getting Started' },
  { href: 'https://t.me/+3zkJ4kGqeLRjMjBk', text: 'Community Forums' },
];

export const platformLinks = [
  { href: '#feature-section', text: 'Features' },
];
//login-section