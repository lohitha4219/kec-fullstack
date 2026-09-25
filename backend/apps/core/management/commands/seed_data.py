from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db import transaction

from apps.academics.models import Notice, Result, TimetableEntry
from apps.accounts.models import Department
from apps.attendance.models import AttendanceRecord
from apps.events.models import Event
from apps.faculty.models import Faculty
from apps.hostel.models import Complaint, Room
from apps.library.models import Book, IssuedBook
from apps.students.models import Student

User = get_user_model()


class Command(BaseCommand):
    help = 'Seeds the database with sample data matching the frontend demo (idempotent).'

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write('Seeding Kuppam Engineering College — Smart Campus data...')

        # --- Superuser / admin -------------------------------------------------
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin', email='admin@kec.edu', password='admin12345', role='admin',
                first_name='Admin', last_name='User',
            )
            self.stdout.write(self.style.SUCCESS('  Created admin user (admin / admin12345)'))

        # --- Departments -------------------------------------------------
        dept_data = [
            ('CSE', 'Computer Science & Engineering', 'Dr. K. Ramesh'),
            ('ECE', 'Electronics & Communication Engineering', 'Dr. Sunitha Rao'),
            ('MECH', 'Mechanical Engineering', 'Dr. B. Prasad'),
            ('CIVIL', 'Civil Engineering', 'Dr. M. Lakshmi'),
            ('EEE', 'Electrical & Electronics Engineering', 'Dr. S. Kumar'),
        ]
        depts = {}
        for code, name, hod in dept_data:
            dept, _ = Department.objects.get_or_create(code=code, defaults={'name': name, 'hod_name': hod})
            depts[code] = dept

        # --- Faculty -------------------------------------------------
        faculty_data = [
            ('F201', 'Dr. K. Ramesh', 'CSE', 'Professor', 'ramesh.k@kec.edu', '9123400021'),
            ('F202', 'Dr. Sunitha Rao', 'ECE', 'Associate Professor', 'sunitha.r@kec.edu', '9123400022'),
            ('F203', 'Mr. Arjun Das', 'MECH', 'Assistant Professor', 'arjun.d@kec.edu', '9123400023'),
            ('F204', 'Ms. Lavanya Iyer', 'CSE', 'Assistant Professor', 'lavanya.i@kec.edu', '9123400024'),
        ]
        for staff_id, name, dept_code, designation, email, phone in faculty_data:
            user, created = User.objects.get_or_create(
                username=staff_id.lower(),
                defaults={'email': email, 'role': 'faculty', 'first_name': name.split()[-1]},
            )
            if created:
                user.set_password('faculty12345')
                user.save()
            Faculty.objects.get_or_create(
                staff_id=staff_id,
                defaults={
                    'user': user, 'name': name, 'department': depts[dept_code],
                    'designation': designation, 'email': email, 'phone': phone,
                },
            )

        # --- Students -------------------------------------------------
        student_data = [
            ('S101', 'Ananya Reddy', 'CSE', '3rd', 'ananya.r@kec.edu', '9876500011', 'Active'),
            ('S102', 'Rohit Varma', 'ECE', '2nd', 'rohit.v@kec.edu', '9876500012', 'Active'),
            ('S103', 'Sneha Kumari', 'CSE', '4th', 'sneha.k@kec.edu', '9876500013', 'Active'),
            ('S104', 'Vikram Singh', 'MECH', '1st', 'vikram.s@kec.edu', '9876500014', 'Inactive'),
            ('S105', 'Priya Nair', 'CSE', '3rd', 'priya.n@kec.edu', '9876500015', 'Active'),
        ]
        students = {}
        for roll, name, dept_code, year, email, phone, status in student_data:
            user, created = User.objects.get_or_create(
                username=roll.lower(),
                defaults={'email': email, 'role': 'student', 'first_name': name.split()[0]},
            )
            if created:
                user.set_password('student12345')
                user.save()
            student, _ = Student.objects.get_or_create(
                roll_number=roll,
                defaults={
                    'user': user, 'name': name, 'department': depts[dept_code], 'year': year,
                    'email': email, 'phone': phone, 'status': status,
                },
            )
            students[roll] = student

        # --- Attendance (yesterday's records) -------------------------------------------------
        yesterday = date.today() - timedelta(days=1)
        statuses = ['Present', 'Present', 'Absent', 'Present', 'Late']
        for (roll, *_), status in zip(student_data, statuses):
            AttendanceRecord.objects.get_or_create(
                student=students[roll], date=yesterday, defaults={'status': status},
            )

        # --- Notices -------------------------------------------------
        notice_data = [
            ('Mid-Semester Exams Timetable Released', 'Academics'),
            ('Annual Tech Fest — Registrations Open', 'Events'),
            ('Library Hours Extended During Exam Week', 'Library'),
            ('Hostel Fee Payment Deadline: Oct 5', 'Hostel'),
        ]
        for title, category in notice_data:
            Notice.objects.get_or_create(title=title, defaults={'category': category})

        # --- Results (for Ananya Reddy) -------------------------------------------------
        result_data = [
            ('Data Structures', 28, 62, 'A'),
            ('Operating Systems', 24, 55, 'B+'),
            ('DBMS', 27, 58, 'A'),
            ('Computer Networks', 22, 50, 'B'),
        ]
        for subject, internal, external, grade in result_data:
            Result.objects.get_or_create(
                student=students['S101'], subject=subject,
                defaults={'internal_marks': internal, 'external_marks': external, 'grade': grade},
            )

        # --- Timetable (CSE 3rd year) -------------------------------------------------
        timetable_data = [
            ('Monday', ['DS', 'OS', 'DBMS', 'Break', 'CN', 'Lab', 'Lab']),
            ('Tuesday', ['OS', 'DS', 'CN', 'Break', 'DBMS', 'Elective', 'Sports']),
            ('Wednesday', ['DBMS', 'CN', 'DS', 'Break', 'OS', 'Lab', 'Lab']),
            ('Thursday', ['CN', 'OS', 'DBMS', 'Break', 'DS', 'Elective', 'Library']),
            ('Friday', ['DS', 'DBMS', 'OS', 'Break', 'CN', 'Seminar', 'Seminar']),
        ]
        for day, slots in timetable_data:
            for period, subject in enumerate(slots, start=1):
                TimetableEntry.objects.get_or_create(
                    department=depts['CSE'], year='3rd', day=day, period=period,
                    defaults={'subject': subject},
                )

        # --- Library -------------------------------------------------
        book_data = [
            ('B001', 'Introduction to Algorithms', 'Cormen et al.', 4, 3),
            ('B002', 'Operating System Concepts', 'Silberschatz', 3, 0),
            ('B003', 'Database System Concepts', 'Korth', 5, 5),
            ('B004', 'Computer Networking', 'Kurose & Ross', 2, 1),
        ]
        books = {}
        for isbn, title, author, copies, available in book_data:
            book, _ = Book.objects.get_or_create(
                isbn=isbn, defaults={'title': title, 'author': author, 'copies': copies, 'available': available},
            )
            books[isbn] = book

        IssuedBook.objects.get_or_create(
            book=books['B002'], student=students['S101'],
            defaults={'due_date': date.today() - timedelta(days=1), 'status': 'Overdue'},
        )
        IssuedBook.objects.get_or_create(
            book=books['B001'], student=students['S103'],
            defaults={'due_date': date.today() + timedelta(days=7), 'status': 'Issued'},
        )

        # --- Hostel -------------------------------------------------
        room_a101, _ = Room.objects.get_or_create(room_number='A-101', defaults={'block': 'Block A', 'capacity': 2})
        room_a101.occupants.set([students['S101'], students['S105']])
        room_a102, _ = Room.objects.get_or_create(room_number='A-102', defaults={'block': 'Block A', 'capacity': 2})
        room_a102.occupants.set([students['S103']])
        room_b201, _ = Room.objects.get_or_create(room_number='B-201', defaults={'block': 'Block B', 'capacity': 3})
        room_b201.occupants.set([students['S102'], students['S104']])
        Room.objects.get_or_create(room_number='B-202', defaults={'block': 'Block B', 'capacity': 3})

        Complaint.objects.get_or_create(
            room=room_a101, student=students['S101'],
            issue='Leaking tap in bathroom', defaults={'status': 'Pending'},
        )
        Complaint.objects.get_or_create(
            room=room_b201, student=students['S102'],
            issue='Wi-Fi not working', defaults={'status': 'Resolved'},
        )

        # --- Events -------------------------------------------------
        event_data = [
            ('TechnoVerse 2026 — Annual Tech Fest', date(2026, 10, 12), 'Main Auditorium', 'Fest'),
            ('Workshop: Cloud Computing with AWS', date(2026, 10, 2), 'Seminar Hall 2', 'Workshop'),
            ('Inter-College Cricket Tournament', date(2026, 9, 28), 'Sports Ground', 'Sports'),
        ]
        for name, ev_date, venue, category in event_data:
            Event.objects.get_or_create(name=name, defaults={'date': ev_date, 'venue': venue, 'category': category})

        self.stdout.write(self.style.SUCCESS('Done. Sample data is ready.'))
        self.stdout.write('  Admin login:    admin / admin12345')
        self.stdout.write('  Faculty login:  f201 / faculty12345 (etc.)')
        self.stdout.write('  Student login:  s101 / student12345 (etc.)')
