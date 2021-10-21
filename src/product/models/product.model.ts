import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field()
  productId: string;

  @Field()
  title: string;

  @Field(() => Int)
  price: number;
}
