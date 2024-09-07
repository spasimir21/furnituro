import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { ProductQueryDto } from './dto/ProductQuery.dto';
import { EditProductDto } from './dto/EditProduct.dto';
import { ProductService } from './product.service';
import { TokenGuard } from '@libs/server/token';
import { UseZodGuard } from 'nestjs-zod';

@Controller()
class ProductHTTPController {
  constructor(@Inject(ProductService) private readonly productService: ProductService) {}

  @UseZodGuard('query', ProductQueryDto)
  @Get('/count')
  count(@Query() query: ProductQueryDto) {
    return this.productService.count(query);
  }

  @UseZodGuard('query', ProductQueryDto)
  @Get('/')
  get(@Query() query: ProductQueryDto) {
    return this.productService.get(query);
  }

  @UseZodGuard('body', CreateProductDto)
  @UseGuards(TokenGuard)
  @Post('/')
  create(@Body() input: CreateProductDto) {
    return this.productService.create(input);
  }

  @UseZodGuard('body', EditProductDto)
  @UseGuards(TokenGuard)
  @Patch('/:id')
  edit(@Param('id') id: string, @Body() input: EditProductDto) {
    return this.productService.edit(id, input);
  }

  @UseGuards(TokenGuard)
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}

export { ProductHTTPController };

