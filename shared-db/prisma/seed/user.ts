import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
const fs = require('fs')
const img = fs.readFileSync(__dirname + '/img.webp')

const prisma = new PrismaClient()

export async function createUser(assignments: number) {
    const password = await hash('test', 12)
    const user = await prisma.user.create({
        data: {
            first_name: 'John',
            initial: 'J',
            last_name: 'Banda',
            gender: 'Male',
            religion: 'Christian',
            d_o_b: new Date(),
            address: '123 Main Street',
            id_no: '123',
            password: password,
            email: 'email@prisma.com',
            image: String(),
        },
    })
    for (let i = 0; i < assignments; i++) {
        await prisma.user.update({
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

    return user
}
