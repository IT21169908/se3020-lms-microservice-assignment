import {RabbitMQService} from "./RrabbitMQService";

class AuthService {

    async SubscribeEvents(payload: string): Promise<void> {
        console.log('Triggering.... AuthService Events');

        const parsedPayload: PayloadData = JSON.parse(payload);

        const {event, data} = parsedPayload;
        const {username, password, confirmPassword, remember} = data;

        switch (event) {
            case 'LOGIN':
                this.login(parsedPayload);
                break;
            default:
                break;
        }
    }

    private login(parsedPayload: PayloadData): void {
        // Implement your logic here
        console.log(`user login: `, parsedPayload);
    }
}

interface PayloadData {
    event: string;
    data: {
        username: string;
        password: string;
        confirmPassword: string;
        remember?: boolean;
    };
}

export default AuthService;