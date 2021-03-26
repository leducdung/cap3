import { forwardRef, Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { ConfigModule } from '@nestjs/config';
import { OAuthGoogleModule } from './o-auth-google/o-auth-google.module';
import { UsersModule } from './users/users.module';
import { StoreOwnersModule } from './storeOwners/storeOwners.module';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { CommentAndRatingsModule } from './commentAndRatings/commentAndRatings.module';
import { NoticationsModule } from './notications/notications.module';

export const myAppImPortModules = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  forwardRef(() => TestModule),
  forwardRef(() => OAuthGoogleModule),
  forwardRef(() => UsersModule),
  forwardRef(() => StoreOwnersModule),
  forwardRef(() => EmployeesModule),
  forwardRef(() => ProductsModule),
  forwardRef(() => CommentAndRatingsModule),
  forwardRef(() => NoticationsModule),
];
@Module({
  imports: myAppImPortModules,
})
export class MyAppModule {}

//j