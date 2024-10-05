import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { IsValidIdPipe } from 'src/utils/validIdPipe';
import { RequiredRoles } from '../auth/decorators/roles.decorator';
import { Roles } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    const product = await this.productService.create(dto);
    return product;
  }

  @Get()
  async getAllProducts() {
    const products = await this.productService.products({});
    return products;
  }

  @RequiredRoles(Roles.ADMIN)
  @Delete(':id')
  async deleteProduct(@Param('id', IsValidIdPipe) id: number) {
    const exists = await this.productService.product({ id });
    if (!exists) {
      throw new NotFoundException('Product not found');
    }
    const product = await this.productService.delete({ id });
    return product;
  }
}
