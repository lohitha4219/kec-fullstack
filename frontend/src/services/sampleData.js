export const students = [
  { id: 'S101', name: 'Ananya Reddy', dept: 'CSE', year: '3rd', email: 'ananya.r@kec.edu', phone: '9876500011', status: 'Active' },
  { id: 'S102', name: 'Rohit Varma', dept: 'ECE', year: '2nd', email: 'rohit.v@kec.edu', phone: '9876500012', status: 'Active' },
  { id: 'S103', name: 'Sneha Kumari', dept: 'CSE', year: '4th', email: 'sneha.k@kec.edu', phone: '9876500013', status: 'Active' },
  { id: 'S104', name: 'Vikram Singh', dept: 'MECH', year: '1st', email: 'vikram.s@kec.edu', phone: '9876500014', status: 'Inactive' },
  { id: 'S105', name: 'Priya Nair', dept: 'CSE', year: '3rd', email: 'priya.n@kec.edu', phone: '9876500015', status: 'Active' },
]

export const faculty = [
  { id: 'F201', name: 'Dr. K. Ramesh', dept: 'CSE', designation: 'Professor', email: 'ramesh.k@kec.edu', phone: '9123400021' },
  { id: 'F202', name: 'Dr. Sunitha Rao', dept: 'ECE', designation: 'Associate Professor', email: 'sunitha.r@kec.edu', phone: '9123400022' },
  { id: 'F203', name: 'Mr. Arjun Das', dept: 'MECH', designation: 'Assistant Professor', email: 'arjun.d@kec.edu', phone: '9123400023' },
  { id: 'F204', name: 'Ms. Lavanya Iyer', dept: 'CSE', designation: 'Assistant Professor', email: 'lavanya.i@kec.edu', phone: '9123400024' },
]

export const attendanceRecords = [
  { id: 'S101', name: 'Ananya Reddy', date: '2026-09-22', status: 'Present' },
  { id: 'S102', name: 'Rohit Varma', date: '2026-09-22', status: 'Present' },
  { id: 'S103', name: 'Sneha Kumari', date: '2026-09-22', status: 'Absent' },
  { id: 'S104', name: 'Vikram Singh', date: '2026-09-22', status: 'Present' },
  { id: 'S105', name: 'Priya Nair', date: '2026-09-22', status: 'Late' },
]

export const notices = [
  { id: 1, title: 'Mid-Semester Exams Timetable Released', date: '2026-09-18', category: 'Academics' },
  { id: 2, title: 'Annual Tech Fest — Registrations Open', date: '2026-09-15', category: 'Events' },
  { id: 3, title: 'Library Hours Extended During Exam Week', date: '2026-09-12', category: 'Library' },
  { id: 4, title: 'Hostel Fee Payment Deadline: Oct 5', date: '2026-09-10', category: 'Hostel' },
]

export const results = [
  { subject: 'Data Structures', internal: 28, external: 62, total: 90, grade: 'A' },
  { subject: 'Operating Systems', internal: 24, external: 55, total: 79, grade: 'B+' },
  { subject: 'DBMS', internal: 27, external: 58, total: 85, grade: 'A' },
  { subject: 'Computer Networks', internal: 22, external: 50, total: 72, grade: 'B' },
]

export const timetable = [
  { day: 'Monday', slots: ['DS', 'OS', 'DBMS', 'Break', 'CN', 'Lab', 'Lab'] },
  { day: 'Tuesday', slots: ['OS', 'DS', 'CN', 'Break', 'DBMS', 'Elective', 'Sports'] },
  { day: 'Wednesday', slots: ['DBMS', 'CN', 'DS', 'Break', 'OS', 'Lab', 'Lab'] },
  { day: 'Thursday', slots: ['CN', 'OS', 'DBMS', 'Break', 'DS', 'Elective', 'Library'] },
  { day: 'Friday', slots: ['DS', 'DBMS', 'OS', 'Break', 'CN', 'Seminar', 'Seminar'] },
]

export const books = [
  { id: 'B001', title: 'Introduction to Algorithms', author: 'Cormen et al.', copies: 4, available: 2 },
  { id: 'B002', title: 'Operating System Concepts', author: 'Silberschatz', copies: 3, available: 0 },
  { id: 'B003', title: 'Database System Concepts', author: 'Korth', copies: 5, available: 5 },
  { id: 'B004', title: 'Computer Networking', author: 'Kurose & Ross', copies: 2, available: 1 },
]

export const issuedBooks = [
  { bookId: 'B002', title: 'Operating System Concepts', studentId: 'S101', issueDate: '2026-09-01', dueDate: '2026-09-15', status: 'Overdue' },
  { bookId: 'B001', title: 'Introduction to Algorithms', studentId: 'S103', issueDate: '2026-09-10', dueDate: '2026-09-24', status: 'Issued' },
]

export const hostelRooms = [
  { room: 'A-101', block: 'Block A', capacity: 2, occupied: 2, occupants: ['Ananya Reddy', 'Priya Nair'] },
  { room: 'A-102', block: 'Block A', capacity: 2, occupied: 1, occupants: ['Sneha Kumari'] },
  { room: 'B-201', block: 'Block B', capacity: 3, occupied: 3, occupants: ['Rohit Varma', 'Vikram Singh', 'Arjun K.'] },
  { room: 'B-202', block: 'Block B', capacity: 3, occupied: 0, occupants: [] },
]

export const hostelComplaints = [
  { id: 1, room: 'A-101', issue: 'Leaking tap in bathroom', status: 'Pending', date: '2026-09-19' },
  { id: 2, room: 'B-201', issue: 'Wi-Fi not working', status: 'Resolved', date: '2026-09-14' },
]

export const events = [
  { id: 1, name: 'TechnoVerse 2026 — Annual Tech Fest', date: '2026-10-12', venue: 'Main Auditorium', category: 'Fest' },
  { id: 2, name: 'Workshop: Cloud Computing with AWS', date: '2026-10-02', venue: 'Seminar Hall 2', category: 'Workshop' },
  { id: 3, name: 'Inter-College Cricket Tournament', date: '2026-09-28', venue: 'Sports Ground', category: 'Sports' },
]

export const dashboardStats = {
  admin: [
    { label: 'Total Students', value: 1240 },
    { label: 'Total Faculty', value: 86 },
    { label: 'Attendance Today', value: '91%' },
    { label: 'Open Complaints', value: 7 },
  ],
  faculty: [
    { label: 'My Classes', value: 4 },
    { label: 'Students Assigned', value: 132 },
    { label: "Today's Attendance", value: '88%' },
    { label: 'Pending Grading', value: 12 },
  ],
  student: [
    { label: 'Attendance', value: '92%' },
    { label: 'Current CGPA', value: '8.6' },
    { label: 'Books Issued', value: 1 },
    { label: 'Upcoming Events', value: 3 },
  ],
}
