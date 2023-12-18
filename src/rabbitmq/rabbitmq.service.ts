import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private clients: { [key: string]: ClientProxy } = {};

  constructor() {
    this.setupQueue('catalog_queue', "amqps://tpygkmqd:LEr4PsX-PFPIrwbUQ9xnMQAxjmcv47BZ@jackal.rmq.cloudamqp.com/tpygkmqd");
    // Agregar más colas aquí si es necesario
  }

  private setupQueue(queueName: string, amqpUrl: string) {
    this.clients[queueName] = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [amqpUrl],
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
      console.log(queueName, payload);
      return client.send(queueName, payload).toPromise();
    } else {
      throw new Error(`Queue ${queueName} is not configured.`);
    }
  }
}