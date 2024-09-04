import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { CategoriesSearchQueryDto } from './dto/categoriesSearchQuery.dto';
import { CategoryNamesDto } from './dto/categoryNames.dto';
import { CategoryService } from './category.service';
import { TokenGuard } from '@libs/server/token';
import { UseZodGuard } from 'nestjs-zod';

@Controller()
class CategoryHTTPController {
  constructor(@Inject(CategoryService) private readonly categoryService: CategoryService) {}

  @UseZodGuard('query', CategoriesSearchQueryDto)
  @Get('/search')
  async searchCategories(@Query('search') search?: string) {
    return (await this.categoryService.searchCategories(search)).map(category => category.name);
  }

  // TODO: Remove later
  @UseZodGuard('body', CategoryNamesDto)
  @UseGuards(TokenGuard)
  @Post('/ensure')
  async ensureCategories(@Body() input: CategoryNamesDto) {
    return await this.categoryService.ensureCategories(input);
  }
}

export { CategoryHTTPController };
