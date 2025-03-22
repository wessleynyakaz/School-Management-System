import { setBookImage } from './api/setBookImage'
import { prisma } from './prisma'

export async function createBooks() {
    await prisma.book.createMany({
        data: [
            {
                id: '1',
                name: 'Pemberton Mathematics',
                languages: ['English'],
                count: 4,
                image: await setBookImage('1', 'images/books/math.jpeg'),
            },
            {
                id: '2',
                name: 'Tri Colore',
                languages: ['English', 'French'],
                count: 50,
                image: await setBookImage('2', 'images/books/fr.jpeg'),
            },
            {
                id: '3',
                name: 'Chemistry Third Edition',
                languages: ['English'],
                available: false,
                count: 1,
                image: await setBookImage('3', 'images/books/chem.jpeg'),
            },
            {
                id: '4',
                name: 'Accounting Course Boook by Cathrine',
                languages: ['English'],
                available: false,
                count: 45,
                image: await setBookImage('4', 'images/books/acc.jpeg'),
            },
            {
                id: '5',
                name: 'FrankWood Accounting',
                languages: ['English'],
                count: 6,
                image: await setBookImage('5', 'images/books/frank.jpeg'),
            },
            {
                id: '6',
                name: 'Physics Fourth Edition by Tom Duncan',
                languages: ['English'],
                count: 2,
                image: await setBookImage('6', 'images/books/tom.jpeg'),
            },
            {
                id: '7',
                name: 'CPS Agriculture Form 1',
                languages: ['English'],
                count: 32,
                image: await setBookImage('7', 'images/books/cps.jpeg'),
            },
            {
                id: '8',
                name: "RedSpot O'Level English ",
                languages: ['English'],
                count: 1,
                image: await setBookImage('8', 'images/books/eng.jpeg'),
            },
            {
                id: '9',
                name: 'Biology Third Edition',
                languages: ['English'],
                count: 1,
                image: await setBookImage('9', 'images/books/bio.jpeg'),
            },
            {
                id: ' 10',
                name: 'Computer Science',
                languages: ['English'],
                count: 1,
                image: await setBookImage('10', 'images/books/cs.jpeg'),
            },
        ],
    })
}
