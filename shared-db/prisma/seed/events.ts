import { prisma } from './prisma'

export async function createEvents() {
    await prisma.events.createMany({
        data: [
            {
                name: 'Jakaranda Day',
                date: new Date('2024-02-04'),
                theme: 'Wear Purple Clothes',
                description:
                    'Various activities will be there, face painting,photoshoot, horse riding and color run',
            },
            {
                name: 'School Opening Day',
                date: new Date('2024-01-09'),
                theme: 'Make sure you have your Gate pass',
                description: 'School Assembly on 8:45 am ',
            },
            {
                name: 'Valentines Day',
                date: new Date('2024-02-14'),
                theme: 'Wear red and white',
                description:
                    'The event commneces at 11:00am. There activities are Truth or Dare. Music, Ballons and ice cream',
            },
            {
                name: 'Result Collection Day',
                date: new Date('2024-01-14'),
                theme: 'Bring your Clearance Form',
                description: 'Collecting starts at 8:00 and ends at 13:00',
            },
            {
                name: 'Trip| Eiffel Tower, Paris, France',
                date: new Date('2024-03-14'),
                theme: 'Wear scarf and a french hat',
                description:
                    'The trip cost about $2000 USD and will last for 5days',
            },
        ],
    })
}
