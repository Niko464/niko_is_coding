import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyFromEnv = this.configService.getOrThrow<string>('API_KEY');
    const apiKeyFromRequest = request.headers['api_key'];

    if (apiKeyFromRequest && apiKeyFromRequest === apiKeyFromEnv) {
      return true;
    }

    throw new UnauthorizedException('Invalid API key');
  }
}
