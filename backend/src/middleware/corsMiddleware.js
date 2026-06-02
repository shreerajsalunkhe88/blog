export const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow localhost with any port in development
  const isLocalhost = origin && (
    origin.startsWith('http://localhost:') ||
    origin.startsWith('http://127.0.0.1:')
  );
  
  if (isLocalhost || process.env.NODE_ENV === 'production') {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '3600');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};
