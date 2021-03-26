import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './model/products.schema';
import { AuthModule } from '../../auth/auth.module';
import { databaseModule } from '../../database/database.module';
import { ProductsController } from './products.controller';

export const ProductModel = MongooseModule.forFeature([
  {
    name: 'Products',
    schema: ProductsSchema,
  },
]);

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => databaseModule),
    forwardRef(() => ProductModel),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
