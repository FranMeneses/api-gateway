import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { CreateProductDto } from 'src/products/dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const message = {
      action: 'create',
      data: createProductDto,
    };

    await this.rabbitMQService.sendMessage(message);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const message = {
      action: 'update',
      data: {
        id,
        product: updateProductDto,
      },
    };

    await this.rabbitMQService.sendMessage(message);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const message = {
      action: 'delete',
      data: id,
    };

    await this.rabbitMQService.sendMessage(message);
  }
}