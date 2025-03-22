const fs = require('fs')
const path = require('path')
import { prisma } from './prisma'

// TODO: add legible book images

export async function createBooks() {
    const imagePath = path.join(__dirname, 'book_img.jpeg')
    const imageBuffer = fs.readFileSync(imagePath)

    // Create the "images" directory if it doesn't exist
    const imagesDir = path.join(__dirname, 'images')
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir)
    }

    // Store the image on the drive
    const imageSavePath = path.join(imagesDir, 'book_img.jpeg')
    fs.writeFileSync(imageSavePath, imageBuffer)

    await prisma.book.createMany({
        data: [
            {
                id: '1',
                name: 'Pemberton Mathematics',
                languages: ['English'],
                count: 4,
                image: 'book_img.jpeg',
            },
            {
                id: '2',
                name: 'Tri Colore',
                languages: ['English', 'French'],
                count: 50,
                image: 'book_img.jpeg',
            },
            {
                id: '3',
                name: 'Chemistry Third Edition',
                languages: ['English'],
                available: false,
                count: 1,
                image: 'book_img.jpeg',
            },
            {
                id: '4',
                name: 'Accounting Course Boook by Cathrine',
                languages: ['English'],
                available: false,
                count: 45,
                image: 'book_img.jpeg',
            },
            {
                id: '5',
                name: 'FrankWood Accounting',
                languages: ['English'],
                count: 6,
                image: 'book_img.jpeg',
            },
            {
                id: '6',
                name: 'Physics Fourth Edition by Tom Duncan',
                languages: ['English'],
                count: 2,
                image: 'book_img.jpeg',
            },
            {
                id: '7',
                name: 'CPS Agriculture Form 1',
                languages: ['English'],
                count: 32,
                image: 'book_img.jpeg',
            },
            {
                id: '8',
                name: "RedSpot O'Level English ",
                languages: ['English'],
                count: 1,
                image: 'book_img.jpeg',
            },
            {
                id: '9',
                name: 'Biology Redspot',
                languages: ['English'],
                count: 1,
                image: 'book_img.jpeg',
            },
            {
                id: ' 10',
                name: 'English Redspot ',
                languages: ['English'],
                count: 1,
                image: 'book_img.jpeg',
            },
        ],
    })
}
