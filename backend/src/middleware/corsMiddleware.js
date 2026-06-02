export const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  const allowedOriginRules = (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const isLocalhost = Boolean(
    origin && (
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:')
    )
  );

  const matchesAllowedRule = (currentOrigin) => {
    return allowedOriginRules.some((rule) => {
      if (rule === currentOrigin) return true;

      // Support wildcard subdomains like: https://*.vercel.app
      if (rule.includes('*')) {
        const escaped = rule
          .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
          .replace(/\*/g, '.*');
        const wildcardRegex = new RegExp(`^${escaped}$`);
        return wildcardRegex.test(currentOrigin);
      }

      return false;
    });
  };

  const isAllowedOrigin = Boolean(origin) && (isLocalhost || matchesAllowedRule(origin));

  // Requests from servers/tools may not include Origin; allow those.
  if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
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
