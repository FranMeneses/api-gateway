import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from './products/product.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductResolver } from './products/product.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [
    ProductModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'src/graphql/schema.gql', 
    }),
  ],
  providers: [RabbitMQService, ProductResolver],
})
export class AppModule {}