import { useState, useCallback } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  registrationDate: string;
  lastLogin: string;
  usage: {
    simulationsThisMonth: number;
    totalSimulations: number;
    lastActivity: string;
  };
  addOns: {
    drawing: boolean;
    automation: boolean;
    analytics: boolean;
  };
  customPlan?: {
    selectedDrones: string[];
    selectedScenarios: string[];
    totalPrice: number;
  };
  paidAmount?: number;
  paymentDate?: string;
  nextPaymentDate?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  visibility: 'public' | 'hidden';
  userType: 'Student' | 'Pro' | 'Institution';
  activeUsers: number;
  color: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'Active' | 'Inactive';
  joinDate: string;
  lastLogin: string;
  activityCount: number;
}

export interface Annotation {
  id: string;
  userId: string;
  userName: string;
  adminName: string;
  changeType: 'plan-change' | 'status-change' | 'addon-change' | 'user-created' | 'custom-plan-change';
  changeSummary: string;
  timestamp: string;
  oldValue?: string;
  newValue?: string;
}

export interface IncomeRecord {
  id: string;
  userId: string;
  userName: string;
  plan: string;
  amount: number;
  date: string;
  paymentMethod: 'Stripe' | 'UPI' | 'Bank Transfer';
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface Drone {
  id: string;
  name: string;
  type: string;
  price: number;
  features: string[];
}

export interface Scenario {
  id: string;
  name: string;
  category: string;
  price: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

// Mock drones data
const mockDrones: Drone[] = [
  {
    id: '1',
    name: 'DJI Mavic Pro',
    type: 'Photography',
    price: 15,
    features: ['4K Camera', 'GPS Navigation', '27min Flight Time']
  },
  {
    id: '2',
    name: 'DJI Phantom 4',
    type: 'Professional',
    price: 20,
    features: ['4K Camera', 'Obstacle Avoidance', '30min Flight Time']
  },
  {
    id: '3',
    name: 'DJI Inspire 2',
    type: 'Cinematic',
    price: 35,
    features: ['5.2K Camera', 'Dual Operator', '27min Flight Time']
  },
  {
    id: '4',
    name: 'DJI Mini 2',
    type: 'Compact',
    price: 10,
    features: ['4K Camera', 'Ultra-light', '31min Flight Time']
  },
  {
    id: '5',
    name: 'DJI Air 2S',
    type: 'Advanced',
    price: 25,
    features: ['5.4K Camera', 'APAS 4.0', '31min Flight Time']
  },
  {
    id: '6',
    name: 'Racing Drone FPV',
    type: 'Racing',
    price: 18,
    features: ['High Speed', 'FPV Camera', 'Acrobatic Capable']
  }
];

// Mock scenarios data
const mockScenarios: Scenario[] = [
  {
    id: '1',
    name: 'Urban Navigation',
    category: 'Navigation',
    price: 12,
    difficulty: 'Intermediate',
    description: 'Navigate through complex urban environments'
  },
  {
    id: '2',
    name: 'Aerial Photography',
    category: 'Photography',
    price: 8,
    difficulty: 'Beginner',
    description: 'Master aerial photography techniques'
  },
  {
    id: '3',
    name: 'Search & Rescue',
    category: 'Emergency',
    price: 20,
    difficulty: 'Advanced',
    description: 'Emergency response and search operations'
  },
  {
    id: '4',
    name: 'Agricultural Survey',
    category: 'Agriculture',
    price: 15,
    difficulty: 'Intermediate',
    description: 'Crop monitoring and field analysis'
  },
  {
    id: '5',
    name: 'Infrastructure Inspection',
    category: 'Commercial',
    price: 25,
    difficulty: 'Advanced',
    description: 'Building and infrastructure assessment'
  },
  {
    id: '6',
    name: 'Racing Circuit',
    category: 'Racing',
    price: 10,
    difficulty: 'Intermediate',
    description: 'High-speed racing through obstacle courses'
  },
  {
    id: '7',
    name: 'Weather Simulation',
    category: 'Training',
    price: 18,
    difficulty: 'Advanced',
    description: 'Flying in various weather conditions'
  },

];

// Helper function to calculate next payment date
const getNextPaymentDate = (currentDate: string): string => {
  const date = new Date(currentDate);
  date.setMonth(date.getMonth() + 1);
  return date.toISOString().split('T')[0];
};

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'Pro',
    status: 'Active',
    registrationDate: '2024-01-15',
    lastLogin: '2 hours ago',
    usage: {
      simulationsThisMonth: 45,
      totalSimulations: 234,
      lastActivity: '2024-01-20 14:30'
    },
    addOns: {
      drawing: true,
      automation: false,
      analytics: true
    },
    paidAmount: 29,
    paymentDate: '2024-01-15',
    nextPaymentDate: '2024-02-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    plan: 'Free',
    status: 'Active',
    registrationDate: '2024-01-20',
    lastLogin: '1 day ago',
    usage: {
      simulationsThisMonth: 12,
      totalSimulations: 67,
      lastActivity: '2024-01-19 10:15'
    },
    addOns: {
      drawing: false,
      automation: false,
      analytics: false
    },
    paidAmount: 0,
    paymentDate: undefined,
    nextPaymentDate: undefined
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    plan: 'Enterprise',
    status: 'Inactive',
    registrationDate: '2024-01-10',
    lastLogin: '1 week ago',
    usage: {
      simulationsThisMonth: 0,
      totalSimulations: 156,
      lastActivity: '2024-01-13 16:45'
    },
    addOns: {
      drawing: true,
      automation: true,
      analytics: true
    },
    paidAmount: 499,
    paymentDate: '2024-01-10',
    nextPaymentDate: '2024-02-10'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@university.edu',
    plan: 'Institutional',
    status: 'Active',
    registrationDate: '2024-01-05',
    lastLogin: '3 hours ago',
    usage: {
      simulationsThisMonth: 78,
      totalSimulations: 289,
      lastActivity: '2024-01-20 11:20'
    },
    addOns: {
      drawing: true,
      automation: false,
      analytics: true
    },
    paidAmount: 199,
    paymentDate: '2024-01-05',
    nextPaymentDate: '2024-02-05'
  },
  {
    id: '5',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    plan: 'Custom',
    status: 'Active',
    registrationDate: '2024-01-12',
    lastLogin: '5 hours ago',
    usage: {
      simulationsThisMonth: 32,
      totalSimulations: 98,
      lastActivity: '2024-01-20 09:45'
    },
    addOns: {
      drawing: false,
      automation: true,
      analytics: false
    },
    customPlan: {
      selectedDrones: ['DJI Mavic Pro', 'DJI Air 2S'],
      selectedScenarios: ['Urban Navigation', 'Aerial Photography', 'Racing Circuit'],
      totalPrice: 85
    },
    paidAmount: 85,
    paymentDate: '2024-01-12',
    nextPaymentDate: '2024-02-12'
  },
  {
    id: '6',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    plan: 'Pro',
    status: 'Active',
    registrationDate: '2024-01-08',
    lastLogin: '1 hour ago',
    usage: {
      simulationsThisMonth: 56,
      totalSimulations: 178,
      lastActivity: '2024-01-20 16:10'
    },
    addOns: {
      drawing: true,
      automation: true,
      analytics: false
    },
    paidAmount: 29,
    paymentDate: '2024-01-08',
    nextPaymentDate: '2024-02-08'
  }
];

