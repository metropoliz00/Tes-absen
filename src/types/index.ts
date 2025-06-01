export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  password: string;
  profilePic?: string;
};

export type Student = User & {
  studentId: string;
  class: string;
  joinDate: string;
};

export type Admin = User & {
  adminId: string;
  position: string;
};

export type AttendanceRecord = {
  id: string;
  studentId: string;
  date: string;
  timeIn: string;
  timeOut: string | null;
  status: 'present' | 'absent' | 'late' | 'leave';
  notes?: string;
};

export type AttendanceStatus = {
  present: number;
  absent: number;
  late: number;
  leave: number;
  total: number;
};

export type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};