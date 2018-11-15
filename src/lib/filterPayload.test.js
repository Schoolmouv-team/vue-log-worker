import { filterPayload } from './filterPayload';

let payloadObject = {
  id: 'id',
  name: 'name',
  email: 'email',
  child: {
    id: 'id child',
    name: 'child',
  },
};

let payloadArray = [
  {
    id: 'id',
    name: 'name',
    email: 'email',
    child: {
      id: 'id child',
      name: 'child',
    },
  },
  {
    id: 'id 2',
    name: 'name 2',
    email: 'email 2',
    parent: {
      father: {
        id: 'id father',
      },
      mother: {
        id: 'id mother',
      },
    },
  },
];

describe('filterPayload', () => {
  describe('With empty whitelist', () => {
    it('should return the same object', () => {
      expect(filterPayload(payloadObject, null)).toEqual(payloadObject);
    });

    it('should return the same array', () => {
      expect(filterPayload(payloadArray, null)).toEqual(payloadArray);
    });
  });

  describe('With some fields in whitelist', () => {
    const whiteListFields = ['id', 'email'];

    it('should return objet with only id and email', () => {
      expect(filterPayload(payloadObject, whiteListFields)).toEqual({
        id: 'id',
        email: 'email',
      });
    });

    it('should return array with only id and email', () => {
      expect(filterPayload(payloadArray, whiteListFields)).toEqual([
        {
          id: 'id',
          email: 'email',
        },
        {
          id: 'id 2',
          email: 'email 2',
        },
      ]);
    });
  });

  describe('With no matching keys', () => {
    const whiteListFields = ['surname', 'gender'];

    it('should return empty object', () => {
      expect(filterPayload(payloadObject, whiteListFields)).toEqual({});
    });

    it('should return array of empty objects', () => {
      expect(filterPayload(payloadArray, whiteListFields)).toEqual([{}, {}]);
    });
  });

  describe('With some fields in whitelist, in depth', () => {
    const whiteListFields = ['id', 'email', 'child.id', 'parent.father.id'];

    it('should return objet with only id and email', () => {
      expect(filterPayload(payloadObject, whiteListFields)).toEqual({
        id: 'id',
        email: 'email',
        child: {
          id: 'id child',
        },
      });
    });

    it('should return array with only id and email', () => {
      expect(filterPayload(payloadArray, whiteListFields)).toEqual([
        {
          id: 'id',
          email: 'email',
          child: {
            id: 'id child',
          },
        },
        {
          id: 'id 2',
          email: 'email 2',
          parent: {
            father: {
              id: 'id father',
            },
          },
        },
      ]);
    });
  });
});
