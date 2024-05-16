// import * as amqplib from 'amqplib';
//
// export class RPCService {
//     private static instance: RPCService;
//     private channel: amqplib.Channel | null = null;
//
//     constructor() {
//
//     }
//
//     static async getInstance(): Promise<RPCService> {
//         if (!RabbitMQService.instance) {
//             RabbitMQService.instance = new RabbitMQService();
//             await RabbitMQService.instance.init();
//         }
//         return RabbitMQService.instance;
//     }
// }