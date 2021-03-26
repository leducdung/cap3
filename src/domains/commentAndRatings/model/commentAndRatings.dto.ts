import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { sortDirection, SortDirection } from '../../../constains/common';

export enum SortBy {
  id = '_id',
  title = 'title',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}
export class CreateCommentAndRatingDto {
  @ApiPropertyOptional()
  readonly title?: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly isFaborit?: number;

  @ApiPropertyOptional()
  readonly rateStar?: number;

  @ApiPropertyOptional()
  readonly comment?: string;

  @ApiPropertyOptional()
  readonly createdBy?: Types.ObjectId;

  @ApiPropertyOptional()
  readonly productID?: Types.ObjectId;
}

export class DataUpdateCommentAndRatingDto {
  @ApiPropertyOptional()
  readonly title?: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly isFaborit?: number;

  @ApiPropertyOptional()
  readonly rateStar?: number;

  @ApiPropertyOptional()
  readonly comment?: string;

  @ApiPropertyOptional()
  readonly createdBy?: Types.ObjectId;

  @ApiPropertyOptional()
  readonly productID?: Types.ObjectId;
}

export class ParamCommentAndRatingDto {
  @ApiPropertyOptional()
  readonly commentAndRatingID?: Types.ObjectId;

  @ApiPropertyOptional()
  readonly productID?: Types.ObjectId;
}

export class FindCommentAndRatingDto {
  @ApiPropertyOptional({ enum: SortBy })
  readonly sortBy?: SortBy = SortBy.id;

  @ApiPropertyOptional({ enum: sortDirection })
  readonly sortDirection?: SortDirection = SortDirection.asc;

  @ApiPropertyOptional()
  readonly limit?: number;

  @ApiPropertyOptional()
  readonly offset?: number;

  @ApiPropertyOptional()
  readonly cursor?: string;

  @ApiPropertyOptional()
  readonly title?: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly isFaborit?: number;

  @ApiPropertyOptional()
  readonly rateStar?: number;

  @ApiPropertyOptional()
  readonly comment?: string;

  @ApiPropertyOptional()
  readonly createdBy?: Types.ObjectId;

  @ApiPropertyOptional()
  readonly productID?: Types.ObjectId;
}
