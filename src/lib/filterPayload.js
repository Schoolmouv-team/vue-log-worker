export const filterAnObject = (object, whiteListFields) => {
  return Object.keys(object).reduce((acc, key) => {
    if (whiteListFields.includes(key)) {
      acc[key] = object[key];
    }
    return acc;
  }, {});
};

export const filterPayload = (payload, whiteListFields) => {
  if (!whiteListFields) return payload;

  if (Array.isArray(payload)) {
    return payload.map(_ => filterAnObject(_, whiteListFields));
  } else {
    return filterAnObject(payload, whiteListFields);
  }
};
