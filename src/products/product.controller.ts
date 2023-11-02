import { Controller, Post, Body } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { CreateProductDto } from 'src/products/dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const message = {
      action: 'create',
      data: createProductDto,
    };

    await this.rabbitMQService.sendMessage('catalog_queue', message);
  }
}