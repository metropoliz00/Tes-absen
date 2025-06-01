import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { AttendanceRecord, Student } from '../types';
import { getStudentById } from '../data/mockData';
import { Check, X, Clock, Calendar } from 'lucide-react';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  onUpdate?: (record: AttendanceRecord) => void;
  isAdmin?: boolean;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ 
  records, 
  onUpdate,
  isAdmin = false
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check size={12} className="mr-1" />
            Present
          </span>
        );
      case 'absent':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X size={12} className="mr-1" />
            Absent
          </span>
        );
      case 'late':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={12} className="mr-1" />
            Late
          </span>
        );
      case 'leave':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Calendar size={12} className="mr-1" />
            Leave
          </span>
        );
      default:
        return null;
    }
  };

  const handleEditClick = (record: AttendanceRecord) => {
    setEditingRecord({ ...record });
  };

  const handleSaveClick = () => {
    if (editingRecord && onUpdate) {
      onUpdate(editingRecord);
      setEditingRecord(null);
    }
  };

  const handleCancelClick = () => {
    setEditingRecord(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (editingRecord) {
      setEditingRecord({
        ...editingRecord,
        [e.target.name]: e.target.value
      });
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {isAdmin && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Out</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            {isAdmin && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.length === 0 ? (
            <tr>
              <td colSpan={isAdmin ? 7 : 6} className="px-6 py-4 text-center text-sm text-gray-500">
                No attendance records found
              </td>
            </tr>
          ) : (
            records.map((record) => {
              const student = isAdmin ? getStudentById(record.studentId) : null;
              const isExpanded = expandedId === record.id;
              const isEditing = editingRecord?.id === record.id;
              
              return (
                <React.Fragment key={record.id}>
                  <tr className={`hover:bg-gray-50 ${isEditing ? 'bg-blue-50' : ''}`}>
                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {student?.profilePic && (
                            <div className="flex-shrink-0 h-8 w-8">
                              <img 
                                className="h-8 w-8 rounded-full object-cover" 
                                src={student.profilePic} 
                                alt={student.name} 
                              />
                            </div>
                          )}
                          <div className="ml-2">
                            <div className="text-sm font-medium text-gray-900">
                              {student?.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {student?.studentId}
                            </div>
                          </div>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {isEditing ? (
                        <input
                          type="date"
                          name="date"
                          className="w-full px-2 py-1 text-sm border rounded"
                          value={editingRecord.date}
                          onChange={handleChange}
                        />
                      ) : (
                        format(parseISO(record.date), 'MMM dd, yyyy')
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {isEditing ? (
                        <input
                          type="time"
                          name="timeIn"
                          className="w-full px-2 py-1 text-sm border rounded"
                          value={editingRecord.timeIn}
                          onChange={handleChange}
                        />
                      ) : (
                        record.timeIn || '—'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {isEditing ? (
                        <input
                          type="time"
                          name="timeOut"
                          className="w-full px-2 py-1 text-sm border rounded"
                          value={editingRecord.timeOut || ''}
                          onChange={handleChange}
                        />
                      ) : (
                        record.timeOut || '—'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <select
                          name="status"
                          className="w-full px-2 py-1 text-sm border rounded"
                          value={editingRecord.status}
                          onChange={handleChange}
                        >
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                          <option value="leave">Leave</option>
                        </select>
                      ) : (
                        getStatusBadge(record.status)
                      )}
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {isEditing ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSaveClick}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelClick}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditClick(record)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : record.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {isExpanded ? 'Hide' : 'Show'}
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan={isAdmin ? 7 : 6} className="px-6 py-4 bg-gray-50">
                        <div className="text-sm text-gray-700">
                          <div className="font-semibold mb-1">Notes:</div>
                          {isEditing ? (
                            <textarea
                              name="notes"
                              className="w-full px-2 py-1 text-sm border rounded"
                              value={editingRecord.notes || ''}
                              onChange={handleChange}
                              rows={3}
                            />
                          ) : (
                            <p>{record.notes || 'No notes provided.'}</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;