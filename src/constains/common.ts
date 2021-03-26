export enum UserAccessStatus {
  NOSTATUS = 'NOSTATUS',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum UserStatus {
  LOCK = 'LOCK',
  UNLOCK = 'UNLOCK',
}

export enum UserRole {
  BASIC = 'BASIC',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  STOREOWNER = 'STOREOWNER',
}

export enum SortDirection {
  asc = 'ASC',
  desc = 'DESC',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum EventNotification {
  ORDERING = 'ORDERING',
  ORDERED = 'ORDERED',
}

export enum HistoryOderStoresStatus {
  COMPOSING = 'COMPOSING',
  FINISHED_COMPOSING = 'FINISHED_COMPOSING',
}

export enum HistoryOderUserStatus {
  COMPOSING = 'COMPOSING',
  FINISHED_COMPOSING = 'FINISHED_COMPOSING',
}

export enum statusProduct {
  UOT_OF_STOCK = 'UOT_OF_STOCK',
  STOCKING = 'STOCKING',
}

export enum productsTag {
  POULTRY = 'POULTRY', // gia cầm
  BEEF_AND_PORK = 'BEEF_AND_PORK', // thịt bò thịt heo
  VEGETABLE = 'VEGETABLE',
  SPICE = 'SPICE', // gia vị
  FOOD = 'FOOD',
}

export const sortDirection = [SortDirection.asc, SortDirection.desc];
