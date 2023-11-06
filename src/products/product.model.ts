import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  image: string;
}