import { CreateRatingDto } from './dto/CreateRating.dto';
import { Rating } from './interface/Rating.interface';
import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { RatingConfig } from './config';

@Injectable()
class RatingService {
  constructor(
    @Inject(RatingConfig) private readonly config: RatingConfig,
    private readonly prismaService: PrismaService
  ) {}

  async get(productId: string): Promise<Rating[]> {
    const reviews = await this.prismaService.review.findMany({
      where: { product_id: productId }
    });

    return reviews.map(review => ({
      id: review.id,
      productId: review.product_id,
      rating: review.rating,
      comment: review.comment ?? null
    }));
  }

  async create(productId: string, info: CreateRatingDto): Promise<Rating> {
    const review = await this.prismaService.review.create({
      data: {
        product_id: productId,
        rating: info.rating,
        comment: info.comment
      }
    });

    await this.updateProductRating(productId);

    return {
      id: review.id,
      productId: review.product_id,
      rating: review.rating,
      comment: review.comment ?? null
    };
  }

  async delete(productId: string, id: string) {
    await this.prismaService.review.delete({
      where: { id, product_id: productId }
    });

    await this.updateProductRating(productId);
  }

  private async updateProductRating(productId: string) {
    const product = await this.prismaService.product.findFirst({
      where: { id: productId },
      include: { reviews: { select: { rating: true } } }
    });

    if (product == null) return;

    const rating = Math.round(
      product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length
    );

    await this.prismaService.product.update({
      where: { id: productId },
      data: { rating }
    });
  }
}

export { RatingService };

