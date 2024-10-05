import { SetMetadata } from '@nestjs/common';
import { Roles } from '@prisma/client';
import { APP_DECORATORS } from 'src/utils/constants';

export const RequiredRoles = (...roles: Roles[]) =>
  SetMetadata(APP_DECORATORS.ROLES_KEY, roles);
