import { prisma } from './prisma'

export async function createAssignments() {
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
    const assignments = await prisma.assignment.createMany({
        data: [
            {
                id: '1',
                title: 'Research Paper on Climate Change Adaptation',
                status: true,
                completed: true,
                comment: 'Great Work',
                daysTook: 1,
                submittedDate: new Date('2023-12-05'),
                date: new Date('2023-12-04'),
                due: new Date('2024-01-10'),
                description:
                    'Write a research paper exploring the challenges and opportunities for climate change adaptation in coastal communities.',
            },
            {
                id: '2',
                title: 'Economics Presentation on Market Structures',
                overdue: true,
                date: new Date('2023-12-01'),
                due: new Date('2023-12-03'),
                status: false,
                description:
                    'Prepare a presentation discussing different market structures and their implications for businesses and consumers.',
            },
            {
                id: '3',
                title: 'Art History Essay on Renaissance Masterpieces',

                date: new Date('2023-12-20'),
                due: new Date('2024-01-07'),
                status: false,
                description:
                    'Write an essay analyzing the artistic and cultural significance of selected Renaissance paintings.',
            },
            {
                id: '4',
                title: 'Nutritional Science Research Project',
                date: new Date('2023-12-22'),
                due: new Date('2024-01-09'),
                status: false,
                description:
                    'Conduct a research project on a specific aspect of human nutrition and present your findings in a detailed report.',
            },
            {
                id: '5',
                title: 'Urban Planning Case Study Analysis',

                date: new Date('2023-12-25'),
                due: new Date('2024-01-12'),
                status: false,
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
