import React from 'react';
import { Student, AttendanceStatus } from '../types';
import { CheckCircle, X, Clock, Calendar } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  attendanceStatus: AttendanceStatus;
  onClick?: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ 
  student, 
  attendanceStatus,
  onClick 
}) => {
  const { present, absent, late, leave, total } = attendanceStatus;
  
  // Calculate attendance percentage
  const attendancePercentage = total > 0
    ? Math.round((present / total) * 100)
    : 0;
    
  // Determine color based on percentage
  let statusColor = 'bg-green-500';
  if (attendancePercentage < 75) {
    statusColor = 'bg-red-500';
  } else if (attendancePercentage < 90) {
    statusColor = 'bg-yellow-500';
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <div className={`h-2 w-full ${statusColor}`}></div>
        <div className="p-5">
          <div className="flex items-center">
            {student.profilePic && (
              <img 
                src={student.profilePic} 
                alt={student.name}
                className="h-16 w-16 rounded-full object-cover mr-4"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
              <p className="text-sm text-gray-500">{student.studentId}</p>
              <p className="text-sm text-gray-500">{student.class}</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
            <div>
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-2">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
              </div>
              <p className="mt-1 font-medium text-gray-900">{present}</p>
              <p className="text-gray-500">Present</p>
            </div>
            
            <div>
              <div className="flex justify-center">
                <div className="rounded-full bg-red-100 p-2">
                  <X size={16} className="text-red-600" />
                </div>
              </div>
              <p className="mt-1 font-medium text-gray-900">{absent}</p>
              <p className="text-gray-500">Absent</p>
            </div>
            
            <div>
              <div className="flex justify-center">
                <div className="rounded-full bg-yellow-100 p-2">
                  <Clock size={16} className="text-yellow-600" />
                </div>
              </div>
              <p className="mt-1 font-medium text-gray-900">{late}</p>
              <p className="text-gray-500">Late</p>
            </div>
            
            <div>
              <div className="flex justify-center">
                <div className="rounded-full bg-blue-100 p-2">
                  <Calendar size={16} className="text-blue-600" />
                </div>
              </div>
              <p className="mt-1 font-medium text-gray-900">{leave}</p>
              <p className="text-gray-500">Leave</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">Attendance Rate</span>
              <span className="text-xs font-medium text-gray-700">{attendancePercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${statusColor}`} 
                style={{ width: `${attendancePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;