import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { sortDirection, SortDirection } from '../../../constains/common';
import { UserAccessStatus } from '../../../constains/common';

export enum SortBy {
  id = '_id',
  title = 'title',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}
export class CreatestoreOwnerDto {
  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  readonly photos?: string;

  @ApiPropertyOptional()
  readonly email?: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly phoneNumbers?: number;

  @ApiPropertyOptional({ enum: UserAccessStatus })
  readonly address?: string;

  @ApiPropertyOptional()
  readonly status?: string;
}

export class DataUpdateStoreOwnerDto {
  @ApiPropertyOptional()
  readonly name?: string;

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

  @ApiPropertyOptional({ enum: UserAccessStatus })
  readonly status?: string;
}

export class ParamUserDto {
  @ApiPropertyOptional()
  readonly storeOwnerID?: Types.ObjectId;
}

export class FindManyStoreOwnersDto {
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
  readonly name?: string;

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

  @ApiPropertyOptional({ enum: UserAccessStatus })
  readonly status?: string;
}
