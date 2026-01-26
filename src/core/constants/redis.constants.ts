export const CACHE_KEYS_PRODUCTS = {
  PRODUCT_BY_ID: (id: string) => `product:${id}`,
  PRODUCTS_LIST: 'products:list',
};

export const CACHE_KEYS_AUTH = {
  CHECK_BLACKLIST: (jwtId: string) => `auth:blacklist:${jwtId}`,
  REFRESH_USER: (userId: string) => `refresh:${userId}`,
};

export const CACHE_RATE_LIMITS = {
  BY_IP: (ip: string) => `rate:login:${ip}`,
  BY_ORDER: (userId: string) => `rate:order:${userId}`,
};
