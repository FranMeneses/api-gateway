import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQService {
  constructor(
    private readonly client: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async sendMessage(queue: string, message: any) {
    return this.client.emit(queue, message).toPromise();
  }
}