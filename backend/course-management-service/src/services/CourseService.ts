class CourseService {

    async SubscribeEvents(payload: string): Promise<void> {
        console.log('Triggering.... CoursesService Events');

        const parsedPayload: PayloadData = JSON.parse(payload);

        const {event, data} = parsedPayload;
        const {id, name, price, isActive} = data;

        switch (event) {
            case 'SAMPLE':
                this.sample(parsedPayload);
                break;
            default:
                break;
        }
    }

    private sample(parsedPayload: PayloadData): void {
        // Implement your logic here
        console.log(`CourseService sample SubscribeEvents parsedPayload: `, parsedPayload);
    }
}

interface PayloadData {
    event: string;
    data: {
        id: string;
        name: string;
        price: string;
        isActive: boolean;
    };
}

export default CourseService