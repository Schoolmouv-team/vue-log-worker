import pick from 'pick-deep';

export const filterAnObject = (object, whiteListFields) => {
  return pick(object, whiteListFields);
};

export const filterPayload = (payload, whiteListFields) => {
  if (!whiteListFields) return payload;

  if (Array.isArray(payload)) {
    return payload.map(_ => filterAnObject(_, whiteListFields));
  } else {
    return filterAnObject(payload, whiteListFields);
  }
};
