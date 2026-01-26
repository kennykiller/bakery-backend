import { Injectable, NestMiddleware } from '@nestjs/common';
import { getClientIp } from 'src/shared/utils/utils';

@Injectable()
export class GetIpMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const clientIp = getClientIp(req);

    req.clientIp = clientIp;

    next();
  }
}
