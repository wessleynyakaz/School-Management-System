import { createAssignments } from './seed/assignments'
import { createUser } from './seed/user'
import { prisma } from './seed/prisma'
import { resetDb } from './seed/reset'
import { createBooks } from './seed/books'
import { createBookHistories } from './seed/bookHistroy'
import { createReport } from './seed/reports'
import { createEvents } from './seed/events'
import { createCharts } from './seed/charts'

resetDb()
    .then(() => console.log('Database successfully resetted ...'))
    .catch((e) => {
        throw e
    })
    .finally(async () => await prisma.$disconnect())

createEvents()
    .then(() => console.log('Events  seeded ...'))
    .catch((e) => {
        throw e
    })
    .finally(async () => await prisma.$disconnect())

createBooks()
    .then(() => console.log('Books  seeded ...'))
    .catch((e) => {
        throw e
    })
    .finally(async () => await prisma.$disconnect())

createAssignments()
    .then((assignments) => {
        console.log('Assignments and Resources seeded ...')
        createUser(assignments.count)
            .then((user) => {
                createCharts(user.id)
                    .then(() => console.log('Charts seeded ...'))
                    .catch((e) => {
                        throw e
                    })
                    .finally(async () => await prisma.$disconnect())
                createBookHistories(user.id)
                    .then(() => console.log('Book Histories seeded ...'))
                    .catch((e) => {
                        throw e
                    })
                    .finally(async () => await prisma.$disconnect())
                createReport(user.id)
                    .then(() => console.log('Reports seeded ...'))
                    .catch((e) => {
                        throw e
                    })
                    .finally(async () => await prisma.$disconnect())
                console.log('Student seeded ...')
            })
            .catch((e) => {
                throw e
            })
            .finally(async () => await prisma.$disconnect())
    })
    .catch((e) => {
        throw e
    })
    .finally(async () => await prisma.$disconnect())
