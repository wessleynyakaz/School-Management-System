import { prisma } from './prisma'
const fs = require('fs')
const img = fs.readFileSync(__dirname + '/book_img.jpeg')

// TODO: add legible book images

export async function createBooks() {
    await prisma.book.createMany({
        data: [
            {
                id: '1',
                name: 'Pemberton Mathematics',
                languages: ['English'],
                count: 4,
                image: img,
            },
            {
                id: '2',
                name: 'Tri Colore',
                languages: ['English', 'French'],
                count: 50,
                image: img,
            },
            {
                id: '3',
                name: 'Chemistry Third Edition',
                languages: ['English'],
                available: false,
                count: 1,
                image: img,
            },
            {
                id: '4',
                name: 'Accounting Course Boook by Cathrine',
                languages: ['English'],
                available: false,
                count: 45,
                image: img,
            },
            {
                id: '5',
                name: 'FrankWood Accounting',
                languages: ['English'],
                count: 6,
                image: img,
            },
            {
                id: '6',
                name: 'Physics Fourth Edition by Tom Duncan',
                languages: ['English'],
                count: 2,
                image: img,
            },
            {
                id: '7',
                name: 'CPS Agriculture Form 1',
                languages: ['English'],
                count: 32,
                image: img,
            },
            {
                id: '8',
                name: "RedSpot O'Level English ",
                languages: ['English'],
                count: 1,
                image: img,
            },
            {
                id: '9',
                name: 'Biology Redspot',
                languages: ['English'],
                count: 1,
                image: img,
            },
            {
                id: ' 10',
                name: 'English Redspot ',
                languages: ['English'],
                count: 1,
                image: img,
            },
        ],
    })
}
