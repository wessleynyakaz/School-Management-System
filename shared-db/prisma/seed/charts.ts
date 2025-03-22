import { prisma } from './prisma'

export async function createCharts(studentId: string, meerusId: string) {
    await prisma.chart.create({
        data: {
            participants: {
                connect: [
                    {
                        id: studentId,
                    },
                    {
                        id: meerusId,
                    },
                ],
            },
        },
    })
}
