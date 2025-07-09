import { Scenario } from '../types';
import { Landmark } from "lucide-react";

const scenarios: Scenario[] = [
  {
    id: 1,
    name: 'RPTO Ground/Land Survey',
    description: 'Comprehensive RPTO training simulations covering real-world drone operations including takeoff, navigation, safety procedures, and mission execution in varied ground scenarios.',
    icon: 'school',
    image: '/images/scenarios/RPTOzone.jpeg',
    includedIn: ['pro', 'institution'],
    price: 499,
  },
  {
    id: 2,
    name: 'Agriculture Zone',
    description: 'Comprehensive agricultural drone simulations covering crop health analysis, field operations, spraying, and farm-level decision support to optimize yield and reduce resource use.',
    icon: 'wheat',
    image: '/images/scenarios/AgriZone.jpeg',
    includedIn: ['pro', 'institution'],
    price: 499,
  },
  {
    id: 3,
    name: 'Defense Zone',
    description: 'Comprehensive defense zone simulations focused on tactical drone operations, surveillance, reconnaissance, target tracking, and emergency mission handling in sensitive areas.',
    icon: 'shield',
    image: '/images/scenarios/Defencezone.jpeg',
    includedIn: ['pro', 'institution'],
    price: 499,
  },
  {
    id: 4,
    name: 'HT Line / Solar Panel / Windmills',
    description: 'Comprehensive simulations for drone-based inspection of power lines, solar farms, and wind turbines, ensuring energy asset reliability, maintenance planning, and safety checks.',
    icon: 'zap',
    image: '/images/scenarios/HVSOLARZone.jpeg',
    includedIn: ['pro', 'institution'],
    price: 499,
  },
  {
    id: 5,
    name: 'Factory/Pipeline/Chimney',
    description: 'Comprehensive industrial drone simulations covering pipeline inspection, factory surveillance, chimney checks, and fault detection for preventive maintenance and safety control.',
    icon: 'factory',
    image: '/images/scenarios/FactoryZone.jpeg',
    includedIn: ['pro', 'institution'],
    price: 499,
  },
  {
    id: 6,
    name: 'Canal/Bridge/Road & Railway',
    description: 'Comprehensive simulations for inspecting critical infrastructure including canals, bridges, roads, and railway lines, focusing on structural integrity and safety compliance.',
    icon: 'Train',
    image: '/images/scenarios/Roadinspectionzone.png',
    includedIn: ['pro', 'institution'],
    price: 499,
  },
  {
    id: 7,
    name: 'City/Asset Mapping',
    description: 'Comprehensive urban drone simulations for mapping city assets, inspecting high-rise structures, navigating complex environments, and supporting smart city planning and services.',
    icon: 'building',
    image: '/images/scenarios/Urbanplanningzone.jpeg',
    includedIn: ['pro', 'institution'],
    price: 499,
  },
];

export default scenarios;