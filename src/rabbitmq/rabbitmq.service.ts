import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private clients: { [key: string]: ClientProxy } = {};

  constructor() {
    this.setupQueue('catalog_queue');
    // Agregar más colas aquí si es necesario
  }

  private setupQueue(queueName: string) {
    this.clients[queueName] = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: queueName,
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async sendMessage(queueName: string, message: { pattern: string, data: { action: string, product: any } }) {
    const client = this.clients[queueName];
    if (client) {
      const payload = {
        pattern: message.pattern,
        data: message.data
      };
      console.log(queueName + ' ha recibido un ' + message.data.action);
      return client.send(payload.pattern, payload.data).toPromise();
    } else {
      throw new Error(`Queue ${queueName} is not configured.`);
    }
  }
}