import { Types } from 'mongoose';

const buildArrayObjectIds = (data: string | string[]) => {
  if (!data) {
    return;
  }

  if (!Array.isArray(data)) {
    return Types.ObjectId(data);
  }

  return data.map((each) => Types.ObjectId(each));
};

export const buildFindingQuery = ({
  query,
  fieldNeedToUseRegex = [],
  convertToObjectIdFields = [],
}) => {
  const {
    sortBy = '_id',
    limit,
    cursor,
    sortDirection,
    ...findingQuery
  } = query;
  const validDirection: number = sortDirection === 'ASC' ? 1 : -1;
  const hasPage = !!limit;
  const sortingCondition = { [sortBy]: validDirection };

  for (const key in findingQuery) {
    if (!key) {
      continue;
    }

    const shouldConvertToObjectId = convertToObjectIdFields.includes(key);

    if (shouldConvertToObjectId) {
      findingQuery[key] = buildArrayObjectIds(findingQuery[key]);
    }

    if (fieldNeedToUseRegex.includes(key)) {
      findingQuery[key] = { $regex: findingQuery[key], $options: 'i' };

      continue;
    }

    if (!Array.isArray(findingQuery[key])) {
      continue;
    }

    findingQuery[key] = { $in: findingQuery[key] };
  }

  const findAllQuery = { ...findingQuery };

  if (!limit) {
    return {
      findingQuery,
      findAllQuery,
      sortingCondition,
      hasPage,
    };
  }

  if (!cursor) {
    return {
      sortingCondition,
      findingQuery,
      findAllQuery,
      hasPage,
    };
  }

  const condition = validDirection === 1 ? '$gt' : '$lt';

  findingQuery[sortBy] = { [condition]: cursor };

  if (convertToObjectIdFields.includes(sortBy)) {
    findingQuery[sortBy] = { [condition]: Types.ObjectId(cursor) };
  }

  return {
    sortingCondition,
    findingQuery,
    findAllQuery,
    hasPage,
  };
};
