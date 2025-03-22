import { prisma } from './prisma'

export async function setBorrowedBook(bookId: string, studentId: string) {
    await prisma.borrowedBookData.create({
        data: {
            bookId: bookId,
            studentId: studentId,
        },
    })
}
