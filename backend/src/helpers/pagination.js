const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

const getPaginatedResponse = (data, count, page, limit) => ({
  data,
  total: count,
  page,
  totalPages: Math.ceil(count / limit),
});

module.exports = { getPagination, getPaginatedResponse };
