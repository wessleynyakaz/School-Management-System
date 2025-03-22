import { prisma } from './prisma'

export async function createBookHistories(userId: string) {
    await prisma.bookHistroy.createMany({
        data: [
            {
                id: '1',
                userId: userId,
                bookId: '1',
                period: 10,
                borrowed: new Date('2023-01-01'),
                returned: new Date('2023-01-06'),
            },
            {
                id: '2',
                userId: userId,
                bookId: '2',
                period: 15,
                borrowed: new Date('2022-02-01'),
                returned: new Date('2023-01-01'),
            },
            {
                id: '3',
                userId: userId,
                bookId: '3',
                period: 7,
                borrowed: new Date('2023-08-07'),
                returned: new Date('2023-12-12'),
            },
        ],
    })
}
