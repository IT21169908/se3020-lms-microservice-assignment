class LMSService {

    async SubscribeEvents(payload: string): Promise<void> {
        console.log('Triggering.... LMSService Events');

        const parsedPayload: PayloadData = JSON.parse(payload);

        const {event, data} = parsedPayload;
        const {_id, user_id, course_id, status} = data;

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
        console.log(`LMSService sample SubscribeEvents parsedPayload: `, parsedPayload);
    }
}

interface PayloadData {
    event: string;
    data: {
        _id: string;
        user_id: string;
        course_id: string;
        status: string;
    };
}

export default LMSService