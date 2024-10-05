import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateProductDto implements Prisma.ProductCreateInput {
  @IsString()
  name: string;
}