const mockPlans: Plan[] = [
  {
    id: '1',
    name: 'Demo',
    price: 0,
    features: ['1 simulation', 'No support'],
    visibility: 'public',
    userType: 'Student',
    activeUsers: 0,
    color: 'gray'
  },
  {
    id: '2',
    name: 'Basic',
    price: 9,
    features: ['10 simulations/month', 'Email support'],
    visibility: 'public',
    userType: 'Student',
    activeUsers: 0,
    color: 'green'
  },
  {
    id: '3',
    name: 'Pro',
    price: 29,
    features: ['Unlimited simulations', 'Priority support', 'Advanced scenarios'],
    visibility: 'public',
    userType: 'Pro',
    activeUsers: 0,
    color: 'blue'
  },
  {
    id: '4',
    name: 'Enterprise',
    price: 499,
    features: ['White-label', 'Custom integrations', 'API Access'],
    visibility: 'public',
    userType: 'Institution',
    activeUsers: 0,
    color: 'indigo'
  },
  {
    id: '5',
    name: 'Institutional',
    price: 199,
    features: ['Multi-user', 'Analytics', 'Custom scenarios'],
    visibility: 'public',
    userType: 'Institution',
    activeUsers: 0,
    color: 'purple'
  },
  {
    id: '6',
    name: 'Combo',
    price: 149,
    features: ['20 drones', 'All scenarios', 'Best value bundle'],
    visibility: 'public',
    userType: 'Pro',
    activeUsers: 0,
    color: 'orange'
  }
];

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    email: 's.wilson@dronesim.com',
    role: 'admin',
    status: 'Active',
    joinDate: '2023-06-15',
    lastLogin: '1 hour ago',
    activityCount: 234
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'm.chen@dronesim.com',
    role: 'editor',
    status: 'Active',
    joinDate: '2023-08-22',
    lastLogin: '3 hours ago',
    activityCount: 156
  }
];

