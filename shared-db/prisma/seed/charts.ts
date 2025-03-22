import { prisma } from './prisma'

export async function createCharts(userId: string) {
    await prisma.chart.createMany({
        data: [
            {
                heading: '2024 IGCSE Exams',
                
            },
        ],
    })
}
