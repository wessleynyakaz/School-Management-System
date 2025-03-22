import { AssignmentStatus, PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import { setProfilePicture } from './api/setProfilePic'
import { setBorrowedBook } from './borrowedBooks'
const path = require('path')
const prisma = new PrismaClient()

export async function createUser(assignments: number, classRoomId: string) {
    const password = await hash('test', 12)
    const user = await prisma.student.create({
        data: {
            first_name: 'John',
            initial: 'J',
            last_name: 'Banda',
            title: 'Head Boy',
            gender: 'Male',
            religion: 'Christian',
            d_o_b: new Date(),
            address: '123 Main Street',
            id_no: '123',
            password: password,
            email: 'email@prisma.com',
            image: String(),
            classRoomId: classRoomId,
        },
    })

    await prisma.student.update({
        where: {
            id: user.id,
        },
        data: {
            image: await setProfilePicture(
                user.id,
                path.join(__dirname, './images/whis.jpg'),
            ),
        },
    })
    const Meerus = await prisma.student.create({
        data: {
            first_name: 'Meerus',
            initial: 'C',
            last_name: 'Cooler',
            gender: 'Female',
            religion: 'Toaism',
            d_o_b: new Date(),
            address: '23 Main Street',
            id_no: '12',
            password: password,
            email: 'g@g.com',
            image: String(),
        },
    })
    for (let i = 0; i < assignments; i++) {
        await prisma.student.update({
            where: {
                email: user.email,
            },
            data: {
                assignments: {
                    connect: {
                        id: String(i + 1),
                    },
                },
            },
        })
    }
    const live_classes = await prisma.liveClass.findMany({
        select: {
            id: true,
        },
    })
    const users = await prisma.student.findMany()

    live_classes.forEach((klass) => {
        users.forEach(async (user) => {
            await prisma.student.update({
                where: {
                    email: user.email,
                },
                data: {
                    live_classes: {
                        connect: {
                            id: klass.id,
                        },
                    },
                },
            })
        })
    })
    const Anomaly = await prisma.student.create({
        data: {
            first_name: 'Anomaly',
            initial: 'l',
            last_name: 'an',
            gender: 'Female',
            religion: 'unknown',
            d_o_b: new Date(),
            address: '23 Main Street',
            id_no: '9',
            password: password,
            email: 'a@a.com',
            image: String(),
        },
    })

    await prisma.book
        .findMany({
            take: 6,
        })
        .then((books) =>
            books.forEach(async (book) => {
                await setBorrowedBook(book.id, user.id)
            }),
        )

    await prisma.assignment.update({
        where: {
            id: '1',
        },
        data: {
            resources: {
                connect: { id: '1' },
            },
            submissions: {
                create: {
                    studentId: user.id,
                    documents: ['test.worked'],
                    comment: 'Great Work',
                    daysTook: 1,
                    grade: 'A',
                    status: AssignmentStatus.MARKED,
                },
            },
        },
    })
    return {
        user: user,
        anomaly: Anomaly.id,
        meerus: Meerus.id,
    }
}
