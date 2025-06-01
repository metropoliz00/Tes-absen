import React, { createContext, useState, useContext, useEffect } from 'react';
import { AttendanceRecord } from '../types';
import { attendanceRecords, getAttendanceByStudentId, getAttendanceByDate } from '../data/mockData';
import { format } from 'date-fns';

type AttendanceContextType = {
  records: AttendanceRecord[];
  todayRecords: AttendanceRecord[];
  markAttendance: (record: AttendanceRecord) => void;
  updateAttendance: (record: AttendanceRecord) => void;
  getStudentRecords: (studentId: string) => AttendanceRecord[];
  getDailyRecords: (date: string) => AttendanceRecord[];
};

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<AttendanceRecord[]>(attendanceRecords);
  const [todayRecords, setTodayRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Filter records for today
    const today = format(new Date(), 'yyyy-MM-dd');
    const todaysRecords = records.filter(record => record.date === today);
    setTodayRecords(todaysRecords);
  }, [records]);

  const markAttendance = (record: AttendanceRecord) => {
    setRecords(prevRecords => {
      // Check if record already exists
      const exists = prevRecords.some(r => 
        r.studentId === record.studentId && r.date === record.date
      );
      
      if (exists) {
        // Update existing record
        return prevRecords.map(r => 
          (r.studentId === record.studentId && r.date === record.date) 
            ? record 
            : r
        );
      } else {
        // Add new record
        return [...prevRecords, record];
      }
    });
  };

  const updateAttendance = (updatedRecord: AttendanceRecord) => {
    setRecords(prevRecords => 
      prevRecords.map(record => 
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
  };

  const getStudentRecords = (studentId: string) => {
    return getAttendanceByStudentId(studentId);
  };

  const getDailyRecords = (date: string) => {
    return getAttendanceByDate(date);
  };

  return (
    <AttendanceContext.Provider value={{ 
      records, 
      todayRecords,
      markAttendance, 
      updateAttendance,
      getStudentRecords,
      getDailyRecords
    }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = (): AttendanceContextType => {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};