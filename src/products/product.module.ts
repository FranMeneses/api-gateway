import { Module } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { ProductResolver } from './product.resolver';

@Module({
  providers: [ProductResolver, RabbitMQService]
})
export class ProductModule {}