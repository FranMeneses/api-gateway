import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './product.controller';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, RabbitMQService],
})
export class ProductModule {}