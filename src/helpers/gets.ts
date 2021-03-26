interface CursorObject {
  [key: string]: string | number | object;
}

export const getNextCursor = ({ data, sortBy }) => {
  let nextCursor: string | CursorObject = 'END';

  if (data.length) {
    nextCursor = data[data.length - 1].createdAt;
  }

  if (data.length && sortBy) {
    nextCursor = data[data.length - 1][sortBy];
  }

  if (typeof nextCursor === 'object' && nextCursor[sortBy]) {
    nextCursor = nextCursor[sortBy] as string;
  }

  if (typeof nextCursor === 'object' && nextCursor._id) {
    nextCursor = nextCursor._id as string;
  }

  return nextCursor as string;
};

const getIDInObject = ({ data, key, nestedKey }) => {
  if (data && data[key] && data[key][nestedKey]) {
    return data[key][nestedKey];
  }

  if (data && data[key]) {
    return data[key];
  }

  return data;
};

export const getIDsInObject = ({ data, keys, nestedKey }) => {
  const ids = [];

  if (!data || !keys || !keys.length) {
    return ids;
  }

  for (const key of keys) {
    const id = getIDInObject({
      data,
      key,
      nestedKey,
    });

    ids.push(id.toString());
  }

  return ids;
};
