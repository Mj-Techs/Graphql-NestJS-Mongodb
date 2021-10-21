import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsResolver } from './product.resolver';
import { ProductSchema } from './product.schema';
import { ProductsService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductModule {}
