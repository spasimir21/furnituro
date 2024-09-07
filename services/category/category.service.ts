import type { Category as PrismaCategory } from '@prisma/client';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { wrapResultAsync } from '@libs/shared/utils/result';
import { Category } from './interface/category.interface';
import { EditCategoryDto } from './dto/editCategory.dto';
import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryConfig } from './config';

const mapCategory = (category: PrismaCategory): Category => ({
  id: category.id,
  name: category.name,
  coverPhoto: category.cover_photo_hash ?? null
});

@Injectable()
class CategoryService {
  constructor(
    @Inject(CategoryConfig) private readonly config: CategoryConfig,
    private readonly prismaService: PrismaService
  ) {}

  async deleteCategory(id: string) {
    await this.prismaService.category.delete({ where: { id, products: { none: {} } } });
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany();
    return categories.map(mapCategory);
  }

  editCategory(id: string, input: EditCategoryDto) {
    return wrapResultAsync(async (): Promise<Category> => {
      const newCategory = await this.prismaService.category.update({
        where: { id },
        data: { name: input.name, cover_photo_hash: input.coverPhoto }
      });

      return mapCategory(newCategory);
    });
  }

  async createCategory(input: CreateCategoryDto): Promise<Category> {
    const category = await this.prismaService.category.create({
      data: { name: input.name, cover_photo_hash: input.coverPhoto }
    });

    return mapCategory(category);
  }
}

export { CategoryService };

