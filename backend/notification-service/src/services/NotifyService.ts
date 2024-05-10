class NotifyService {

    async SubscribeEvents(payload: string): Promise<void> {
        console.log('Triggering.... NotifyService Events');

        const parsedPayload: PayloadData = JSON.parse(payload);

        const {event, data} = parsedPayload;
        const {_id, user_id, title, message, read, roles} = data;

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
        console.log(`NotifyService sample SubscribeEvents parsedPayload: `, parsedPayload);
    }
}

interface PayloadData {
    event: string;
    data: {
        _id: string;
        user_id: string;
        title: string;
        message: string;
        read: boolean;
        roles: [];
    };
}

export default NotifyService