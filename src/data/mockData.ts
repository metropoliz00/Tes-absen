import { Student, Admin, AttendanceRecord } from '../types';
import { format } from 'date-fns';

export const students: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'password123',
    role: 'student',
    studentId: 'STU001',
    class: 'Class 10A',
    joinDate: '2023-09-01',
    profilePic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    password: 'password123',
    role: 'student',
    studentId: 'STU002',
    class: 'Class 10B',
    joinDate: '2023-09-01',
    profilePic: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    password: 'password123',
    role: 'student',
    studentId: 'STU003',
    class: 'Class 11A',
    joinDate: '2023-09-01',
    profilePic: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    password: 'password123',
    role: 'student',
    studentId: 'STU004',
    class: 'Class 11B',
    joinDate: '2023-09-01',
    profilePic: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '5',
    name: 'Daniel Wilson',
    email: 'daniel@example.com',
    password: 'password123',
    role: 'student',
    studentId: 'STU005',
    class: 'Class 12A',
    joinDate: '2023-09-01',
    profilePic: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
];

export const admins: Admin[] = [
  {
    id: '101',
    name: 'Prof. James Smith',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    adminId: 'ADM001',
    position: 'Principal',
    profilePic: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '102',
    name: 'Dr. Jennifer Taylor',
    email: 'jennifer@example.com',
    password: 'admin123',
    role: 'admin',
    adminId: 'ADM002',
    position: 'Vice Principal',
    profilePic: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

// Generate attendance records for the last 30 days
export const generateAttendanceRecords = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  
  // For each student
  students.forEach(student => {
    // For each of the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      // Random status
      const statusOptions: ('present' | 'absent' | 'late' | 'leave')[] = ['present', 'absent', 'late', 'leave'];
      const weights = [0.8, 0.1, 0.05, 0.05]; // 80% present, 10% absent, 5% late, 5% leave
      
      let randomValue = Math.random();
      let statusIndex = 0;
      let cumulativeWeight = 0;
      
      for (let j = 0; j < weights.length; j++) {
        cumulativeWeight += weights[j];
        if (randomValue <= cumulativeWeight) {
          statusIndex = j;
          break;
        }
      }
      
      const status = statusOptions[statusIndex];
      
      // Create record
      const record: AttendanceRecord = {
        id: `${student.id}-${format(date, 'yyyy-MM-dd')}`,
        studentId: student.id,
        date: format(date, 'yyyy-MM-dd'),
        timeIn: status === 'absent' ? '' : status === 'late' ? '09:15:00' : '08:30:00',
        timeOut: status === 'absent' ? null : '15:30:00',
        status: status,
        notes: status === 'leave' ? 'Medical leave' : undefined
      };
      
      records.push(record);
    }
  });
  
  return records;
};

export const attendanceRecords: AttendanceRecord[] = generateAttendanceRecords();

// Helper functions to get data
export const getStudentById = (id: string): Student | undefined => {
  return students.find(student => student.id === id);
};

export const getAttendanceByStudentId = (studentId: string): AttendanceRecord[] => {
  return attendanceRecords.filter(record => record.studentId === studentId);
};

export const getAttendanceByDate = (date: string): AttendanceRecord[] => {
  return attendanceRecords.filter(record => record.date === date);
};

export const getAttendanceStatus = (studentId: string): AttendanceStatus => {
  const records = getAttendanceByStudentId(studentId);
  
  const status: AttendanceStatus = {
    present: 0,
    absent: 0,
    late: 0,
    leave: 0,
    total: records.length
  };
  
  records.forEach(record => {
    status[record.status]++;
  });
  
  return status;
};