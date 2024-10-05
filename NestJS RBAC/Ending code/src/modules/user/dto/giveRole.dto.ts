import { Roles } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class GiveRoleDto {
  @IsEnum(Roles)
  role: Roles;
}
