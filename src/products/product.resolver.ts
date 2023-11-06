import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from '../products/product.service';
import { Product } from './product.model';

@Resolver(of => Product)
export class ProductsResolver {
  constructor(private productService: ProductsService) {}

  @Query(returns => [Product])
  async products() {
    // You need to implement a method in your service to return all products
    return this.productService.findAll();
  }

  @Query(returns => Product)
  async product(@Args('id') id: string) {
    // You need to implement a method in your service to return a product by id
    return this.productService.findOne(id);
  }

  @Mutation(returns => Product)
  async createProduct(@Args('name') name: string, @Args('description') description: string, @Args('price') price: number) {
    const product = { name, description, price };
    return this.productService.createProduct(product);
  }

  @Mutation(returns => Product)
  async updateProduct(@Args('id') id: string, @Args('name') name: string, @Args('description') description: string, @Args('price') price: number) {
    const product = { name, description, price };
    return this.productService.updateProduct(id, product);
  }

  @Mutation(returns => String)
  async deleteProduct(@Args('id') id: string) {
    await this.productService.deleteProduct(id);
    return id;
  }
}