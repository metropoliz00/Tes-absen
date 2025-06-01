import React from 'react';
import { User, CheckCircle, AlertTriangle, Clock, Calendar } from 'lucide-react';
import { AttendanceStatus as StatusType } from '../types';

interface AttendanceStatusProps {
  status: StatusType;
}

const AttendanceStatus: React.FC<AttendanceStatusProps> = ({ status }) => {
  const { present, absent, late, leave, total } = status;
  
  const calculatePercentage = (value: number): number => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const presentPercentage = calculatePercentage(present);
  const absentPercentage = calculatePercentage(absent);
  const latePercentage = calculatePercentage(late);
  const leavePercentage = calculatePercentage(leave);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Present</p>
            <p className="text-2xl font-bold text-gray-900">{presentPercentage}%</p>
            <p className="text-xs text-gray-500">{present} days</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full" 
            style={{ width: `${presentPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Absent</p>
            <p className="text-2xl font-bold text-gray-900">{absentPercentage}%</p>
            <p className="text-xs text-gray-500">{absent} days</p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <User className="h-6 w-6 text-red-500" />
          </div>
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-red-500 h-2 rounded-full" 
            style={{ width: `${absentPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Late</p>
            <p className="text-2xl font-bold text-gray-900">{latePercentage}%</p>
            <p className="text-xs text-gray-500">{late} days</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <Clock className="h-6 w-6 text-yellow-500" />
          </div>
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-yellow-500 h-2 rounded-full" 
            style={{ width: `${latePercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Leave</p>
            <p className="text-2xl font-bold text-gray-900">{leavePercentage}%</p>
            <p className="text-xs text-gray-500">{leave} days</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Calendar className="h-6 w-6 text-blue-500" />
          </div>
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full" 
            style={{ width: `${leavePercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStatus;