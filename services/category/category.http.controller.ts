import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CategoriesSearchQueryDto } from './dto/categoriesSearchQuery.dto';
import { unwrapResultWithNull } from '@libs/shared/utils/result';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { EditCategoryDto } from './dto/editCategory.dto';
import { CategoryService } from './category.service';
import { TokenGuard } from '@libs/server/token';
import { UseZodGuard } from 'nestjs-zod';

@Controller()
class CategoryHTTPController {
  constructor(@Inject(CategoryService) private readonly categoryService: CategoryService) {}

  @Get('/')
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @UseZodGuard('body', CreateCategoryDto)
  @UseGuards(TokenGuard)
  @Post('/create')
  async createCategory(@Body() input: CreateCategoryDto) {
    return await this.categoryService.createCategory(input);
  }

  @UseZodGuard('body', EditCategoryDto)
  @UseGuards(TokenGuard)
  @Patch('/:id')
  async editCategory(@Param('id') id: string, @Body() input: EditCategoryDto) {
    return unwrapResultWithNull(await this.categoryService.editCategory(id, input));
  }

  @UseGuards(TokenGuard)
  @Delete('/:id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }
}

export { CategoryHTTPController };

