import { createAssignments } from './seed/assignments';
import { createAttendance } from './seed/attendance';
import { createBooks } from './seed/books';
import { createCareers } from './seed/careers';
import { createCharts } from './seed/charts';
import { createClassRoom } from './seed/classroom';
import { createComplaints } from './seed/complaints';
import { createEvents } from './seed/events';
import { createLiveClasses } from './seed/live_classes';
import { createNotices } from './seed/notices';
import { createPerformance } from './seed/perfomance';
import { createPetitions } from './seed/pettions_and_complaints';
import { prisma } from './seed/prisma';
import { createQuizzes } from './seed/quizzes';
import { createReport } from './seed/reports';
import { resetDb } from './seed/reset';
import { createSubjectAttendency } from './seed/subjectAttendency';
import { createSubjects } from './seed/subjects';
import { createTeachers } from './seed/teachers';
import { createUser } from './seed/user';

async function main() {
    try {
        await resetDb();
        console.log('Database successfully resetted ...');

        await createQuizzes();
        console.log('Quizzes seeded ...');

        await createCareers();
        console.log('Careers seeded ...');

        await createEvents();
        console.log('Events seeded ...');

        await createBooks();
        console.log('Books seeded ...');

        const { teacher_ids, teacher_images } = await createTeachers();
        console.log('Teachers seeded ...');

        const subj_ids = await createSubjects(teacher_ids);
        console.log('Subjects seeded ...');

        await createLiveClasses(
            subj_ids.map((subj_id, index) => ({
                teacher_id: teacher_ids[index],
                subject_id: subj_id,
            }))
        );
        console.log('Live Classes seeded ...');

        const classRoomId = await createClassRoom();
        const assignments = await createAssignments(subj_ids, classRoomId);
        console.log('Assignments and Resources seeded ...');

        const { user, anomaly, meerus } = await createUser(assignments.count, classRoomId);
        console.log('Student seeded ...');

        await createPerformance(user.id);
        console.log('Performance seeded ...');

        const termId = await createAttendance(user.id);
        console.log('Class Attendance seeded ...');

        await createReport(user.id, termId);
        console.log('Reports seeded ...');

        await createSubjectAttendency(user.id, subj_ids);
        console.log('Subject Attendance seeded ...');

        await createComplaints(user.id);
        console.log('Complaints seeded ...');

        await createPetitions(user.id, anomaly, meerus);
        console.log('Petitions seeded ...');

        await createNotices(user.id, '5', teacher_images);
        console.log('Notices seeded ...');

        await createCharts(user.id, meerus);
        console.log('Charts seeded ...');
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
