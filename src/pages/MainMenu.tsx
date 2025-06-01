import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, 
  Users, 
  BarChart, 
  User,
  Clock,
  Calendar,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const MainMenu: React.FC = () => {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  const menuItems = [
    {
      title: 'Dashboard',
      description: 'View attendance summary and statistics',
      icon: <BarChart size={24} className="text-blue-500" />,
      link: '/dashboard',
      color: 'bg-blue-50 hover:bg-blue-100',
      border: 'border-blue-200'
    },
    {
      title: 'Students',
      description: 'Manage students and view detailed profiles',
      icon: <Users size={24} className="text-indigo-500" />,
      link: '/students',
      color: 'bg-indigo-50 hover:bg-indigo-100',
      border: 'border-indigo-200',
      adminOnly: true
    },
    {
      title: 'Mark Attendance',
      description: 'Record daily attendance for students',
      icon: <ClipboardCheck size={24} className="text-green-500" />,
      link: '/attendance',
      color: 'bg-green-50 hover:bg-green-100',
      border: 'border-green-200',
      adminOnly: true
    },
    {
      title: 'My Profile',
      description: 'View and update your personal information',
      icon: <User size={24} className="text-purple-500" />,
      link: '/profile',
      color: 'bg-purple-50 hover:bg-purple-100',
      border: 'border-purple-200'
    },
    {
      title: 'Attendance History',
      description: 'View detailed attendance records',
      icon: <Calendar size={24} className="text-orange-500" />,
      link: '/history',
      color: 'bg-orange-50 hover:bg-orange-100',
      border: 'border-orange-200'
    },
    {
      title: 'Schedule',
      description: 'View class schedules and academic calendar',
      icon: <Clock size={24} className="text-cyan-500" />,
      link: '/schedule',
      color: 'bg-cyan-50 hover:bg-cyan-100',
      border: 'border-cyan-200'
    },
    {
      title: 'Settings',
      description: 'Configure application settings',
      icon: <Settings size={24} className="text-gray-500" />,
      link: '/settings',
      color: 'bg-gray-50 hover:bg-gray-100',
      border: 'border-gray-200',
      adminOnly: true
    },
    {
      title: 'Help & Support',
      description: 'Get assistance and view documentation',
      icon: <HelpCircle size={24} className="text-teal-500" />,
      link: '/help',
      color: 'bg-teal-50 hover:bg-teal-100',
      border: 'border-teal-200'
    }
  ];

  // Filter items based on user role
  const filteredMenuItems = menuItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Main Menu</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`relative rounded-lg border ${item.border} p-6 ${item.color} transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-md`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainMenu;