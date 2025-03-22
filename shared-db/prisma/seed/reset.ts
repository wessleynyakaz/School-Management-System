import { prisma } from './prisma'

export async function resetDb() {
    await prisma.user.deleteMany()
    await prisma.assignment.deleteMany()
    await prisma.resource.deleteMany()
    await prisma.parent.deleteMany()
    await prisma.verificationToken.deleteMany()
}
