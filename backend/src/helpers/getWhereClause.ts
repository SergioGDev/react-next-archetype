export const getWhereClause = (
  obj: { [key: string]: any },
  exludedKeys: string[] = []
) => {
  const whereClause: { [key: string]: any } = {};

  Object.keys(obj)
    .filter((key: string) => !exludedKeys.includes(key))
    .forEach((key: string) => {
      if (obj[key] !== undefined) {
        whereClause[key] = obj[key];
      }
    });
  
  return whereClause;
};

export const getWhereClauseWithCoincidences = (
  obj: { [key: string]: any },
  exludedKeys: string[] = []
) => {
  const whereClause: { [key: string]: any } = {};

  Object.keys(obj)
    .filter((key: string) => !exludedKeys.includes(key))
    .forEach((key: string) => {
      if (obj[key] !== undefined) {
        whereClause[key] = new RegExp(obj[key], "i");
      }
    });

  return whereClause;
};
