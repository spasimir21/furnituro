import { CreateProductDto } from './dto/CreateProduct.dto';
import { ProductQueryDto } from './dto/ProductQuery.dto';
import { Product } from './interface/Product.interface';
import { EditProductDto } from './dto/EditProduct.dto';
import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { ProductConfig } from './config';

const SORT_FIELDS = {
  newest: 'last_modified_at',
  name: 'name',
  price: 'price'
} as const;

@Injectable()
class ProductService {
  constructor(
    @Inject(ProductConfig) private readonly config: ProductConfig,
    private readonly prismaService: PrismaService
  ) {}

  async count(query: ProductQueryDto) {
    return await this.prismaService.product.count({
      where: {
        categories: { some: { id: query.category } }
      }
    });
  }

  async get(query: ProductQueryDto): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({
      include: {
        categories: {
          select: { id: true }
        },
        photos: {
          select: { hash: true }
        }
      },
      where: {
        categories: { some: { id: query.category } }
      },
      orderBy: {
        [SORT_FIELDS[query.sortBy]]: query.sortOrder
      },
      skip: query.page * query.perPage,
      take: query.perPage
    });

    return products.map(product => ({
      id: product.id,
      name: product.name,
      shortDescription: product.short_description,
      description: product.description,
      price: product.price,
      discount: product.discount,
      originalPrice: product.originalPrice,
      quantity: product.quantity,
      isNew: product.mark_as_new,
      coverPhoto: product.photos[0].hash,
      additionalPhotos: product.photos.slice(1).map(p => p.hash),
      sizes: product.sizes,
      colors: product.colors,
      rating: product.rating,
      categories: product.categories.map(c => c.id)
    }));
  }

  async create(input: CreateProductDto): Promise<Product> {
    const product = await this.prismaService.product.create({
      data: {
        name: input.name,
        short_description: input.shortDescription,
        description: input.description,
        price: Math.round(input.originalPrice * ((100 - (input.discount ?? 0)) / 100)),
        originalPrice: input.originalPrice,
        discount: input.discount,
        quantity: input.quantity,
        mark_as_new: input.isNew,
        photos: {
          connect: [input.coverPhoto, ...(input.additionalPhotos ?? [])].map(hash => ({ hash }))
        },
        sizes: input.sizes,
        colors: input.colors,
        categories: {
          connect: (input.categories ?? []).map(id => ({ id }))
        }
      }
    });

    return {
      id: product.id,
      name: product.name,
      shortDescription: product.short_description,
      description: product.description,
      price: product.price,
      discount: product.discount,
      originalPrice: product.originalPrice,
      quantity: product.quantity,
      isNew: product.mark_as_new,
      coverPhoto: input.coverPhoto,
      additionalPhotos: input.additionalPhotos ?? [],
      sizes: product.sizes,
      colors: product.colors,
      rating: product.rating,
      categories: input.categories ?? []
    };
  }

  async edit(id: string, input: EditProductDto): Promise<Product | null> {
    const product = await this.prismaService.product.findFirst({
      where: { id },
      include: {
        photos: { select: { hash: true } },
        categories: { select: { id: true } }
      }
    });

    if (product == null) return null;

    const newProduct = await this.prismaService.product.update({
      where: { id },
      data: {
        name: input.name,
        short_description: input.shortDescription,
        description: input.description,
        price: Math.round(
          (input.originalPrice ?? product.originalPrice) * ((100 - (input.discount ?? product.discount)) / 100)
        ),
        originalPrice: input.originalPrice,
        discount: input.discount,
        quantity: input.quantity,
        mark_as_new: input.isNew,
        photos: {
          connect: [
            input.coverPhoto ?? product.photos[0].hash,
            ...(input.additionalPhotos ?? product.photos.slice(1).map(p => p.hash))
          ].map(hash => ({
            hash
          }))
        },
        sizes: input.sizes,
        colors: input.colors,
        categories:
          input.categories == null
            ? undefined
            : {
                connect: input.categories.map(id => ({ id }))
              }
      }
    });

    return {
      id: newProduct.id,
      name: newProduct.name,
      shortDescription: newProduct.short_description,
      description: newProduct.description,
      price: newProduct.price,
      discount: newProduct.discount,
      originalPrice: newProduct.originalPrice,
      quantity: newProduct.quantity,
      isNew: newProduct.mark_as_new,
      coverPhoto: input.coverPhoto ?? product.photos[0].hash,
      additionalPhotos: input.additionalPhotos ?? product.photos.slice(1).map(p => p.hash),
      sizes: newProduct.sizes,
      colors: newProduct.colors,
      rating: newProduct.rating,
      categories: input.categories ?? product.categories.map(c => c.id)
    };
  }

  async delete(id: string) {
    await this.prismaService.product.delete({
      where: { id, orderedProducts: { none: {} } }
    });
  }
}

export { ProductService };

