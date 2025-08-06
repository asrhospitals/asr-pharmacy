export function buildQueryParams({ page = 1, limit, search = '', filters = {} }) {
  const params = new URLSearchParams();
  params.append('page', page);
  params.append('limit', limit);
  if (search) params.append('search', search);
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') params.append(key, value);
  });
  return params.toString();
} 