const mockAnnotations: Annotation[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    adminName: 'Master Admin',
    changeType: 'plan-change',
    changeSummary: 'Plan changed from Free to Pro',
    timestamp: '2024-01-20 15:30',
    oldValue: 'Free',
    newValue: 'Pro'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    adminName: 'Sarah Wilson',
    changeType: 'addon-change',
    changeSummary: 'Added Analytics add-on',
    timestamp: '2024-01-19 11:20',
    oldValue: 'false',
    newValue: 'true'
  },
  {
    id: '3',
    userId: '4',
    userName: 'Sarah Wilson',
    adminName: 'Master Admin',
    changeType: 'plan-change',
    changeSummary: 'Plan changed from Pro to Institutional',
    timestamp: '2024-01-18 09:15',
    oldValue: 'Pro',
    newValue: 'Institutional'
  },
  {
    id: '4',
    userId: '5',
    userName: 'Alex Chen',
    adminName: 'Master Admin',
    changeType: 'custom-plan-change',
    changeSummary: 'Custom plan configured with 2 drones and 3 scenarios',
    timestamp: '2024-01-17 14:22',
    oldValue: 'Pro',
    newValue: 'Custom ($85/month)'
  }
];

const mockIncomeRecords: IncomeRecord[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    plan: 'Pro',
    amount: 29,
    date: '2024-01-15',
    paymentMethod: 'Stripe',
    status: 'Completed'
  },
  {
    id: '2',
    userId: '4',
    userName: 'Sarah Wilson',
    plan: 'Institutional',
    amount: 199,
    date: '2024-01-05',
    paymentMethod: 'Bank Transfer',
    status: 'Completed'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Mike Johnson',
    plan: 'Enterprise',
    amount: 499,
    date: '2024-01-10',
    paymentMethod: 'Stripe',
    status: 'Completed'
  },
  {
    id: '4',
    userId: '5',
    userName: 'Alex Chen',
    plan: 'Custom',
    amount: 85,
    date: '2024-01-12',
    paymentMethod: 'Stripe',
    status: 'Completed'
  },
  {
    id: '5',
    userId: '6',
    userName: 'Emma Davis',
    plan: 'Pro',
    amount: 29,
    date: '2024-01-08',
    paymentMethod: 'UPI',
    status: 'Completed'
  }
];

