export const convertToCSV = (data) => {
  if (!data || data.length === 0) {
    return '';
  }

  const headers = [
    'ID',
    'Title',
    'Author',
    'Email',
    'Category',
    'Status',
    'Tags',
    'Created At',
    'Views',
  ];

  const rows = data.map((post) => [
    post._id.toString(),
    `"${post.title.replace(/"/g, '""')}"`,
    post.author,
    post.email,
    post.category,
    post.status,
    `"${post.tags.join(', ')}"`,
    new Date(post.createdAt).toISOString(),
    post.views,
  ]);

  const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  return csv;
};

export const generateFilename = (type = 'posts') => {
  const timestamp = new Date().toISOString().slice(0, 10);
  return `${type}_${timestamp}.csv`;
};
