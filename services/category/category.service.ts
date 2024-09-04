import { CategoryNamesDto } from './dto/categoryNames.dto';
import { Category } from './interface/category.interface';
import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryConfig } from './config';

@Injectable()
class CategoryService {
  constructor(
    @Inject(CategoryConfig) private readonly config: CategoryConfig,
    private readonly prismaService: PrismaService
  ) {}

  ensureCategories(input: CategoryNamesDto): Promise<Category[]> {
    return this.prismaService.$transaction(
      input.names
        .map(name => name.trim().toLowerCase())
        .filter(name => name.length >= 3)
        .map(name =>
          this.prismaService.category.upsert({
            where: { name },
            update: {},
            create: { name }
          })
        )
    );
  }

  searchCategories(search: string = ''): Promise<Category[]> {
    const query = search.trim().toLowerCase();
    if (query.length < 3) return this.getTopCategories();

    return this.prismaService.category.findMany({
      where: {
        name: {
          contains: query
        }
      },
      orderBy: {
        _relevance: {
          fields: ['name'],
          search: query,
          sort: 'desc'
        }
      },
      take: this.config.categorySearchMaxResultCount
    });
  }

  private getTopCategories(): Promise<Category[]> {
    return this.prismaService.category.findMany({
      take: this.config.categorySearchMaxResultCount
    });
  }
}

export { CategoryService };
