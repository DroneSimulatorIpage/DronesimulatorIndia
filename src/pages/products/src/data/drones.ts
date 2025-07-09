import { Drone } from '../types';

const drones: Drone[] = [
  {
    id: 1,
    name: 'Agriculture Drone',
    description: 'Specialized for agricultural monitoring and spraying operations',
    image: '/images/drones/Agridrone.jpeg',
    includedIn: ['pro', 'institution'],
    price: 499,
  },
  {
    id: 2,
    name: 'DJI MATRICE 350 RTK',
    description: 'Enterprise-grade drone with RTK positioning for precise flight control',
    image: '/images/drones/DJIMatrice.jpeg',
    includedIn: ['pro', 'institution'],
    price: 499,
  },
  {
    id: 3,
    name: 'Racing Drone',
    description: 'High-speed drone designed for competitive racing and agility training',
    image: '/images/drones/FPV.png',
    includedIn: ['pro', 'institution'],
    price: 499,
  },
  {
    id: 4,
    name: 'VTOL-Fixed Wing',
    description: 'Vertical take-off and landing drone with advanced maneuverability',
    image: '/images/drones/Vtol.jpeg',
    includedIn: ['pro', 'institution'],
    price: 499,
  },
  {
    id: 5,
    name: 'Crystalball Model V',
    description: 'Compact and versatile drone perfect for beginners and intermediate users',
    image: '/images/drones/model-v.jpeg',
    includedIn: ['free', 'pro', 'institution'],
    price: 0,
  },
  {
    id: 6,
    name: 'DJI Mavic',
    description: 'Popular consumer drone with excellent camera quality and flight stability',
    image: '/images/drones/Mavic.jpeg',
    includedIn: ['free', 'pro', 'institution'],
    price: 0,
  },
];

export default drones;