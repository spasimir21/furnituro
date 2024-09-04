import { CategoryNamesDto } from './dto/categoryNames.dto';
import { CategoryService } from './category.service';
import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { from } from 'rxjs';

@Controller()
class CategoryGRPCController {
  constructor(@Inject(CategoryService) private readonly categoryService: CategoryService) {}

  @GrpcMethod('CategoryService', 'EnsureCategories')
  async ensureCategories(input: CategoryNamesDto) {
    CategoryNamesDto.schema.parse(input);

    const categories = await this.categoryService.ensureCategories(input);
    return from(categories);
  }
}

export { CategoryGRPCController };
