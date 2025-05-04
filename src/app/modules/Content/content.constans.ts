export const searchableFields = ['title', 'description', 'director', 'cast', 'genre','category','streamingPlatform'];

export const calculatePagination = (options: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
export const pick = (obj: Record<string, any>, keys: string[]): Record<string, any> => {
  const finalObj: Record<string, any> = {};
  if (!obj) return finalObj;
  for (const key of keys) {
    if (Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

