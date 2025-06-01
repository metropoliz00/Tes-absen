import React, { useState } from 'react';
import { format } from 'date-fns';
import { Student, AttendanceRecord } from '../types';
import { CheckCircle, X } from 'lucide-react';

interface AttendanceFormProps {
  students: Student[];
  onSubmit: (records: AttendanceRecord[]) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ students, onSubmit }) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const currentTime = format(new Date(), 'HH:mm:ss');
  
  const [date, setDate] = useState<string>(today);
  const [attendanceData, setAttendanceData] = useState<{ [key: string]: string }>({});
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendanceData({
      ...attendanceData,
      [studentId]: status
    });
  };

  const handleNotesChange = (studentId: string, note: string) => {
    setNotes({
      ...notes,
      [studentId]: note
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const records: AttendanceRecord[] = students.map(student => {
      const status = attendanceData[student.id] || 'absent';
      
      return {
        id: `${student.id}-${date}`,
        studentId: student.id,
        date,
        timeIn: status === 'present' || status === 'late' ? currentTime : '',
        timeOut: null,
        status: status as 'present' | 'absent' | 'late' | 'leave',
        notes: notes[student.id] || undefined
      };
    });
    
    // Simulate API delay
    setTimeout(() => {
      onSubmit(records);
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }, 800);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Mark Attendance
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Record attendance for all students.
        </p>
      </div>
      
      {submitted ? (
        <div className="p-8 flex flex-col items-center justify-center">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-1">Attendance Submitted</h3>
          <p className="text-gray-500">Attendance has been recorded successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="mb-6">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              max={today}
            />
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-md font-medium text-gray-900 mb-4">Students</h4>
            
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {student.profilePic && (
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full object-cover" src={student.profilePic} alt={student.name} />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-xs text-gray-500">{student.studentId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => handleAttendanceChange(student.id, 'present')}
                            className={`px-3 py-1 text-xs rounded-full ${
                              attendanceData[student.id] === 'present'
                                ? 'bg-green-100 text-green-800 ring-2 ring-green-500'
                                : 'bg-gray-100 text-gray-800 hover:bg-green-50'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAttendanceChange(student.id, 'absent')}
                            className={`px-3 py-1 text-xs rounded-full ${
                              attendanceData[student.id] === 'absent'
                                ? 'bg-red-100 text-red-800 ring-2 ring-red-500'
                                : 'bg-gray-100 text-gray-800 hover:bg-red-50'
                            }`}
                          >
                            Absent
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAttendanceChange(student.id, 'late')}
                            className={`px-3 py-1 text-xs rounded-full ${
                              attendanceData[student.id] === 'late'
                                ? 'bg-yellow-100 text-yellow-800 ring-2 ring-yellow-500'
                                : 'bg-gray-100 text-gray-800 hover:bg-yellow-50'
                            }`}
                          >
                            Late
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAttendanceChange(student.id, 'leave')}
                            className={`px-3 py-1 text-xs rounded-full ${
                              attendanceData[student.id] === 'leave'
                                ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-500'
                                : 'bg-gray-100 text-gray-800 hover:bg-blue-50'
                            }`}
                          >
                            Leave
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Add notes (optional)"
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={notes[student.id] || ''}
                          onChange={(e) => handleNotesChange(student.id, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AttendanceForm;