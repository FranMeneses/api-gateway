import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsResolver } from './products/product.resolver';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ProductModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'src/graphql/schema.gql', 
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ProductsResolver],
})
export class AppModule {}