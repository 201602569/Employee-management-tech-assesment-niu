const { getPagination, getPaginatedResponse } = require('../helpers/pagination');

describe('getPagination', () => {
  test('returns defaults when query is empty', () => {
    expect(getPagination({})).toEqual({ page: 1, limit: 10, offset: 0 });
  });

  test('calculates offset correctly', () => {
    expect(getPagination({ page: '3', limit: '10' })).toEqual({ page: 3, limit: 10, offset: 20 });
  });

  test('clamps page to minimum 1 for negative values', () => {
    expect(getPagination({ page: '-5' }).page).toBe(1);
  });

  test('clamps limit to maximum 100', () => {
    expect(getPagination({ limit: '500' }).limit).toBe(100);
  });

  test('falls back to default limit when value is 0', () => {
    expect(getPagination({ limit: '0' }).limit).toBe(10);
  });

  test('ignores non-numeric values and falls back to defaults', () => {
    expect(getPagination({ page: 'abc', limit: 'xyz' })).toEqual({ page: 1, limit: 10, offset: 0 });
  });
});

describe('getPaginatedResponse', () => {
  test('calculates totalPages correctly', () => {
    const result = getPaginatedResponse([], 25, 1, 10);
    expect(result.totalPages).toBe(3);
  });

  test('rounds up totalPages for uneven division', () => {
    const result = getPaginatedResponse([], 11, 2, 10);
    expect(result.totalPages).toBe(2);
  });

  test('returns expected structure', () => {
    const data = [{ id: 1 }, { id: 2 }];
    expect(getPaginatedResponse(data, 2, 1, 10)).toEqual({
      data,
      total: 2,
      page: 1,
      totalPages: 1,
    });
  });
});
