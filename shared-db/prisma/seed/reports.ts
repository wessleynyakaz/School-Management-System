import { prisma } from './prisma'

export async function createReport(userId: string) {
    await prisma.report.createMany({
        data: [
            {
                date: new Date('2023-11-28'),
                subject: 'Mathematics',
                acquiredMark: 85,
                fullMark: 100,
                comment: 'Good performance',
                userId: userId,
            },
            {
                date: new Date('2023-11-29'),
                subject: 'Science',
                acquiredMark: 92,
                fullMark: 95,
                comment: 'Excellent work',
                userId: userId,
            },
            {
                date: new Date('2023-11-30'),
                subject: 'History',
                acquiredMark: 78,
                fullMark: 90,
                comment: 'Satisfactory',
                userId: userId,
            },
            {
                date: new Date('2023-12-01'),
                subject: 'English',
                acquiredMark: 95,
                fullMark: 100,
                comment: 'Outstanding',
                userId: userId,
            },
            {
                date: new Date('2023-12-02'),
                subject: 'Computer Science',
                acquiredMark: 88,
                fullMark: 92,
                comment: 'Well done',
                userId: userId,
            },
            {
                date: new Date('2023-12-03'),
                subject: 'Art',
                acquiredMark: 97,
                fullMark: 98,
                comment: 'Exceptional creativity',
                userId: userId,
            },
            {
                date: new Date('2023-12-04'),
                subject: 'Geography',
                acquiredMark: 82,
                fullMark: 85,
                comment: 'Great effort',
                userId: userId,
            },
            {
                date: new Date('2023-12-05'),
                subject: 'Physical Education',
                acquiredMark: 90,
                fullMark: 100,
                comment: 'Excellent performance',
                userId: userId,
            },
            {
                date: new Date('2023-12-06'),
                subject: 'Music',
                acquiredMark: 79,
                fullMark: 80,
                comment: 'Talented',
                userId: userId,
            },
            {
                date: new Date('2023-12-07'),
                subject: 'Economics',
                acquiredMark: 84,
                fullMark: 88,
                comment: 'Strong understanding',
                userId: userId,
            },
        ],
    })
}
