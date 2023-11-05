import { Injectable } from '@nestjs/common';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async createProduct(createProductDto: CreateProductDto) {
    const message = {
      action: 'create',
      data: createProductDto,
    };

    return this.rabbitMQService.sendMessage(message);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const message = {
      action: 'update',
      data: {
        id,
        product: updateProductDto,
      },
    };

    return this.rabbitMQService.sendMessage(message);
  }


  async deleteProduct(id: string) {
    const message = {
      action: 'delete',
      data: id,
    };

    return this.rabbitMQService.sendMessage(message);
  }
}