export const useData = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [annotations, setAnnotations] = useState<Annotation[]>(mockAnnotations);
  const [incomeRecords] = useState<IncomeRecord[]>(mockIncomeRecords);
  const [drones, setDrones] = useState<Drone[]>(mockDrones);
  const [scenarios, setScenarios] = useState<Scenario[]>(mockScenarios);

  const updateUser = useCallback((userId: string, updates: Partial<User>, adminName: string) => {
    setUsers(prev => {
      const updated = prev.map(user => {
        if (user.id === userId) {
          const updatedUser = { ...user, ...updates };
          
          // Create annotation for the change
          const annotation: Annotation = {
            id: Date.now().toString(),
            userId,
            userName: user.name,
            adminName,
            changeType: 'plan-change',
            changeSummary: `Updated user information`,
            timestamp: new Date().toISOString(),
          };
          
          setAnnotations(prev => [annotation, ...prev]);
          return updatedUser;
        }
        return user;
      });
      return updated;
    });
  }, []);

  const updateUserPlan = useCallback((userId: string, newPlan: string, adminName: string) => {
    setUsers(prev => {
      const updated = prev.map(user => {
        if (user.id === userId) {
          const currentDate = new Date().toISOString().split('T')[0];
          const nextPaymentDate = newPlan === 'Free' ? undefined : getNextPaymentDate(currentDate);
          
          const annotation: Annotation = {
            id: Date.now().toString(),
            userId,
            userName: user.name,
            adminName,
            changeType: 'plan-change',
            changeSummary: `Plan changed from ${user.plan} to ${newPlan}`,
            timestamp: new Date().toISOString(),
            oldValue: user.plan,
            newValue: newPlan
          };
          
          setAnnotations(prev => [annotation, ...prev]);
          return { 
            ...user, 
            plan: newPlan,
            paymentDate: newPlan === 'Free' ? undefined : currentDate,
            nextPaymentDate
          };
        }
        return user;
      });
      return updated;
    });
  }, []);

  const updateUserAddOns = useCallback((userId: string, addOns: User['addOns'], adminName: string) => {
    setUsers(prev => {
      const updated = prev.map(user => {
        if (user.id === userId) {
          const changes = Object.entries(addOns)
            .filter(([key, value]) => user.addOns[key as keyof User['addOns']] !== value)
            .map(([key, value]) => `${key}: ${value ? 'enabled' : 'disabled'}`)
            .join(', ');

          if (changes) {
            const annotation: Annotation = {
              id: Date.now().toString(),
              userId,
              userName: user.name,
              adminName,
              changeType: 'addon-change',
              changeSummary: `Add-ons updated: ${changes}`,
              timestamp: new Date().toISOString(),
            };
            
            setAnnotations(prev => [annotation, ...prev]);
          }
          
          return { ...user, addOns };
        }
        return user;
      });
      return updated;
    });
  }, []);

  const updateCustomPlan = useCallback((userId: string, customPlan: User['customPlan'], adminName: string) => {
    setUsers(prev => {
      const updated = prev.map(user => {
        if (user.id === userId) {
          const currentDate = new Date().toISOString().split('T')[0];
          const nextPaymentDate = getNextPaymentDate(currentDate);
          
          const annotation: Annotation = {
            id: Date.now().toString(),
            userId,
            userName: user.name,
            adminName,
            changeType: 'custom-plan-change',
            changeSummary: `Custom plan updated: ${customPlan?.selectedDrones.length} drones, ${customPlan?.selectedScenarios.length} scenarios ($${customPlan?.totalPrice})`,
            timestamp: new Date().toISOString(),
          };
          
          setAnnotations(prev => [annotation, ...prev]);
          return { 
            ...user, 
            customPlan,
            paidAmount: customPlan?.totalPrice || 0,
            paymentDate: currentDate,
            nextPaymentDate
          };
        }
        return user;
      });
      return updated;
    });
  }, []);

  const addPlan = useCallback((plan: Omit<Plan, 'id' | 'activeUsers'>) => {
    const newPlan: Plan = {
      ...plan,
      id: Date.now().toString(),
      activeUsers: 0
    };
    setPlans(prev => [...prev, newPlan]);
  }, []);

  const updatePlan = useCallback((planId: string, updates: Partial<Plan>) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId ? { ...plan, ...updates } : plan
    ));
  }, []);

  const addEmployee = useCallback((employee: Omit<Employee, 'id' | 'joinDate' | 'lastLogin' | 'activityCount'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      activityCount: 0
    };
    setEmployees(prev => [...prev, newEmployee]);
  }, []);

  const updateEmployee = useCallback((employeeId: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId ? { ...emp, ...updates } : emp
    ));
  }, []);

  const updateDronePrice = useCallback((droneId: string, newPrice: number) => {
    setDrones(prev => prev.map(drone => 
      drone.id === droneId ? { ...drone, price: newPrice } : drone
    ));
  }, []);

  const updateScenarioPrice = useCallback((scenarioId: string, newPrice: number) => {
    setScenarios(prev => prev.map(scenario => 
      scenario.id === scenarioId ? { ...scenario, price: newPrice } : scenario
    ));
  }, []);

  const addDrone = useCallback((drone: Omit<Drone, 'id'>) => {
    const newDrone: Drone = {
      ...drone,
      id: Date.now().toString()
    };
    setDrones(prev => [...prev, newDrone]);
  }, []);

  const addScenario = useCallback((scenario: Omit<Scenario, 'id'>) => {
    const newScenario: Scenario = {
      ...scenario,
      id: Date.now().toString()
    };
    setScenarios(prev => [...prev, newScenario]);
  }, []);

  return {
    users,
    plans,
    employees,
    annotations,
    incomeRecords,
    drones,
    scenarios,
    updateUser,
    updateUserPlan,
    updateUserAddOns,
    updateCustomPlan,
    addPlan,
    updatePlan,
    addEmployee,
    updateEmployee,
    updateDronePrice,
    updateScenarioPrice,
    addDrone,
    addScenario
  };
};