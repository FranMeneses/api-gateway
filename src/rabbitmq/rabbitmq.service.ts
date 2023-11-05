import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: 'catalog_queue',
        queueOptions: {
          durable: false
        },
      },
    });
  }

  async sendMessage(message: { action: string, data: any }) {
    const pattern = { cmd: message.action };
    const payload = message.data;
    return this.client.send(pattern, payload).toPromise();
  }
}