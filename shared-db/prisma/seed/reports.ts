import { prisma } from './prisma'

export async function createReport(studentId: string, termId: string) {
    const report = await prisma.report.create({
        data: {
            studentId: studentId,
            termId: termId,
            entries: {
                create: [
                    {
                        subject: 'Mathematics',
                        acquiredMark: 85,
                        fullMark: 100,
                        comment: 'Good performance',
                    },
                    {
                        subject: 'Science',
                        acquiredMark: 92,
                        fullMark: 95,
                        comment: 'Excellent work',
                    },
                    {
                        subject: 'History',
                        acquiredMark: 78,
                        fullMark: 90,
                        comment: 'Satisfactory',
                    },
                    {
                        subject: 'English',
                        acquiredMark: 95,
                        fullMark: 100,
                        comment: 'Outstanding',
                    },
                    {
                        subject: 'Computer Science',
                        acquiredMark: 88,
                        fullMark: 92,
                        comment: 'Well done',
                    },
                    {
                        subject: 'Art',
                        acquiredMark: 97,
                        fullMark: 98,
                        comment: 'Exceptional creativity',
                    },
                    {
                        subject: 'Geography',
                        acquiredMark: 82,
                        fullMark: 85,
                        comment: 'Great effort',
                    },
                    {
                        subject: 'Physical Education',
                        acquiredMark: 90,
                        fullMark: 100,
                        comment: 'Excellent performance',
                    },
                    {
                        subject: 'Music',
                        acquiredMark: 79,
                        fullMark: 80,
                        comment: 'Talented',
                    },
                    {
                        subject: 'Economics',
                        acquiredMark: 84,
                        fullMark: 88,
                        comment: 'Strong understanding',
                    },
                ],
            },
        },
        include: {
            entries: true,
        },
    })

    return report
}
