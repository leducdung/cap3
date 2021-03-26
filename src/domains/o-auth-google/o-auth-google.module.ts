import { Module, forwardRef } from '@nestjs/common';
import { OAuthGoogleService } from './o-auth-google.service';
import { OAuthGoogleController } from './o-auth-google.controller';
import { GoogleStrategy } from './google/googleStrategy';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../../auth/auth.module';
import { StoreOwnersModule } from '../storeOwners/storeOwners.module';
import { EmployeesModule } from '../employees/employees.module';
import { GGCombinedService } from './o-auth-google.combined.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    forwardRef(() => StoreOwnersModule),
    forwardRef(() => EmployeesModule),
  ],
  controllers: [OAuthGoogleController],
  providers: [OAuthGoogleService, GoogleStrategy],
})
export class OAuthGoogleModule {}
