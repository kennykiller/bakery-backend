import { Request } from 'express';

export const getClientIp = (request: Request): string => {
  const ip =
    request.headers['x-forwarded-for'] || // Самый надежный за прокси
    request.ip ||
    request.connection?.remoteAddress ||
    request.socket?.remoteAddress;

  // Если x-forwarded-for содержит несколько IP (через запятую)
  let clientIp: string;
  if (typeof ip === 'string') {
    clientIp = ip.split(',')[0].trim();
  } else if (Array.isArray(ip)) {
    clientIp = ip[0];
  } else {
    clientIp = ip || 'unknown';
  }

  return clientIp;
};
