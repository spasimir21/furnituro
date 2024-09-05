import { CreateCategoryDto } from './dto/createCategory.dto';
import { CategoryService } from './category.service';
import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { from, of } from 'rxjs';

@Controller()
class CategoryGRPCController {
  constructor(@Inject(CategoryService) private readonly categoryService: CategoryService) {}

  @GrpcMethod('CategoryService', 'CreateCategory')
  async createCategory(input: CreateCategoryDto) {
    CreateCategoryDto.schema.parse(input);

    const category = await this.categoryService.createCategory(input);
    return of(category);
  }
}

export { CategoryGRPCController };

