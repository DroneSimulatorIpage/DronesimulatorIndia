import { Plan } from '../types';

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free Basic Plan',
    price: 0,
    billing: ' /1 day Free',
    features: [
      '<strong>Available Drones-5</strong>: Agriculture Drone, Racing Drone, DJI Mavic, DJI Matrice 350 RTK, Crystalball Model V',
      '<strong>Permitted Zones-6 (Advanced)</strong>: RPTO Ground, Agriculture, City, Rail-Road-Canal-Bridge, HV Lines & Solar Panel, Factory',
      'Free Flight, Drawing & Automation Modes'
    ],
    buttonText: 'Start Free',
    buttonVariant: 'secondary',
    mostPopular: false,
    stripe_price_id: 'price_1RcJttCKYG7gRDVPBkHPkocp'
  },
  {
    id: 'Student',
    name: 'Student Plan',
    price: 9.99,
    originalPrice: 99.99,
    billing: 'USD per year ($99.99) (90% Off)',
    features: [
      'Available Drones-3: Agriculture Drone, DJI Mavic, Crystalball Model V',
      'Permitted Zones-3: (Standard): RPTO Ground, Agriculture, Rail-Road-Canal-Bridge',
      'Free Flight, Drawing & Automation modes',
      'Only .edu or .ac emails are allowed.',

    ],
    buttonText: 'Add to Cart',
    buttonVariant: 'primary',
    mostPopular: false,
    stripe_price_id: 'price_1ReFCPCKYG7gRDVPCr3307yG'
  },
  {
    id: 'zone',
    name: 'Zone Plan',
    price: 34.99,
    originalPrice: 119.99,
    billing: 'USD per Zone/year ($119.99) (80% Off)',
    features: [
      'Available Drones-5: Agriculture Drone, Racing Drone, DJI Mavic, DJI Matrice 350 RTK, Crystalball Model V',
      'Permitted Zones-6 (Advanced): Any one Zone from RPTO Ground, Agriculture, City, Rail-Road-Canal-Bridge, HV Lines & Solar Panel, Factory',
      'Free Flight, Drawing & Automation Modes',

    ],
    buttonText: 'Add to Cart',
    buttonVariant: 'primary',
    mostPopular: false,
    stripe_price_id: ''
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 99.99,
    billing: 'USD per year',
    features: [
      'Available Drones-5: Agriculture Drone, Racing Drone, DJI Mavic, DJI Matrice 350 RTK, Crystalball Model V',
      'Permitted Zones-6 (Advanced): RPTO Ground, Agriculture, City, Rail-Road-Canal-Bridge, HV Lines & Solar Panel, Factory',
      'Free Flight, Drawing & Automation Modes',

    ],
    buttonText: 'Add to Cart',
    buttonVariant: 'primary',
    mostPopular: true,
    stripe_price_id: 'price_1ReFBMCKYG7gRDVPSE55nhzo'
  },
  {
    id: 'institution',
    name: 'Enterprise Plan',
    price: 29000,
    billing: ' USD per year',
    features: [
      'Available Drones-6: Agriculture Drone, Racing Drone, DJI Mavic, DJI Matrice 350 RTK, Crystalball Model V, including Fighter-VTOL',
      'Permitted Zones-7 (Advanced): RPTO Ground, Agriculture, City, Rail-Road-Canal-Bridge, HV Lines & Solar Panel, Factory, Defence',
      'Advanced Scenario Customization',
      'Admin Panel & Monitoring',
      'Bulk Certificate Generation',
      'Analytics Included',
      'Module-Based Pricing'
    ],
    buttonText: 'Contact Us',
    buttonVariant: 'secondary',
    mostPopular: false,
    stripe_price_id: 'price_1RcJttCKYG7gRDVPBkHPkocp'
  },
];

export default plans;