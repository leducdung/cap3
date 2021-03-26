import { Module, forwardRef } from '@nestjs/common';
import { CommentAndRatingsService } from './commentAndRatings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentAndRatingsSchema } from './model/commentAndRatings.schema';
import { AuthModule } from '../../auth/auth.module';
import { databaseModule } from '../../database/database.module';
import { CommentAndRatingsController } from './commentAndRatings.controller';

export const commentAndRatingModel = MongooseModule.forFeature([
  {
    name: 'CommentAndRatings',
    schema: CommentAndRatingsSchema,
  },
]);

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => databaseModule),
    forwardRef(() => commentAndRatingModel),
  ],
  controllers: [CommentAndRatingsController],
  providers: [CommentAndRatingsService],
  exports: [CommentAndRatingsService],
})
export class CommentAndRatingsModule {}
