import { addDays, format } from 'date-fns'
import { prisma } from './prisma'
import { AssignmentStatus } from '@prisma/client'

export async function createAssignments(
    subj_ids: string[],
    classRoomId: string,
) {
    // Create resources
    const resources = await prisma.resource.createMany({
        data: [
            {
                id: '1',
                title: 'The Impact of Climate Change on Coastal Communities',
                category: 'Environmental Science',
                type: 'Article',
                description:
                    'An in-depth article discussing the effects of climate change on coastal communities and potential adaptation strategies.',
                link: 'https://www.nationalgeographic.com/environment/article/climate-change-impact-coastal-communities',
            },
            {
                id: '2',

                title: 'Introduction to Microeconomics',
                category: 'Economics',
                type: 'Video Lecture',
                description:
                    'A comprehensive video lecture series introducing the fundamental concepts of microeconomics and their real-world applications.',
                link: 'https://www.khanacademy.org/economics-finance-domain/microeconomics',
            },
            {
                id: '3',

                title: 'The Art of Renaissance Painting',
                category: 'Art History',
                type: 'Online Gallery',
                description:
                    'Explore a collection of Renaissance paintings and learn about the artistic techniques and cultural significance of this period.',
                link: 'https://www.metmuseum.org/toah/hd/renai/hd_renai.htm',
            },
            {
                id: '4',

                title: 'The Science of Human Nutrition',
                category: 'Nutritional Science',
                type: 'Research Paper',
                description:
                    'A research paper summarizing recent scientific findings on the impact of nutrition on human health and well-being.',
                link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4772067/',
            },
            {
                id: '5',

                title: 'Urban Planning and Sustainable Development',
                category: 'Urban Planning',
                type: 'Case Study',
                description:
                    'An analysis of a successful urban planning project focused on sustainable development and its positive impact on the community.',
                link: 'https://www.planning.org/research/sustainability/briefingpapers/sustainable.htm',
            },
        ],
    })

    // Create assignments
    const currentDate = new Date()
    const daysToAdd = Math.floor(Math.random() * 6) + 2 // Randomly select a number between 2 and 7
    const dateForAssignments = addDays(currentDate, daysToAdd)

    const assignments = await prisma.assignment.createMany({
        data: [
            {
                classroomId: classRoomId,
                id: '1',
                title: 'Research Paper on Climate Change Adaptation',
                subjectId: subj_ids[2],
                issuedDate: new Date(format(dateForAssignments, 'yyyy-MM-dd')),
                dueDate: new Date(
                    format(addDays(dateForAssignments, 10), 'yyyy-MM-dd'),
                ),
                description:
                    'Write a research paper exploring the challenges and opportunities for climate change adaptation in coastal communities.',
            },
            {
                classroomId: classRoomId,
                id: '2',
                title: 'Create a Django Project',
                subjectId: subj_ids[0],
                issuedDate: new Date(
                    format(addDays(currentDate, -4), 'yyyy-MM-dd'),
                ),
                dueDate: new Date(
                    format(addDays(currentDate, -2), 'yyyy-MM-dd'),
                ),
                description:
                    'Make an eCommerce website that can be used to sell cellphones',
            },
            {
                classroomId: classRoomId,
                id: '3',
                title: 'Art History Essay on Renaissance Masterpieces',
                subjectId: subj_ids[5],
                issuedDate: new Date(
                    format(addDays(currentDate, -15), 'yyyy-MM-dd'),
                ),
                dueDate: new Date(
                    format(addDays(currentDate, 3), 'yyyy-MM-dd'),
                ),
                description:
                    'Write an essay analyzing the artistic and cultural significance of selected Renaissance paintings.',
            },
            {
                classroomId: classRoomId,
                id: '4',
                title: 'Nutritional Science Research Project',
                subjectId: subj_ids[3],
                issuedDate: new Date(
                    format(addDays(currentDate, -17), 'yyyy-MM-dd'),
                ),
                dueDate: new Date(
                    format(addDays(currentDate, 5), 'yyyy-MM-dd'),
                ),
                description:
                    'Conduct a research project on a specific aspect of human nutrition and present your findings in a detailed report.',
            },
            {
                classroomId: classRoomId,
                id: '5',
                title: 'Urban Planning Case Study Analysis',
                subjectId: subj_ids[2],
                issuedDate: new Date(
                    format(addDays(currentDate, -20), 'yyyy-MM-dd'),
                ),
                dueDate: new Date(
                    format(addDays(currentDate, 8), 'yyyy-MM-dd'),
                ),
                description:
                    'Analyze a case study of a sustainable urban planning project and present a comprehensive report on its impact and success factors.',
            },
        ],
    })

    for (let i = 0; i < resources.count; i++) {
        await prisma.assignment.update({
            where: {
                id: String(i + 1),
            },
            data: {
                resources: {
                    connect: { id: String(i + 1) },
                },
            },
        })
    }

    return assignments
}
