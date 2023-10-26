import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PRODUCT_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.AMQP_URL],
                    queue: 'catalogue_queue',
                    queueOptions: {
                        durable: false
                    },
                },
            },
        ]),
    ],
    controllers: [],
    providers: [RmqModule],
})
export class RmqModule {}