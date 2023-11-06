import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from '../products/product.service';

@Controller()
export class RabbitMQController {
  constructor(private readonly productService: ProductsService) {}

  @MessagePattern('product')
  async processRabbitMQMessage(message: { action: string, data: any }) {
    switch (message.action) {
      case 'create':
        return this.productService.createProduct(message.data);
      case 'update':
        return this.productService.updateProduct(message.data.id, message.data.product);
      case 'delete':
        return this.productService.deleteProduct(message.data);
      default:
        throw new Error(`Unsupported action: ${message.action}`);
    }
  }
}