import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { sortDirection, SortDirection } from '../../../constains/common';
import {
  UserStatus,
  UserRole,
  EventNotification,
} from '../../../constains/common';

export enum SortBy {
  id = '_id',
  title = 'title',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}
export class CreateNoticationDto {
  @ApiPropertyOptional()
  readonly productID?: Types.ObjectId;

  @ApiPropertyOptional()
  readonly commentAndRatingID?: Types.ObjectId;

  @ApiPropertyOptional()
  readonly title?: string;

  @ApiPropertyOptional()
  readonly body?: string;

  @ApiPropertyOptional()
  readonly clickAction?: string;

  @ApiPropertyOptional()
  readonly isRead?: boolean;

  @ApiPropertyOptional({ enum: EventNotification })
  readonly event?: string;

  @ApiPropertyOptional()
  readonly receiverUID?: Types.ObjectId[];

  @ApiPropertyOptional()
  readonly createdBy?: Types.ObjectId;
}

export class DataUpdateNoticationDto {
  @ApiPropertyOptional()
  readonly productID?: Types.ObjectId;

  @ApiPropertyOptional()
  readonly commentAndRatingID?: Types.ObjectId;

  @ApiPropertyOptional()
  readonly title?: string;

  @ApiPropertyOptional()
  readonly body?: string;

  @ApiPropertyOptional()
  readonly clickAction?: string;

  @ApiPropertyOptional()
  readonly isRead?: boolean;

  @ApiPropertyOptional({ enum: EventNotification })
  readonly event?: string;

  @ApiPropertyOptional()
  readonly receiverUID?: Types.ObjectId[];

  @ApiPropertyOptional()
  readonly createdBy?: Types.ObjectId;
}

export class ParamNoticationDto {
  @ApiPropertyOptional()
  readonly notificationID?: Types.ObjectId;
}

export class FindNoticationDto {
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
  readonly productID?: Types.ObjectId;

  @ApiPropertyOptional()
  readonly commentAndRatingID?: Types.ObjectId;

  @ApiPropertyOptional()
  readonly title?: string;

  @ApiPropertyOptional()
  readonly body?: string;

  @ApiPropertyOptional()
  readonly clickAction?: string;

  @ApiPropertyOptional()
  readonly isRead?: boolean;

  @ApiPropertyOptional({ enum: EventNotification })
  readonly event?: string;

  @ApiPropertyOptional()
  readonly receiverUID?: Types.ObjectId[];

  @ApiPropertyOptional()
  readonly createdBy?: Types.ObjectId;
}
