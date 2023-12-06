import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Product } from './product.model';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Resolver(of => Product)
export class ProductResolver {
  constructor(private rabbitMQService: RabbitMQService) {}

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

  @Mutation(returns => Product)
  async createProduct(@Args('name') name: string, @Args('description') description: string, @Args('price') price: number) {
    const product = { name, description, price };

    await this.rabbitMQService.sendMessage({ action: 'create', data: product });

    return product;
  }

  // Aquí necesitas implementar las mutaciones updateProduct y deleteProduct.
  // Por ahora, solo vamos a devolver un producto vacío o una cadena vacía.
  @Mutation(returns => Product)
  async updateProduct(@Args('id') id: string, @Args('name') name: string, @Args('description') description: string, @Args('price') price: number) {
    const product = { name, description, price };
    return product;
  }

  @Mutation(returns => String)
  async deleteProduct(@Args('id') id: string) {
    return id;
  }
}