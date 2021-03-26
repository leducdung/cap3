import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { sortDirection, SortDirection } from '../../../constains/common';

export enum SortBy {
  id = '_id',
  title = 'title',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}
export class CreateEmployeeDto {
  @ApiPropertyOptional()
  readonly fullName?: string;

  @ApiPropertyOptional()
  readonly photos?: string;

  @ApiPropertyOptional()
  readonly email?: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly phoneNumbers?: number;

  @ApiPropertyOptional()
  readonly address?: string;
}

export class DataUpdateEmployeeDto {
  @ApiPropertyOptional()
  readonly fullName?: string;

  @ApiPropertyOptional()
  readonly photos?: string;

  @ApiPropertyOptional()
  readonly email?: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly phoneNumbers?: number;

  @ApiPropertyOptional()
  readonly address?: string;
}

export class ParamEmployeeDto {
  @ApiPropertyOptional()
  readonly storeOwnerID?: Types.ObjectId;
}

export class FindManyEmployeeDto {
  @ApiPropertyOptional({ enum: SortBy })
  readonly sortBy?: SortBy = SortBy.id;

  @ApiPropertyOptional({ enum: sortDirection })
  readonly sortDirection?: SortDirection = SortDirection.asc;

  @ApiPropertyOptional()
  readonly limit?: number;

  @ApiPropertyOptional()
  readonly storeOwnerID?: Types.ObjectId;

  @ApiPropertyOptional()
  readonly offset?: number;

  @ApiPropertyOptional()
  readonly cursor?: string;

  @ApiPropertyOptional()
  readonly fullName?: string;

  @ApiPropertyOptional()
  readonly photos?: string;

  @ApiPropertyOptional()
  readonly email?: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly phoneNumbers?: number;

  @ApiPropertyOptional()
  readonly address?: string;
}
