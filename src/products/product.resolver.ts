import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Product } from './product.model';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private rabbitMQService: RabbitMQService) { }

  @Query(returns => [Product])
  async products() {
    // Aquí necesitas implementar la lógica para devolver todos los productos.
    // Por ahora, solo vamos a devolver una lista vacía.
    return [];
  }

  @Query(returns => Product)
  async product(@Args('id') id: string) {
    // Aquí necesitas implementar la lógica para devolver un producto por su ID.
    // Por ahora, solo vamos a devolver un producto vacío.
    return new Product();
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('description') description: string,
    @Args('category') category: string,
    @Args('image') image: string
  ) {
    const product = { name, price, description, category, image };
    const message = {
      pattern: 'catalog_queue',
      data: {
        action: 'create',
        product
      }
    }
    await this.rabbitMQService.sendMessage('catalog_queue', message);
    return product;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('description') description: string,
    @Args('category') category: string,
    @Args('image') image: string
  ) {
    const product = { id, name, price, description, category, image };
    const message = {
      pattern: 'catalog_queue',
      data: {
        action: 'update',
        product
      }
    }
    await this.rabbitMQService.sendMessage('catalog_queue', message);
    return product;
  }

  @Mutation(returns => String)
  async deleteProduct(@Args('id') id: string) {
    const product = { id };
    const message = {
      pattern: 'catalog_queue',
      data: {
        action: 'delete',
        product
      }
    }
    await this.rabbitMQService.sendMessage('catalog_queue', message);
    return id;
  }
}