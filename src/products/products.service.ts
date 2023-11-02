import { Injectable } from '@nestjs/common';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async createProduct(createProductDto: CreateProductDto) {
    const message = {
      action: 'create',
      data: createProductDto,
    };

    return this.rabbitMQService.sendMessage('catalog_queue', message);
  }
}