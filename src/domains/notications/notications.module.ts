import { Module, forwardRef } from '@nestjs/common';
import { NoticationsService } from './notications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticationsSchema } from './model/notications.schema';
import { AuthModule } from '../../auth/auth.module';
import { databaseModule } from '../../database/database.module';
import { NoticationsController } from './notications.controller';

export const noticationModel = MongooseModule.forFeature([
  {
    name: 'Notications',
    schema: NoticationsSchema,
  },
]);

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => databaseModule),
    forwardRef(() => noticationModel),
  ],
  controllers: [NoticationsController],
  providers: [NoticationsService],
  exports: [NoticationsService],
})
export class NoticationsModule {}
