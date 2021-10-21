import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './models/product.model';
import { GetProductArgs } from './dto/args/get_product.args';
import { CreateProductInput } from './dto/input/create-product.input';
import { UpdateProductInput } from './dto/input/update-product.input';
import { DeleteProductInput } from './dto/input/delete-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async getOneProduct(getProductArgs: GetProductArgs): Promise<Product> {
    return await this.productModel.findOne(getProductArgs).exec();
  }

  async createProduct(createProductData: CreateProductInput): Promise<Product> {
    const product: Product = {
      productId: uuidv4(),
      ...createProductData,
    };
    const createProduct = new this.productModel(product);
    return await createProduct.save();
  }

  async updateProduct(updateProductData: UpdateProductInput): Promise<Product> {
    return await this.productModel.findOneAndUpdate(
      { productId: updateProductData.productId },
      updateProductData,
      {
        new: true,
      },
    );
  }

  async removeProduct(deleteProductData: DeleteProductInput): Promise<Product> {
    return await this.productModel.findOneAndRemove(
      { productId: deleteProductData.productId },
      deleteProductData,
    );
  }
}
