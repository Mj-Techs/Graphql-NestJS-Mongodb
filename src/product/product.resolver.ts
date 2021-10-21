import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Product } from './models/product.model';
import { ProductsService } from './product.service';
import { GetProductArgs } from './dto/args/get_product.args';
import { CreateProductInput } from './dto/input/create-product.input';
import { UpdateProductInput } from './dto/input/update-product.input';
import { DeleteProductInput } from './dto/input/delete-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'Get_All_Products', nullable: 'items' })
  async getProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }
  @Query(() => Product, { name: 'Get_One_Product', nullable: true })
  async getProduct(@Args() getProductArgs: GetProductArgs): Promise<Product> {
    return this.productsService.getOneProduct(getProductArgs);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductData') createProductData: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductData);
  }

  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Args('updateProductData') updateProductData: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.updateProduct(updateProductData);
  }

  @Mutation(() => Product, { nullable: true })
  async removeProduct(
    @Args('deleteProductData') deleteProductData: DeleteProductInput,
  ): Promise<Product> {
    return this.productsService.removeProduct(deleteProductData);
  }
}
